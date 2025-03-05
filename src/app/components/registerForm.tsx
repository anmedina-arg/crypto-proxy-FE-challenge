"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { useRouter } from "next/navigation";

// Estilos básicos
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default function RegisterForm() {
	const router = useRouter()

	const [user, setUser] = useState({ username: "", password: "" });

	// Mutación para registrar usuario
	const mutation = useMutation({
		mutationFn: async ({ username, password }: { username: string; password: string }) => {
			const res = await fetch("http://localhost:4000/users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});
			if (!res.ok) throw new Error("Error en el registro");
			return res.json();
		},
	});

	// Manejar cambios en inputs
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setUser((prevUser) => ({ ...prevUser, [id]: value }));
	};

	// Manejar envío del formulario
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutation.mutate(user);
		router.push('/')
	};

	return (
		<StyledForm onSubmit={handleSubmit}>
			<label htmlFor="username">Username</label>
			<input id="username" type="text" onChange={handleChange} placeholder="myUsername123" />

			<label htmlFor="password">Password</label>
			<input id="password" type="password" onChange={handleChange} />

			<button type="submit" disabled={mutation.isLoading}>
				{mutation.isLoading ? "Registering..." : "Register"}
			</button>

			{mutation.isError && <p style={{ color: "red" }}>Error en el registro</p>}
			{mutation.isSuccess && <p style={{ color: "green" }}>Usuario registrado con éxito</p>}
		</StyledForm>
	);
}
