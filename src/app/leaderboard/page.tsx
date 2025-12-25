'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LeaderboardEntry } from "@/lib/types";
import { MOCK_STUDENT_LEADERBOARD } from "@/lib/mock-data";

export default function LeaderboardPage() {
    const userId = "student1"; // mock user id
    const leaderboard: LeaderboardEntry[] = MOCK_STUDENT_LEADERBOARD.map((student, index) => ({
        rank: index + 1,
        studentId: student.id,
        name: `${student.firstName} ${student.lastName}`,
        points: student.hydroPoints,
        avatarUrl: student.avatarUrl,
        avatarHint: student.avatarHint
    })).sort((a, b) => b.points - a.points);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">
                    Leaderboard
                </h1>
                <p className="text-muted-foreground">See who is leading the hydration challenge!</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Top Hydrators</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Rank</TableHead>
                                <TableHead>Student</TableHead>
                                <TableHead className="text-right">Hydro-Points</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaderboard.map(entry => (
                                <TableRow key={entry.studentId} className={cn(userId && entry.studentId === userId && "bg-accent")}>
                                    <TableCell className="font-bold text-lg">
                                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary/50">
                                            {entry.rank === 1 ? <Trophy className="h-6 w-6 text-yellow-500" /> : entry.rank}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={entry.avatarUrl} alt={entry.name} data-ai-hint={entry.avatarHint} />
                                                <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{entry.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-mono text-lg">{entry.points.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
