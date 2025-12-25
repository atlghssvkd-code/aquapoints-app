"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, RefreshCw, Loader2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getChallengeAction } from "@/app/actions";
import type { Student } from "@/lib/types";

export default function ChallengeCard({ user }: { user: Student }) {
  const [challenge, setChallenge] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [pastChallenges, setPastChallenges] = useState<string[]>([]);

  const fetchChallenge = () => {
    startTransition(async () => {
      setIsLoading(true);
      setError(null);
      const result = await getChallengeAction({
        studentName: user.name,
        dailyGoal: user.dailyGoal,
        currentPoints: user.points,
        pastChallenges: pastChallenges
      });

      if (result.success && result.data) {
        setChallenge(result.data.challenge);
        setPastChallenges(prev => [...prev, result.data.challenge].slice(-5)); // Keep last 5
      } else {
        setError(result.error || "An unknown error occurred.");
        toast({
          variant: "destructive",
          title: "Challenge Generation Failed",
          description: result.error,
        });
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchChallenge();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>AI Challenge</span>
          <Button variant="ghost" size="icon" onClick={fetchChallenge} disabled={isPending || isLoading}>
            <RefreshCw className={`h-4 w-4 ${isPending || isLoading ? "animate-spin" : ""}`} />
            <span className="sr-only">New Challenge</span>
          </Button>
        </CardTitle>
        <CardDescription>A fun task to help you hydrate.</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[100px] flex items-center justify-center text-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span>Generating challenge...</span>
          </div>
        ) : error ? (
            <div className="flex flex-col items-center gap-2 text-destructive">
                <AlertTriangle className="h-8 w-8" />
                <span>{error}</span>
            </div>
        ) : (
          <p className="text-lg font-medium text-center flex items-start gap-3">
            <Lightbulb className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <span>{challenge}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
