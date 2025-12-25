export type Student = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  avatarHint: string;
  points: number;
  dailyGoal: number; // in ounces
  currentIntake: number; // in ounces
};

export type LeaderboardEntry = {
  rank: number;
  studentId: string;
  name: string;
  avatarUrl: string;
  avatarHint: string;
  points: number;
};

export type HydroStation = {
  id: string;
  location: string;
  status: 'Online' | 'Offline' | 'Error';
  lastServiced: string; // ISO date string
  usage: number; // number of uses today
};

export type HydrationLog = {
  date: string; // YYYY-MM-DD
  intake: number; // in ounces
};
