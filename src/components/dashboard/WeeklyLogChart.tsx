"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, limit, where, Timestamp } from "firebase/firestore";
import type { HydrationLog } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { eachDayOfInterval, format, subDays, startOfDay } from "date-fns";

const chartConfig = {
  intake: {
    label: "Intake (oz)",
    color: "hsl(var(--chart-1))",
  },
  goal: {
    label: "Goal (oz)",
    color: "hsl(var(--chart-2))",
  }
};

export default function WeeklyLogChart({ userId }: { userId: string }) {
  const firestore = useFirestore();

  const hydrationLogsQuery = useMemoFirebase(() => {
    if (!userId || !firestore) return null;
    const sevenDaysAgo = startOfDay(subDays(new Date(), 6));
    return query(
      collection(firestore, 'users', userId, 'hydration_records'),
      where('timestamp', '>=', Timestamp.fromDate(sevenDaysAgo)),
      orderBy('timestamp', 'desc')
    );
  }, [firestore, userId]);

  const { data: hydrationLogsData, isLoading } = useCollection<any>(hydrationLogsQuery);

  const weeklyData = React.useMemo(() => {
    const last7Days = eachDayOfInterval({
      start: subDays(new Date(), 6),
      end: new Date(),
    });

    const logsByDay = (hydrationLogsData || []).reduce((acc, log) => {
        const date = format(log.timestamp.toDate(), 'yyyy-MM-dd');
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date] += log.amount;
        return acc;
    }, {} as Record<string, number>);

    return last7Days.map(date => {
        const dateString = format(date, 'yyyy-MM-dd');
        return {
            date: dateString,
            intake: logsByDay[dateString] || 0,
            goal: 64 // Assuming a static goal for now
        };
    });
  }, [hydrationLogsData]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Hydration Log</CardTitle>
        <CardDescription>Your water intake for the last 7 days.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
            <div className="h-64 w-full flex items-center justify-center">
                <Skeleton className="h-full w-full" />
            </div>
        ) : (
            <ChartContainer config={chartConfig} className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="date"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                        />
                        <YAxis 
                            tickLine={false}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar dataKey="intake" fill="var(--color-intake)" radius={4} />
                        <Bar dataKey="goal" fill="var(--color-goal)" radius={4} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
