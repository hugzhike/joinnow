export type ActivityCategory = "sport" | "sorties" | "voyage" | "loisirs";

export type ActivityTimeframe = "aujourdhui" | "dans-lheure" | "ce-weekend";

export interface ActivityOrganizer {
  name: string;
  initials: string;
  activitiesHosted: number;
  verified?: boolean;
}

export interface Activity {
  id: string;
  title: string;
  emoji: string;
  category: ActivityCategory;
  timeframes: ActivityTimeframe[];
  timeLabel: string;
  countdownLabel?: string;
  zone: string;
  distanceKm: number;
  participants: number;
  spotsLeft: number;
  spotsTotal: number;
  organizer: ActivityOrganizer;
}

export interface PopularActivityType {
  id: string;
  label: string;
  emoji: string;
  category: ActivityCategory;
}
