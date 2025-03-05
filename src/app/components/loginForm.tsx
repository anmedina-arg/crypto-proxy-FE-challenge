'use client'
import Cookies from 'js-cookie';
import styled from "styled-components";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; // Next.js 14 usa `next/navigation`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default function LoginForm() {
	const [user, setUser] = useState({ username: "", password: "" });
	const router = useRouter();

	// Función para hacer la petición al backend
	const loginUser = async (credentials: { username: string; password: string }) => {
		const res = await fetch(`http://localhost:4000/users?username=${credentials.username}&password=${credentials.password}`);
		const data = await res.json();

		if (data.length === 0) throw new Error("Invalid credentials"); // No encontró usuario

		const user = data[0];

		// Guardar en localStorage (una sola vez)
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", user.token);

		// Guardar en cookies en lugar de localStorage
		Cookies.set('auth_token', data.token, { expires: 1, path: '/' });

		return user;
	};

	// useMutation para manejar el login
	const mutation = useMutation({
		mutationFn: loginUser,
		onSuccess: (data) => {
			console.log("Login exitoso:", data);

			// Redirigir con un pequeño delay para asegurarse de que todo se guarda antes
			setTimeout(() => {
				router.replace("/crypto"); // Usa `replace` en vez de `push` para evitar que el usuario vuelva al login
			}, 1000);
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
