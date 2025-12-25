"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import type { Student } from "@/lib/types";

export default function TipsCard({ user }: { user: Student }) {
  const [tip, setTip] = useState<string>("");

  useEffect(() => {
    // Simulate fetching a static tip
    if (user) {
      setTip("Carry a water bottle with you throughout the day as a constant reminder to drink up!");
    }
  }, [user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>Personalized Tip</span>
        </CardTitle>
        <CardDescription>A helpful piece of advice.</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[100px] flex items-center justify-center text-center">
        {tip ? (
            <p className="text-base text-center text-muted-foreground">
                {tip}
            </p>
        ) : (
            <p className="text-base text-center text-muted-foreground">
                Loading your tip...
            </p>
        )}
      </CardContent>
    </Card>
  );
}
