import type { CreateWaitlistEntryResult, WaitlistEntryInput } from "@/types/waitlist";
import { isSupabaseConfigured } from "./supabase-client";
import { getWaitlistCountFromSupabase, createWaitlistEntryInSupabase } from "./supabase-store";
import { getWaitlistCountFromFile, createWaitlistEntryInFile } from "./file-store";

/**
 * Storage for waitlist sign-ups.
 *
 * Uses Supabase when `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set
 * (see .env.example and README.md → "Connecter Supabase"). Falls back to a
 * local JSON file otherwise, so `npm run dev` keeps working with zero
 * configuration for anyone who hasn't set up a Supabase project.
 */

export async function getWaitlistCount(): Promise<number> {
  return isSupabaseConfigured() ? getWaitlistCountFromSupabase() : getWaitlistCountFromFile();
}

export async function createWaitlistEntry(
  input: WaitlistEntryInput
): Promise<CreateWaitlistEntryResult> {
  return isSupabaseConfigured()
    ? createWaitlistEntryInSupabase(input)
    : createWaitlistEntryInFile(input);
}
