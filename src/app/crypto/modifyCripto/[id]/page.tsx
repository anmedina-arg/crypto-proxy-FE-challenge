'use client';
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import Form from "@/app/components/ui/form";
import Label from "@/app/components/ui/label";
import Title from "@/app/components/ui/title";
import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";

const fetchCrypto = async (id: string) => {
	const res = await fetch(`http://localhost:4000/criptos/${id}`);
	if (!res.ok) throw new Error("Error al cargar la cripto");
	return res.json();
};


const updateCryptoAPI = async (data: { id: string, precioCompra: number, cantidadComprada: number }) => {
	const res = await fetch(`http://localhost:4000/criptos/${data.id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!res.ok) throw new Error("Error al actualizar la cripto123");
	return res.json();
};


export default function ModifyCripto() {
	const router = useRouter();

	const [precioCompra, setPrecioCompra] = useState<number | string>("");
	const [cantidadComprada, setCantidadComprada] = useState<number | string>("");
	const [message, setMessage] = useState<string | null>(null);
	const { id } = useParams();

	const { data } = useQuery(["crypto", id], () => fetchCrypto(id as string), {
		enabled: !!id,
		onSuccess: (data) => {
			setPrecioCompra(data.precioCompra);
			setCantidadComprada(data.cantidadComprada);
		},
	});

	const mutation = useMutation({
		mutationFn: updateCryptoAPI,
		onSuccess: (data) => {
			setMessage(`Crypto updated successfully: ${JSON.stringify(data)}`);
		},
		onError: (error: any) => {
			setMessage(`Error: ${error.message}`);
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!precioCompra || !cantidadComprada) {
			setMessage("Please fill in all fields.");
			return;
		}

		if (id) {
			mutation.mutate({
				id: id as string,
				precioCompra: Number(precioCompra),
				cantidadComprada: Number(cantidadComprada),
			});
		}
		router.push('/crypto')
	};

	return (
		<div>
			<Title>Modify Crypto</Title>

			<Form onSubmit={handleSubmit}>
				<Label htmlFor="precioCompra">precio de Compra:</Label>
				<Input
					id="precioCompra"
					type="number"
					value={precioCompra}
					onChange={(e) => setPrecioCompra(e.target.value)}
					placeholder="Enter Precio de Compra"
				/>

				<Label htmlFor="cantidadComprada">antidad Comprada:</Label>
				<Input
					id="cantidadComprada"
					type="number"
					value={cantidadComprada}
					onChange={(e) => setCantidadComprada(e.target.value)}
					placeholder="Enter Cantidad Comprada"
				/>

				<Button variant='primary' type="submit" disabled={mutation.isLoading}>Update Crypto</Button>
			</Form>

			{message && <p>{message}</p>}
		</div>
	);
}
