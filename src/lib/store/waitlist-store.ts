import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { WaitlistEntry, WaitlistEntryInput } from "@/types/waitlist";

/**
 * Storage for waitlist sign-ups.
 *
 * V1 implementation: a JSON file on disk. This is enough to run the whole
 * flow locally (`npm run dev`) with zero configuration. On a read-only
 * filesystem (most serverless hosts, including Vercel) writes fall back
 * to an in-memory list scoped to the running instance, so the form still
 * works for demos — it just won't persist across deploys or cold starts.
 *
 * Before a real public launch, swap this module for a Supabase-backed
 * implementation. See README.md → "Connecter Supabase" for the schema
 * and a drop-in replacement.
 */

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "waitlist-entries.json");

let memoryEntries: WaitlistEntry[] = [];
let useMemoryFallback = false;

async function readEntries(): Promise<WaitlistEntry[]> {
  if (useMemoryFallback) return memoryEntries;

  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as WaitlistEntry[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    useMemoryFallback = true;
    return memoryEntries;
  }
}

async function writeEntries(entries: WaitlistEntry[]): Promise<void> {
  if (useMemoryFallback) {
    memoryEntries = entries;
    return;
  }

  try {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");
  } catch {
    useMemoryFallback = true;
    memoryEntries = entries;
  }
}

function generateReferralCode(): string {
  return randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
}

export async function getWaitlistCount(): Promise<number> {
  const entries = await readEntries();
  return entries.length;
}

export interface CreateWaitlistEntryResult {
  entry: WaitlistEntry;
  position: number;
  totalSignups: number;
}

export async function createWaitlistEntry(
  input: WaitlistEntryInput
): Promise<CreateWaitlistEntryResult> {
  const entries = await readEntries();

  const alreadyRegistered = entries.some(
    (existing) => existing.email.toLowerCase() === input.email.toLowerCase()
  );
  if (alreadyRegistered) {
    const existing = entries.find(
      (e) => e.email.toLowerCase() === input.email.toLowerCase()
    )!;
    const position = entries.findIndex((e) => e.id === existing.id) + 1;
    return { entry: existing, position, totalSignups: entries.length };
  }

  if (input.referredBy) {
    const referrer = entries.find((e) => e.referralCode === input.referredBy);
    if (referrer) referrer.referralCount += 1;
  }

  const entry: WaitlistEntry = {
    ...input,
    id: randomUUID(),
    referralCode: generateReferralCode(),
    createdAt: new Date().toISOString(),
    referralCount: 0,
  };

  entries.push(entry);
  await writeEntries(entries);

  return { entry, position: entries.length, totalSignups: entries.length };
}
