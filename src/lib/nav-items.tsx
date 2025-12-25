import { LayoutDashboard, Map, Trophy, User, Users, Shield } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  match?: (pathname: string) => boolean;
};

export const studentNavItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard />,
    match: (pathname) => pathname === "/dashboard",
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
      match: (pathname) => pathname === "/admin",
    },
  ];
  