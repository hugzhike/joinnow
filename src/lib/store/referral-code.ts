import { randomUUID } from "node:crypto";

export function generateReferralCode(): string {
  return randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
}
