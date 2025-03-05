import { NextResponse } from 'next/server';
import { mockUsers } from '@/utils/mockUsers';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Buscar usuario en la lista mockeada
  const user = mockUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Simulamos un JWT falso
  const fakeToken = `fake-jwt-${user.id}`;

  const response = NextResponse.json({
    id: user.id,
    username: user.username,
    token: fakeToken,
  });

  // Guardamos el token en una cookie HTTP
  response.cookies.set('auth_token', fakeToken, {
    httpOnly: true, // Evita que el token sea accesible desde JS
    secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
    path: '/', // Disponible en todo el sitio
    maxAge: 60 * 60 * 24, // Expira en 24 horas
  });

  return response;
}
