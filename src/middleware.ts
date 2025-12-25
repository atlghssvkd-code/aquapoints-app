import { NextRequest, NextResponse } from 'next/server';

// No protected routes since there is no login
export function middleware(request: NextRequest) {
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
