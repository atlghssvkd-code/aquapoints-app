import { AppShell } from "@/components/AppShell";
import { studentNavItems } from "@/lib/nav-items";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell navItems={studentNavItems}>{children}</AppShell>;
}
