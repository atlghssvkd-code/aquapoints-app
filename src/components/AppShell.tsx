"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, User as UserIcon } from "lucide-react";
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
import { useAuth, useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { signOut } from "@/lib/auth";
import { doc } from "firebase/firestore";
import { Student } from "@/lib/types";
import { Skeleton } from "./ui/skeleton";

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
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();

  const isAdmin = pathname.startsWith('/admin');

  const userProfileRef = useMemoFirebase(() => {
    if (!user || isAdmin || !firestore) return null;
    return doc(firestore, 'users', user.uid, 'profile', user.uid);
  }, [firestore, user, isAdmin]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<Student>(userProfileRef);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getUserName = () => {
    if (isAdmin) return 'Admin';
    if (isProfileLoading || isUserLoading) return 'Loading...';
    if (userProfile) return `${userProfile.firstName} ${userProfile.lastName}`;
    if (user) return user.email;
    return 'Guest';
  };
  
  const getUserRole = () => {
      if (isAdmin) return 'Administrator';
      return 'Student';
  }

  const getAvatarFallback = () => {
      const name = getUserName();
      if (name === 'Loading...' || name === 'Guest') return <UserIcon/>;
      return name.charAt(0);
  }

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
                {isUserLoading || isProfileLoading ? (
                  <Skeleton className="h-8 w-8 rounded-full" />
                ) : (
                  <>
                  <AvatarImage src={userProfile?.avatarUrl} alt={getUserName()} data-ai-hint={userProfile?.avatarHint} />
                  <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
                  </>
                )}
              </Avatar>
              <div className="flex flex-col text-sm">
                <span className="font-semibold">{getUserName()}</span>
                <span className="text-muted-foreground text-xs">{getUserRole()}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
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
