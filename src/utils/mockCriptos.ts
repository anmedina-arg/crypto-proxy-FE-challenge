export interface Crypto {
  id: number;
  nombre: string;
  ticker: string;
  precioCompra: number;
  cantidadComprada: number;
}

export const mockCriptos: Crypto[] = [
  {
    id: 1,
    nombre: 'Bitcoin',
    ticker: 'BTC',
    precioCompra: 45000,
    cantidadComprada: 0.5,
  },
  {
    id: 2,
    nombre: 'Ethereum',
    ticker: 'ETH',
    precioCompra: 3000,
    cantidadComprada: 2,
  },
  {
    id: 3,
    nombre: 'Solana',
    ticker: 'SOL',
    precioCompra: 1500,
    cantidadComprada: 5,
  },
];
