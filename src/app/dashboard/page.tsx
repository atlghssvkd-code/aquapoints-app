'use client';

import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import ProfileCard from '@/components/dashboard/ProfileCard';
import HydrationProgressCard from '@/components/dashboard/HydrationProgressCard';
import ChallengeCard from '@/components/dashboard/ChallengeCard';
import TipsCard from '@/components/dashboard/TipsCard';
import WeeklyLogChart from '@/components/dashboard/WeeklyLogChart';
import { doc } from 'firebase/firestore';
import { Student } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid, 'profile', user.uid);
  }, [firestore, user]);

  const {
    data: userProfile,
    isLoading: isProfileLoading,
    error,
  } = useDoc<Student>(userProfileRef);

  if (isUserLoading || (user && isProfileLoading)) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-4 w-3/4 mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
          <div className="lg:col-span-2">
            <Skeleton className="h-80 rounded-lg" />
          </div>
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading profile: {error.message}</div>;
  }
  
  const welcomeName = userProfile?.firstName || user?.email?.split('@')[0] || 'there';

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
          {user && <WeeklyLogChart userId={user.uid} />}
        </div>
        {userProfile && <TipsCard user={userProfile} />}
      </div>
    </div>
  );
}
