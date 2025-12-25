'use client';
import HydrationTrendsChart from "@/components/admin/HydrationTrendsChart";
import StationStatusTable from "@/components/admin/StationStatusTable";
import QuickActionsCard from "@/components/admin/QuickActionsCard";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Oversee campus hydration and manage the AquaPoints system.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <HydrationTrendsChart />
        </div>
        <QuickActionsCard />
        <div className="lg:col-span-3">
            <StationStatusTable />
        </div>
      </div>
    </div>
  );
}
