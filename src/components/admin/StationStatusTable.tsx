'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import type { HydroStation } from "@/lib/types";
import { MOCK_HYDRO_STATIONS } from "@/lib/mock-data";


export default function StationStatusTable() {
    const stations: HydroStation[] = MOCK_HYDRO_STATIONS;

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
                    {stations.map(station => (
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
