import { LayoutDashboard, Map, Trophy, Shield } from "lucide-react";
import type { NavItem } from "@/components/AppShell";

export const studentNavItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard />,
  },
  {
    href: "/map",
    label: "Station Map",
    icon: <Map />,
  },
  {
    href: "/leaderboard",
    label: "Leaderboard",
    icon: <Trophy />,
  },
];

export const adminNavItems: NavItem[] = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: <Shield />,
    },
  ];
  