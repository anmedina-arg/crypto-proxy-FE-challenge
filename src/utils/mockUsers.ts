export interface User {
  id: number;
  username: string;
  password: string;
  token: string;
}

export const mockUsers: User[] = [
  {
    id: 1,
    username: 'usuario1',
    password: 'password123',
    token: 'fake-jwt-token-1',
  },
  {
    id: 2,
    username: 'usuario2',
    password: 'password456',
    token: 'fake-jwt-token-2',
  },
];
