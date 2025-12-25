'use client';

import ProfileCard from '@/components/dashboard/ProfileCard';
import HydrationProgressCard from '@/components/dashboard/HydrationProgressCard';
import ChallengeCard from '@/components/dashboard/ChallengeCard';
import TipsCard from '@/components/dashboard/TipsCard';
import WeeklyLogChart from '@/components/dashboard/WeeklyLogChart';
import { Student } from '@/lib/types';
import { MOCK_STUDENT_LEADERBOARD } from '@/lib/mock-data';

export default function DashboardPage() {
  const userProfile: Student = MOCK_STUDENT_LEADERBOARD[0]; // Use a mock user

  const welcomeName = userProfile?.firstName || 'there';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Welcome back, {welcomeName}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s your hydration summary for today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userProfile && <ProfileCard user={userProfile} />}
        {userProfile && <HydrationProgressCard user={userProfile} />}
        {userProfile && <ChallengeCard user={userProfile} />}
        <div className="lg:col-span-2">
          {userProfile && <WeeklyLogChart userId={userProfile.id} />}
        </div>
        {userProfile && <TipsCard user={userProfile} />}
      </div>
    </div>
  );
}
