import Link from 'next/link';
import LoginForm from './components/loginForm';
import './globals.css';

export default function Home() {

  return (
    <>
      <LoginForm />
      <Link href={'/register'}>Registrate!</Link>
    </>
  );
}
