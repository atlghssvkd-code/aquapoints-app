import { AppShell } from "@/components/AppShell";
import { adminNavItems } from "@/lib/nav-items";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell navItems={adminNavItems}>{children}</AppShell>;
}
