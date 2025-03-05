'use client'
import styled from "styled-components";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; // Next.js 14 usa `next/navigation`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default function LoginForm() {
	const [user, setUser] = useState({
		username: "",
		password: "",
		token: ""
	});

	const router = useRouter();

	// Función para hacer la petición al backend
	const loginUser = async (credentials: { username: string; password: string }) => {
		const res = await fetch("/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(credentials),
		});

		if (!res.ok) throw new Error("Invalid credentials");
		return res.json();
	};

	// useMutation para manejar el login
	const mutation = useMutation({
		mutationFn: loginUser,
		onSuccess: (data) => {
			console.log("Login exitoso:", data);
			localStorage.setItem("user", JSON.stringify(data))
			localStorage.setItem("token", data.token); // Guardamos el token en localStorage
			setUser((prev) => ({ ...prev, token: data.token })); // Actualizar estado `user`
			router.push("/crypto"); // Redirigir inmediatamente
		},
		onError: () => {
			console.error("Usuario o contraseña incorrectos");
		}
	});


	// Manejar cambios en los inputs
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.id]: e.target.value });
	};

	// Manejar el envío del formulario
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutation.mutate(user); // Enviar credenciales a la API
	};

	return (
		<StyledForm onSubmit={handleSubmit}>
			<label htmlFor="username">Username</label>
			<input id="username" type="text" onChange={handleChange} placeholder="myUsername123" />

			<label htmlFor="password">Password</label>
			<input id="password" type="password" onChange={handleChange} />

			<button type="submit" disabled={mutation.isLoading}>
				{mutation.isLoading ? "Logging in..." : "Login"}
			</button>

			{mutation.isError && <p style={{ color: "red" }}>Usuario o contraseña incorrectos</p>}
		</StyledForm>
	);
}
