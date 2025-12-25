import {NextRequest, NextResponse} from 'next/server';

const PROTECTED_ROUTES = ['/dashboard', '/leaderboard', '/map'];
const ADMIN_ROUTES = ['/admin'];
const PUBLIC_ROUTES = ['/login', '/'];

export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const sessionCookie = request.cookies.get('firebase-session');

  // If trying to access a protected route without a session, redirect to login
  if (PROTECTED_ROUTES.some(path => pathname.startsWith(path)) && !sessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // If trying to access an admin route without a session, redirect to login
  if (ADMIN_ROUTES.some(path => pathname.startsWith(path)) && !sessionCookie) {
    // In a real app, you'd also check for an admin role here
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // If user is logged in and tries to access login page, redirect to dashboard
  if (pathname === '/login' && sessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
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
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
