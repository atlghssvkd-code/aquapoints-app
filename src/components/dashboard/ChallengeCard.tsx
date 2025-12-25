"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, RefreshCw } from "lucide-react";
import type { Student } from "@/lib/types";
import { MOCK_CHALLENGES } from "@/lib/mock-data";

export default function ChallengeCard({ user }: { user: Student }) {
  const [challenge, setChallenge] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchChallenge = () => {
    setIsLoading(true);
    // Simulate a network request
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * MOCK_CHALLENGES.length);
      setChallenge(MOCK_CHALLENGES[randomIndex].description);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    if(user){
      fetchChallenge();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>AI Challenge</span>
          <Button variant="ghost" size="icon" onClick={fetchChallenge} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            <span className="sr-only">New Challenge</span>
          </Button>
        </CardTitle>
        <CardDescription>A fun task to help you hydrate.</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[100px] flex items-center justify-center text-center">
          <p className="text-lg font-medium text-center flex items-start gap-3">
            <Lightbulb className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <span>{challenge}</span>
          </p>
      </CardContent>
    </Card>
  );
}
