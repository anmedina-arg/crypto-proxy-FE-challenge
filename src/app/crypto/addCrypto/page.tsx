'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Crypto } from '@/utils/mockCriptos'

const addCrypto = async (newCripto: Crypto) => {
	const res = await fetch("/api/criptos", {
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
			queryClient.invalidateQueries({ queryKey: ["cryptos"] }); // Refresca la lista
			router.push("/crypto"); // Redirige al listado
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutation.mutate({
			nombre, ticker, precioCompra, cantidadComprada,
			id: 0
		});
	};

	return (
		<div>
			<h1>Agregar Nueva Cripto</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
				<input type="text" placeholder="Ticker" value={ticker} onChange={(e) => setTicker(e.target.value)} required />
				<input type="number" placeholder="Precio de Compra" value={precioCompra} onChange={(e) => setPrecioCompra(Number(e.target.value))} required />
				<input type="number" placeholder="Cantidad Comprada" value={cantidadComprada} onChange={(e) => setCantidadComprada(Number(e.target.value))} required />
				<button type="submit">Guardar</button>
			</form>
		</div>
	);
}
