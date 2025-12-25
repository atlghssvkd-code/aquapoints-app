import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/Logo';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-full"
        >
          <path
            fill="hsl(var(--primary))"
            fillOpacity="0.5"
            d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,213.3C672,203,768,149,864,144C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path
            fill="hsl(var(--accent))"
            fillOpacity="0.6"
            d="M0,160L40,176C80,192,160,224,240,240C320,256,400,256,480,234.7C560,213,640,171,720,138.7C800,107,880,85,960,106.7C1040,128,1120,192,1200,208C1280,224,1360,192,1400,176L1440,160L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="z-10 text-center p-8">
        <div className="flex justify-center items-center gap-4 mb-4">
          <Logo className="h-16 w-16 text-primary" />
          <h1 className="text-5xl md:text-6xl font-bold text-primary-dark tracking-tighter font-headline">
            AquaPoints
          </h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Stay hydrated, earn points, and build healthy habits. Your journey to better hydration starts here.
        </p>

        <div className="flex justify-center">
            <Button asChild size="lg">
                <Link href="/login">
                    Login or Sign Up
                    <ArrowRight className="ml-2" />
                </Link>
            </Button>
        </div>
      </div>
    </main>
  );
}
