import type { Student, LeaderboardEntry, HydroStation, HydrationLog } from '@/lib/types';

export const students: Student[] = [
  {
    id: 'user1',
    name: 'Alex Johnson',
    email: 'alex.j@school.edu',
    avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
    avatarHint: 'student portrait',
    points: 1250,
    dailyGoal: 64,
    currentIntake: 48,
  },
  {
    id: 'user2',
    name: 'Maria Garcia',
    email: 'maria.g@school.edu',
    avatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
    avatarHint: 'student portrait',
    points: 1100,
    dailyGoal: 72,
    currentIntake: 60,
  },
  {
    id: 'user3',
    name: 'Chen Wei',
    email: 'chen.w@school.edu',
    avatarUrl: 'https://picsum.photos/seed/avatar3/100/100',
    avatarHint: 'student portrait',
    points: 980,
    dailyGoal: 64,
    currentIntake: 32,
  },
];

export const currentUser: Student = students[0];

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, studentId: 'user1', name: 'Alex Johnson', points: 1250, avatarUrl: 'https://picsum.photos/seed/avatar1/100/100', avatarHint: 'student portrait' },
  { rank: 2, studentId: 'user2', name: 'Maria Garcia', points: 1100, avatarUrl: 'https://picsum.photos/seed/avatar2/100/100', avatarHint: 'student portrait' },
  { rank: 3, studentId: 'user4', name: 'Samira Khan', points: 1050, avatarUrl: 'https://picsum.photos/seed/avatar4/100/100', avatarHint: 'student portrait' },
  { rank: 4, studentId: 'user3', name: 'Chen Wei', points: 980, avatarUrl: 'https://picsum.photos/seed/avatar3/100/100', avatarHint: 'student portrait' },
  { rank: 5, studentId: 'user5', name: 'Leo Martinez', points: 950, avatarUrl: 'https://picsum.photos/seed/avatar5/100/100', avatarHint: 'student portrait' },
];

export const hydroStations: HydroStation[] = [
  { id: 'HS-001', location: 'Library, 1st Floor', status: 'Online', lastServiced: '2024-05-20T00:00:00.000Z', usage: 152 },
  { id: 'HS-002', location: 'Gymnasium Entrance', status: 'Online', lastServiced: '2024-05-21T00:00:00.000Z', usage: 210 },
  { id: 'HS-003', location: 'Cafeteria West Wing', status: 'Error', lastServiced: '2024-05-15T00:00:00.000Z', usage: 89 },
  { id: 'HS-004', location: 'Science Building, 3rd Floor', status: 'Offline', lastServiced: '2024-05-18T00:00:00.000Z', usage: 0 },
  { id: 'HS-005', location: 'Student Union', status: 'Online', lastServiced: '2024-05-22T00:00:00.000Z', usage: 180 },
];

export const hydrationLogs: HydrationLog[] = [
  { date: '2024-05-17', intake: 50 },
  { date: '2024-05-18', intake: 64 },
  { date: '2024-05-19', intake: 58 },
  { date: '2024-05-20', intake: 70 },
  { date: '2024-05-21', intake: 60 },
  { date: '2024-05-22', intake: 75 },
  { date: '2024-05-23', intake: 48 },
];

export const campusHydrationTrends = [
    { date: 'May 17', total: 12000, goal: 15000 },
    { date: 'May 18', total: 14500, goal: 15000 },
    { date: 'May 19', total: 13000, goal: 15000 },
    { date: 'May 20', total: 16000, goal: 15000 },
    { date: 'May 21', total: 15500, goal: 15000 },
    { date: 'May 22', total: 17000, goal: 15000 },
    { date: 'May 23', total: 16500, goal: 15000 },
];
