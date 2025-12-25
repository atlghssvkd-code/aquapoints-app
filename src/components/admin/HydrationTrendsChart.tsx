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
import { campusHydrationTrends } from "@/lib/data";

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
            data={campusHydrationTrends}
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
