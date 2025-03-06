'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Crypto } from '@/utils/mockCriptos';
import Form from "../../components/ui/form";
import Label from "../../components/ui/label";
import Title from "@/app/components/ui/title";
import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";

const addCrypto = async (newCripto: Crypto) => {
	const res = await fetch("http://localhost:4000/criptos", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newCripto),
	});
	return res.json();
};

export default function AddCrypto() {
	const [nombre, setNombre] = useState("");
	const [ticker, setTicker] = useState("");
	const [precioCompra, setPrecioCompra] = useState(0);
	const [cantidadComprada, setCantidadComprada] = useState(0);
	const router = useRouter();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: addCrypto,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cryptos"] });
			router.push("/crypto");
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutation.mutate({
			nombre, ticker, precioCompra, cantidadComprada
		});
	};

	return (
		<div>
			<Title>Agrega una nueva Cripto!!</Title>
			<Form onSubmit={handleSubmit}>
				<Label htmlFor="cryptoName">Nombre de la crypto</Label>
				<Input id='cryptoName' type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

				<Label htmlFor="ticker">Ticker</Label>
				<Input id='ticker' type="text" placeholder="Ticker" value={ticker} onChange={(e) => setTicker(e.target.value)} required />

				<Label htmlFor="price">Precio de Compra</Label>
				<Input id='price' type="number" placeholder="Precio de Compra" value={precioCompra} onChange={(e) => setPrecioCompra(Number(e.target.value))} required />

				<Label htmlFor="quantity">Cantidad Comprada</Label>
				<Input id='quantity' type="number" placeholder="Cantidad Comprada" value={cantidadComprada} onChange={(e) => setCantidadComprada(Number(e.target.value))} required />

				<Button variant='primary' type="submit">Guardar</Button>
			</Form>
		</div>
	);
}
