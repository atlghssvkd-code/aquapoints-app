import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Droplet } from "lucide-react";
import type { Student } from "@/lib/types";

export default function ProfileCard({ user }: { user: Student }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center gap-4">
        <Avatar className="h-20 w-20 border-4 border-accent">
          <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.avatarHint} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-accent/50 px-4 py-2 mt-2">
          <Droplet className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold text-primary">
            {user.points.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">Hydro-Points</span>
        </div>
      </CardContent>
    </Card>
  );
}
