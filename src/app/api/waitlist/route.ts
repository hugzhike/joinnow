import { NextResponse } from "next/server";
import { z } from "zod";
import { waitlistSchema } from "@/lib/validation";
import { createWaitlistEntry, getWaitlistCount } from "@/lib/store/waitlist-store";
import type { WaitlistSubmitResult } from "@/types/waitlist";

export const dynamic = "force-dynamic";

export async function GET() {
  const count = await getWaitlistCount();
  return NextResponse.json({ count });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Le corps de la requête n'est pas un JSON valide." },
      { status: 400 }
    );
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Certains champs ne sont pas valides.",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 }
    );
  }

  const { entry, position, totalSignups } = await createWaitlistEntry(parsed.data);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
  const referralLink = `${siteUrl}/?ref=${entry.referralCode}`;

  const result: WaitlistSubmitResult = {
    position,
    referralCode: entry.referralCode,
    referralLink,
    totalSignups,
  };

  return NextResponse.json(result, { status: 201 });
}
