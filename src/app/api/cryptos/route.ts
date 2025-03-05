import { NextResponse } from 'next/server';
import { mockCriptos } from '@/utils/mockCriptos';

// Simulamos una base de datos en memoria
let cryptos = [...mockCriptos];

// 📌 GET: Obtener criptomonedas
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos antes de responder
  return NextResponse.json(cryptos);
}

// 📌 POST: Agregar nueva cripto
export async function POST(req: Request) {
  const newCrypto = await req.json();
  cryptos.push({ ...newCrypto, id: String(Date.now()) });
  return NextResponse.json(newCrypto, { status: 201 });
}

// 📌 DELETE: Eliminar una cripto
export async function DELETE(req: Request) {
  const { id } = await req.json();
  cryptos = cryptos.filter((c) => c.id !== id);
  return NextResponse.json({ message: 'Crypto deleted' }, { status: 200 });
}
