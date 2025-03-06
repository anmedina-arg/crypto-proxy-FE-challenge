'use client'
import LineCard from "@/app/components/lineCard";
import { Crypto } from "@/utils/mockCriptos";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Button from "./ui/button";

const fetchCryptos = async () => {
	const res = await fetch("http://localhost:4000/criptos");
	return res.json();
};

export default function CryptoList() {

	const { data: cryptos = [], isLoading } = useQuery({ queryKey: ["cryptos"], queryFn: fetchCryptos });


	return (
		<div>
			<Link href={'/crypto/addCrypto'}>
				<Button variant="primary">
					Agregar Cripto
				</Button>
			</Link>

			{isLoading ? <p>Cargando...</p> : cryptos.map((cripto: Crypto) => <LineCard key={cripto.id} cripto={cripto} />)}
		</div>
	);
}
