'use client';
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import styled from "styled-components";

// Styled Component
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// Función para obtener la cripto desde la API
const fetchCrypto = async (id: string) => {
	const res = await fetch(`/api/cryptos/${id}`);
	if (!res.ok) throw new Error("Error al cargar la criptoooooooooooo");
	return res.json();
};


// Función para actualizar la cripto en la API
const updateCryptoAPI = async (data: { id: string, precioCompra: number, cantidadComprada: number }) => {
	console.log("data", data);
	const res = await fetch(`/api/cryptos/${data.id}`, {  // Agregamos el id a la URL
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
	const { id } = useParams(); // Obtener el ID de la URL

	//Usar React Query para obtener los datos de la cripto
	const { data, isLoading, error } = useQuery(["crypto", id], () => fetchCrypto(id as string), {
		enabled: !!id,  // Solo ejecutar si 'id' está disponible
		onSuccess: (data) => {
			setPrecioCompra(data.precioCompra);
			setCantidadComprada(data.cantidadComprada);
		},
	});

	console.log("este", data)

	// Usar React Query para la mutación (actualización de la cripto)
	const mutation = useMutation({
		mutationFn: updateCryptoAPI,
		onSuccess: (data) => {
			console.log("dieai", data)
			setMessage(`Crypto updated successfully: ${JSON.stringify(data)}`);
		},
		onError: (error: any) => {
			setMessage(`Error: ${error.message}`);
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Validación simple
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
			<h2>Modify Crypto</h2>

			{/* Formulario */}
			<StyledForm onSubmit={handleSubmit}>
				<label htmlFor="precioCompra">Precio de Compra:</label>
				<input
					id="precioCompra"
					type="number"
					value={precioCompra}
					onChange={(e) => setPrecioCompra(e.target.value)}
					placeholder="Enter Precio de Compra"
				/>

				<label htmlFor="cantidadComprada">Cantidad Comprada:</label>
				<input
					id="cantidadComprada"
					type="number"
					value={cantidadComprada}
					onChange={(e) => setCantidadComprada(e.target.value)}
					placeholder="Enter Cantidad Comprada"
				/>

				<button type="submit" disabled={mutation.isLoading}>Update Crypto</button>
			</StyledForm>

			{/* Mensaje de estado */}
			{message && <p>{message}</p>}
		</div>
	);
}
