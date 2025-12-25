"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
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
import { subDays, format, eachDayOfInterval } from "date-fns";
import React from "react";
import { MOCK_HYDRATION_LOGS } from "@/lib/mock-data";

const chartConfig = {
    total: {
      label: "Total Intake (oz)",
      color: "hsl(var(--chart-1))",
    },
    goal: {
      label: "Campus Goal",
      color: "hsl(var(--chart-2))",
    },
  };
  
export default function HydrationTrendsChart() {
    const chartData = React.useMemo(() => {
        const last7Days = eachDayOfInterval({
          start: subDays(new Date(), 6),
          end: new Date(),
        });
    
        const trendsByDay = MOCK_HYDRATION_LOGS.reduce((acc, log: any) => {
            const date = format(new Date(log.timestamp), 'yyyy-MM-dd');
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += log.amount;
            return acc;
        }, {} as Record<string, number>);

        const campusGoal = 15000; // Example goal
    
        return last7Days.map(date => {
            const dateString = format(date, 'MMM d');
            const isoDateString = format(date, 'yyyy-MM-dd');
            return {
                date: dateString,
                total: trendsByDay[isoDateString] || 0,
                goal: campusGoal
            };
        });
      }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campus Hydration Trends</CardTitle>
        <CardDescription>Daily water consumption across all students.</CardDescription>
      </CardHeader>
      <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                <LineChart
                data={chartData}
                margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                }}
                >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => `${value / 1000}k`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                    dataKey="total"
                    type="monotone"
                    stroke="var(--color-total)"
                    strokeWidth={2}
                    dot={false}
                />
                <Line
                    dataKey="goal"
                    type="monotone"
                    stroke="var(--color-goal)"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    dot={false}
                />
                </LineChart>
                </ResponsiveContainer>
            </ChartContainer>
      </CardContent>
    </Card>
  );
}
