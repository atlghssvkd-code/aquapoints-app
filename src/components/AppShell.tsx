"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/icons/Logo";
import { currentUser } from "@/lib/data";

export type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

interface AppShellProps {
  children: React.ReactNode;
  navItems: NavItem[];
}

export function AppShell({ children, navItems }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isAdmin = pathname.startsWith('/admin');
  const userName = isAdmin ? 'Admin' : currentUser.name;
  const userRole = isAdmin ? 'Administrator' : 'Student';


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="size-8 text-primary fill-primary" />
            <span className="text-xl font-bold font-headline">AquaPoints</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href)}
                >
                  <Link href={item.href}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                {!isAdmin && <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint={currentUser.avatarHint} />}
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-sm">
                <span className="font-semibold">{userName}</span>
                <span className="text-muted-foreground text-xs">{userRole}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b md:justify-end">
            <SidebarTrigger className="md:hidden" />
            {/* Can add more header content here */}
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-accent/20">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
