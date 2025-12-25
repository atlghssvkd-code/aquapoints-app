import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, PlusCircle, FileText } from "lucide-react";

export default function QuickActionsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button>
          <Gift className="mr-2" />
          Distribute Points
        </Button>
        <Button variant="secondary">
          <PlusCircle className="mr-2" />
          Add New Station
        </Button>
        <Button variant="outline">
          <FileText className="mr-2" />
          Generate Report
        </Button>
      </CardContent>
    </Card>
  );
}
