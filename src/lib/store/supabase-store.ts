import type {
  CreateWaitlistEntryResult,
  WaitlistEntry,
  WaitlistEntryInput,
} from "@/types/waitlist";
import { getSupabaseClient } from "./supabase-client";
import { generateReferralCode } from "./referral-code";

const TABLE = "waitlist_entries";

interface WaitlistRow {
  id: string;
  first_name: string;
  email: string;
  city: string;
  age_range: string | null;
  activities: string[];
  frequency: string;
  platform: string;
  wants_ambassador: boolean;
  referral_code: string;
  referred_by: string | null;
  referral_count: number;
  created_at: string;
}

function rowToEntry(row: WaitlistRow): WaitlistEntry {
  return {
    id: row.id,
    firstName: row.first_name,
    email: row.email,
    city: row.city,
    ageRange: (row.age_range ?? undefined) as WaitlistEntry["ageRange"],
    activities: row.activities,
    frequency: row.frequency as WaitlistEntry["frequency"],
    platform: row.platform as WaitlistEntry["platform"],
    wantsAmbassador: row.wants_ambassador,
    referralCode: row.referral_code,
    referredBy: row.referred_by ?? undefined,
    referralCount: row.referral_count,
    createdAt: row.created_at,
  };
}

/** Escapes PostgREST `ilike` wildcard characters so email lookups can't be tricked by `%`/`_`. */
function escapeLikePattern(value: string): string {
  return value.replace(/[\\%_]/g, (match) => `\\${match}`);
}

export async function getWaitlistCountFromSupabase(): Promise<number> {
  const supabase = getSupabaseClient();
  const { count, error } = await supabase
    .from(TABLE)
    .select("id", { count: "exact", head: true });

  if (error) throw error;
  return count ?? 0;
}

export async function createWaitlistEntryInSupabase(
  input: WaitlistEntryInput
): Promise<CreateWaitlistEntryResult> {
  const supabase = getSupabaseClient();

  const { data: inserted, error: insertError } = await supabase
    .from(TABLE)
    .insert({
      first_name: input.firstName,
      email: input.email,
      city: input.city,
      age_range: input.ageRange ?? null,
      activities: input.activities,
      frequency: input.frequency,
      platform: input.platform,
      wants_ambassador: input.wantsAmbassador,
      referral_code: generateReferralCode(),
      referred_by: input.referredBy ?? null,
      referral_count: 0,
    })
    .select()
    .single();

  if (insertError) {
    // 23505 = unique_violation — someone already signed up with this email.
    if (insertError.code === "23505") {
      const { data: existing, error: fetchError } = await supabase
        .from(TABLE)
        .select()
        .ilike("email", escapeLikePattern(input.email))
        .single();

      if (fetchError || !existing) throw fetchError ?? insertError;

      const { count } = await supabase
        .from(TABLE)
        .select("id", { count: "exact", head: true })
        .lte("created_at", existing.created_at);

      const entry = rowToEntry(existing as WaitlistRow);
      const totalSignups = await getWaitlistCountFromSupabase();
      return { entry, position: count ?? totalSignups, totalSignups };
    }

    throw insertError;
  }

  if (input.referredBy) {
    const { data: referrer } = await supabase
      .from(TABLE)
      .select("id, referral_count")
      .eq("referral_code", input.referredBy)
      .maybeSingle();

    if (referrer) {
      await supabase
        .from(TABLE)
        .update({ referral_count: referrer.referral_count + 1 })
        .eq("id", referrer.id);
    }
  }

  const totalSignups = await getWaitlistCountFromSupabase();
  return { entry: rowToEntry(inserted as WaitlistRow), position: totalSignups, totalSignups };
}
