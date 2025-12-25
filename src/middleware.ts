import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/dashboard', '/leaderboard', '/map'];
const ADMIN_ROUTES = ['/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('firebase-session-token');

  // If user tries to access login page while logged in, redirect to dashboard
  if (pathname.startsWith('/login') && sessionToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Protect student routes
  if (PROTECTED_ROUTES.some(path => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protect admin routes
  if (ADMIN_ROUTES.some(path => pathname.startsWith(path))) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // In a real app, you would also verify the token has an 'admin' custom claim
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - / (the public homepage)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|$).*)',
  ],
};
