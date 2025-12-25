"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, Pie, PieChart, Cell } from "recharts";
import type { Student } from "@/lib/types";
import { Droplet, Target } from "lucide-react";

export default function HydrationProgressCard({ user }: { user: Student }) {
  const { currentIntake, dailyGoal } = user;
  const progress = dailyGoal > 0 ? Math.min(Math.round((currentIntake / dailyGoal) * 100), 100) : 0;

  const chartData = [
    { name: "progress", value: progress, fill: "hsl(var(--primary))" },
    { name: "remaining", value: 100 - progress, fill: "hsl(var(--secondary))" },
  ];

  const chartConfig = {
    progress: {
      label: "Progress",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Today&apos;s Goal</CardTitle>
        <CardDescription>{dailyGoal} oz</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center py-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={80}
              outerRadius={100}
              startAngle={90}
              endAngle={450}
              cornerRadius={50}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox) {
                    const { cx, cy } = viewBox;
                    return (
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-foreground text-4xl font-bold font-headline"
                      >
                        {`${progress}%`}
                      </text>
                    );
                  }
                  return null;
                }}
              />
              {chartData.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm border-t pt-4">
        <div className="flex w-full items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-2">
            <Droplet className="h-4 w-4" />
            <span>Consumed</span>
          </div>
          <span>{currentIntake} oz</span>
        </div>
        <div className="flex w-full items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>Remaining</span>
          </div>
          <span>{Math.max(0, dailyGoal - currentIntake)} oz</span>
        </div>
      </CardFooter>
    </Card>
  );
}
