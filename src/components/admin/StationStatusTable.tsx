'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { collection } from "firebase/firestore";
import type { HydroStation } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";

export default function StationStatusTable() {
    const firestore = useFirestore();
    const stationsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'hydro_stations');
    }, [firestore]);

    const { data: stations, isLoading } = useCollection<HydroStation>(stationsQuery);

    const getStatusVariant = (status: 'Online' | 'Offline' | 'Error') => {
        switch (status) {
            case 'Online':
                return 'default';
            case 'Offline':
                return 'secondary';
            case 'Error':
                return 'destructive';
        }
    }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Hydro-Station Management</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Station ID</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Today's Usage</TableHead>
                        <TableHead className="text-right">Last Serviced</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                         Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                <TableCell className="text-right"><Skeleton className="h-4 w-24 ml-auto" /></TableCell>
                            </TableRow>
                        ))
                    ) : (stations || []).map(station => (
                        <TableRow key={station.id}>
                            <TableCell className="font-mono">{station.id}</TableCell>
                            <TableCell className="font-medium">{station.name}</TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(station.status)} className={cn(station.status === 'Online' && 'bg-green-500/80 text-white')}>
                                    {station.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{(station.usage || 0).toLocaleString()} uses</TableCell>
                            <TableCell className="text-right">{format(new Date(station.lastServiced), 'MMM d, yyyy')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}
