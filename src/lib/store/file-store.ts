import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type {
  CreateWaitlistEntryResult,
  WaitlistEntry,
  WaitlistEntryInput,
} from "@/types/waitlist";
import { generateReferralCode } from "./referral-code";

/**
 * Zero-config local fallback: a JSON file on disk. Used automatically
 * when Supabase env vars aren't set, so `npm run dev` keeps working
 * without any external service. Not suitable for production — see
 * supabase-store.ts for the persisted backend.
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

export async function getWaitlistCountFromFile(): Promise<number> {
  const entries = await readEntries();
  return entries.length;
}

export async function createWaitlistEntryInFile(
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
