"use client";

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
import { hydrationLogs, currentUser } from "@/lib/data";

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

export default function WeeklyLogChart() {

  const dataWithGoal = hydrationLogs.map(log => ({
    ...log,
    goal: currentUser.dailyGoal
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Hydration Log</CardTitle>
        <CardDescription>Your water intake for the last 7 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataWithGoal} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
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
      </CardContent>
    </Card>
  );
}
