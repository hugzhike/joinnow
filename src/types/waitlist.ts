export type MobilePlatform = "iphone" | "android";

export type ProblemFrequency =
  | "quotidiennement"
  | "plusieurs-fois-semaine"
  | "quelques-fois-mois"
  | "rarement";

export type AgeRange = "18-24" | "25-29" | "30-35" | "36+";

export interface WaitlistEntryInput {
  firstName: string;
  email: string;
  city: string;
  ageRange?: AgeRange;
  activities: string[];
  frequency: ProblemFrequency;
  platform: MobilePlatform;
  wantsAmbassador: boolean;
  referredBy?: string;
}

export interface WaitlistEntry extends WaitlistEntryInput {
  id: string;
  referralCode: string;
  createdAt: string;
  referralCount: number;
}

export interface WaitlistSubmitResult {
  position: number;
  referralCode: string;
  referralLink: string;
  totalSignups: number;
}
