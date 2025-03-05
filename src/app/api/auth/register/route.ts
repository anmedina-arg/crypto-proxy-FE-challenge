import { NextResponse } from 'next/server';
import { mockUsers } from '@/utils/mockUsers';

// Función para generar un ID único
const generateId = () => mockUsers.length + 1;

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Validar que se envíen datos
    if (!username || !password) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    // Verificar si el usuario ya existe
    const existingUser = mockUsers.find((user) => user.username === username);
    if (existingUser) {
      return NextResponse.json(
        { error: 'El usuario ya existe' },
        { status: 400 }
      );
    }

    // Crear nuevo usuario
    const newUser = {
      id: generateId(),
      username,
      password, // Nota: en una app real, debes hashear la contraseña
      token: `fake-jwt-${Date.now()}`,
    };

    // Agregar usuario a la base mockeada
    mockUsers.push(newUser);

    return NextResponse.json(
      { message: 'Usuario registrado', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error en el servidor' + error },
      { status: 500 }
    );
  }
}
