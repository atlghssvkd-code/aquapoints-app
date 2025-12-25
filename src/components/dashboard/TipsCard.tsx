"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, AlertTriangle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getTipsAction } from "@/app/actions";
import type { Student } from "@/lib/types";

export default function TipsCard({ user }: { user: Student }) {
  const [tip, setTip] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTip = async () => {
      setIsLoading(true);
      setError(null);
      const progress = Math.round((user.currentIntake / user.dailyGoal) * 100);
      const result = await getTipsAction({
        studentId: user.id,
        dailyProgressPercentage: progress,
      });

      if (result.success && result.data) {
        setTip(result.data.tip);
      } else {
        setError(result.error || "An unknown error occurred.");
        toast({
          variant: "destructive",
          title: "Tip Generation Failed",
          description: result.error,
        });
      }
      setIsLoading(false);
    };

    fetchTip();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id, user.currentIntake, user.dailyGoal]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>Personalized Tip</span>
        </CardTitle>
        <CardDescription>AI-powered advice just for you.</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[100px] flex items-center justify-center text-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span>Analyzing your progress...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-2 text-destructive">
            <AlertTriangle className="h-8 w-8" />
            <span>{error}</span>
          </div>
        ) : (
          <p className="text-base text-center text-muted-foreground">
            {tip}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
