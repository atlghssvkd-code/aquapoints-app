import { Student, HydroStation, HydrationLog, HydrationChallenge } from './types';
import { subDays, formatISO } from 'date-fns';

export const MOCK_STUDENT_LEADERBOARD: Student[] = [
    {
      id: "student1",
      firstName: "Alex",
      lastName: "Johnson",
      email: "alex.j@school.edu",
      studentId: "S001",
      hydroPoints: 1250,
      dailyGoal: 64,
      currentIntake: 48,
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MHx8fHwxNzY2NTI1MTgwfDA&ixlib=rb-4.1.0&q=80&w=200",
      avatarHint: "student portrait",
    },
    {
      id: "student2",
      firstName: "Maria",
      lastName: "Garcia",
      email: "maria.g@school.edu",
      studentId: "S002",
      hydroPoints: 1180,
      dailyGoal: 72,
      currentIntake: 60,
      avatarUrl: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MHx8fHwxNzY2NTI1MTgwfDA&ixlib=rb-4.1.0&q=80&w=200",
      avatarHint: "student portrait",
    },
    {
      id: "student3",
      firstName: "Chen",
      lastName: "Wei",
      email: "chen.w@school.edu",
      studentId: "S003",
      hydroPoints: 1100,
      dailyGoal: 64,
      currentIntake: 32,
      avatarUrl: "https://images.unsplash.com/photo-1517256673644-36ad11246d21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MHx8fHwxNzY2NTI1MTgwfDA&ixlib=rb-4.1.0&q=80&w=200",
      avatarHint: "student portrait",
    },
    {
      id: "student4",
      firstName: "Samira",
      lastName: "Khan",
      email: "samira.k@school.edu",
      studentId: "S004",
      hydroPoints: 1050,
      dailyGoal: 80,
      currentIntake: 80,
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MHx8fHwxNzY2NTI1MTgwfDA&ixlib=rb-4.1.0&q=80&w=200",
      avatarHint: "student portrait",
    },
    {
      id: "student5",
      firstName: "Leo",
      lastName: "Martinez",
      email: "leo.m@school.edu",
      studentId: "S005",
      hydroPoints: 980,
      dailyGoal: 64,
      currentIntake: 50,
      avatarUrl: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MHx8fHwxNzY2NTI1MTgwfDA&ixlib=rb-4.1.0&q=80&w=200",
      avatarHint: "student portrait",
    },
  ];

export const MOCK_HYDRO_STATIONS: HydroStation[] = [
    {
        id: 'station1',
        name: 'Library Courtyard',
        latitude: 34.0522,
        longitude: -118.2437,
        status: 'Online',
        lastServiced: subDays(new Date(), 10).toISOString(),
        usage: 120
    },
    {
        id: 'station2',
        name: 'Gymnasium Entrance',
        latitude: 34.0532,
        longitude: -118.2447,
        status: 'Online',
        lastServiced: subDays(new Date(), 5).toISOString(),
        usage: 250
    },
    {
        id: 'station3',
        name: 'Science Building, 2nd Floor',
        latitude: 34.0542,
        longitude: -118.2457,
        status: 'Offline',
        lastServiced: subDays(new Date(), 35).toISOString(),
        usage: 0
    },
    {
        id: 'station4',
        name: 'Cafeteria',
        latitude: 34.0512,
        longitude: -118.2427,
        status: 'Error',
        lastServiced: subDays(new Date(), 2).toISOString(),
        usage: 30
    },
];

type RawHydrationLog = {
    id: string;
    userProfileId: string;
    timestamp: string; // ISO string
    amount: number;
    hydroStationId?: string;
}

export const MOCK_HYDRATION_LOGS: RawHydrationLog[] = [
    // Student 1
    { id: "log1", userProfileId: "student1", timestamp: subDays(new Date(), 1).toISOString(), amount: 16 },
    { id: "log2", userProfileId: "student1", timestamp: subDays(new Date(), 1).toISOString(), amount: 16 },
    { id: "log3", userProfileId: "student1", timestamp: subDays(new Date(), 2).toISOString(), amount: 24 },
    { id: "log4", userProfileId: "student1", timestamp: subDays(new Date(), 3).toISOString(), amount: 32 },
    { id: "log5", userProfileId: "student1", timestamp: subDays(new Date(), 4).toISOString(), amount: 16 },
    { id: "log6", userProfileId: "student1", timestamp: subDays(new Date(), 5).toISOString(), amount: 64 },
    { id: "log7", userProfileId: "student1", timestamp: subDays(new Date(), 6).toISOString(), amount: 40 },
    // Student 2
    { id: "log8", userProfileId: "student2", timestamp: subDays(new Date(), 1).toISOString(), amount: 20 },
    { id: "log9", userProfileId: "student2", timestamp: subDays(new Date(), 2).toISOString(), amount: 20 },
    // ... add more for other students and other days if needed
];

export const MOCK_CHALLENGES: HydrationChallenge[] = [
    {
      id: 'challenge1',
      description: 'Drink a full glass of water first thing in the morning.',
      pointsAwarded: 50,
      startDate: subDays(new Date(), 1).toISOString(),
      endDate: subDays(new Date(), -1).toISOString(),
    },
    {
        id: 'challenge2',
        description: 'Try adding a slice of lemon or lime to your water today.',
        pointsAwarded: 25,
        startDate: subDays(new Date(), 0).toISOString(),
        endDate: subDays(new Date(), -2).toISOString(),
      },
  ];
