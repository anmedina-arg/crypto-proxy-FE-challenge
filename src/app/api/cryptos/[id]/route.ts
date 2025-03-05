import { NextResponse } from 'next/server';
import { mockCriptos } from '@/utils/mockCriptos'; // Si tienes datos simulados

// Simulamos una base de datos en memoria
let cryptos = [...mockCriptos];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id'); // Obtener el parámetro 'id' de la URL

  if (id) {
    const crypto = cryptos.find((c) => c.id === Number(id));
    if (!crypto) {
      return NextResponse.json(
        { message: 'Crypto not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(crypto); // Retorna la cripto correspondiente
  }

  await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos antes de responder
  return NextResponse.json(cryptos); // Retorna todas las criptos si no hay ID
}

// 📌 PATCH: Modificar una cripto (solo cantidad y precio)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Aquí accedemos al `id` del parámetro de la URL
  const { id } = params;

  console.log('entro hassta aqui???');

  const { precioCompra, cantidadComprada } = await req.json();

  // Buscar la cripto por ID
  const index = cryptos.findIndex((c) => c.id === Number(id));

  if (index === -1) {
    return NextResponse.json({ message: 'Crypto not found' }, { status: 404 });
  }

  // Actualizamos la cripto
  cryptos[index] = {
    ...cryptos[index],
    precioCompra: precioCompra ?? cryptos[index].precioCompra,
    cantidadComprada: cantidadComprada ?? cryptos[index].cantidadComprada,
  };

  return NextResponse.json(cryptos[index], { status: 200 });
}
