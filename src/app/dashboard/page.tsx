import { currentUser } from "@/lib/data";
import ProfileCard from "@/components/dashboard/ProfileCard";
import HydrationProgressCard from "@/components/dashboard/HydrationProgressCard";
import ChallengeCard from "@/components/dashboard/ChallengeCard";
import TipsCard from "@/components/dashboard/TipsCard";
import WeeklyLogChart from "@/components/dashboard/WeeklyLogChart";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Welcome back, {currentUser.name.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground">Here&apos;s your hydration summary for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProfileCard user={currentUser} />
        <HydrationProgressCard user={currentUser} />
        <ChallengeCard user={currentUser} />
        <div className="lg:col-span-2">
            <WeeklyLogChart />
        </div>
        <TipsCard user={currentUser} />
      </div>
    </div>
  );
}
