export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  hydroPoints: number;
  dailyGoal: number; // in ounces
  currentIntake: number; // in ounces
  avatarUrl?: string;
  avatarHint?: string;
};

export type LeaderboardEntry = {
  rank: number;
  studentId: string;
  name: string;
  avatarUrl?: string;
  avatarHint?: string;
  points: number;
};

export type HydroStation = {
  id: string;
  name: string;
  location?: string;
  latitude: number;
  longitude: number;
  status: 'Online' | 'Offline' | 'Error';
  lastServiced: string; // ISO date string
  usage: number; // number of uses today
};

export type HydrationLog = {
  date: string; // YYYY-MM-DD
  intake: number; // in ounces
};

export type HydrationChallenge = {
    id: string;
    description: string;
    pointsAwarded: number;
    startDate: string; // ISO date string
    endDate: string; // ISO date string
}
