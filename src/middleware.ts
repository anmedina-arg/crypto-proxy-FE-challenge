import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token'); // Obtener token de las cookies

  const isAuthRoute = req.nextUrl.pathname === '/dashboard'; // Rutas protegidas

  if (isAuthRoute && !token) {
    return NextResponse.redirect(new URL('/', req.url)); // Redirigir si no hay token
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/crypto/:path*'], // Aplica el middleware solo en /dashboard
};
