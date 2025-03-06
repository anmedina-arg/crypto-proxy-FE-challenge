import Title from './components/ui/title';
import Link from 'next/link';
import LoginForm from './components/loginForm';
import './globals.css';
import Text from './components/ui/text';
import Button from './components/ui/button';

export default function Home() {

  return (
    <>
      <Title>Welcome to Proxi Cripto traker!</Title>
      <LoginForm />
      <Text>Todavia no estas registrado?</Text>
      <Link href={'/register'}>
        <Button>
          Registrate aqui!
        </Button>
      </Link>
    </>
  );
}
