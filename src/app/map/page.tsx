import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { hydroStations } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

export default function MapPage() {
    const mapImage = PlaceHolderImages.find(img => img.id === 'map');

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
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">
                    Hydro-Station Locator
                </h1>
                <p className="text-muted-foreground">Find the nearest water station on campus.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Campus Map</CardTitle>
                </CardHeader>
                <CardContent>
                    {mapImage && (
                        <div className="w-full h-[400px] bg-secondary rounded-lg overflow-hidden relative">
                            <Image 
                                src={mapImage.imageUrl}
                                alt={mapImage.description}
                                data-ai-hint={mapImage.imageHint}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Station Directory</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Location</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Directions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {hydroStations.map(station => (
                                <TableRow key={station.id}>
                                    <TableCell className="font-medium">{station.location}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(station.status)} className={cn(station.status === 'Online' && 'bg-green-500/80 text-white')}>
                                            {station.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <a href="#" className="text-primary hover:underline">Get Directions</a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
}
