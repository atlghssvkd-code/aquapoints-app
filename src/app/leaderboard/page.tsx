'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCollection, useUser, useFirestore, useMemoFirebase } from "@/firebase";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { collection, query, orderBy, limit } from "firebase/firestore";
import type { LeaderboardEntry, Student } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function LeaderboardPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    // Note: This query requires a composite index in Firestore.
    // The error message in the browser console will provide a direct link to create it.
    const leaderboardQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        // This is a collection group query, which queries all 'profile' subcollections.
        return query(collection(firestore, 'users'), orderBy("hydroPoints", "desc"), limit(10));
    }, [firestore]);

    const { data: leaderboardData, isLoading } = useCollection<Student>(leaderboardQuery);

    const leaderboard: LeaderboardEntry[] = (leaderboardData || []).map((student, index) => ({
        rank: index + 1,
        studentId: student.id,
        name: `${student.firstName} ${student.lastName}`,
        points: student.hydroPoints,
        avatarUrl: student.avatarUrl,
        avatarHint: student.avatarHint
    }));

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
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><Skeleton className="h-10 w-10 rounded-full" /></TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <Skeleton className="h-10 w-10 rounded-full" />
                                                <Skeleton className="h-4 w-32" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                                    </TableRow>
                                ))
                            ) : leaderboard.map(entry => (
                                <TableRow key={entry.studentId} className={cn(user && entry.studentId === user.uid && "bg-accent")}>
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
