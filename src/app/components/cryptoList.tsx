'use client'
import LineCard from "@/app/components/lineCard";
import { Crypto } from "@/utils/mockCriptos";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const fetchCryptos = async () => {
	const res = await fetch("/api/cryptos");
	return res.json();
};

export default function CryptoList() {

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { data: cryptos = [], isLoading, isError } = useQuery({ queryKey: ["cryptos"], queryFn: fetchCryptos });


	return (
		<div>
			<Link href={'/crypto/addCrypto'}>Agregar Cripto</Link>

			{isLoading ? <p>Cargando...</p> : cryptos.map((cripto: Crypto) => <LineCard key={cripto.id} cripto={cripto} />)}
		</div>
	);
}
