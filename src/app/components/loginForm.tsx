'use client'
import Cookies from 'js-cookie';
import styled from "styled-components";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Label from './ui/label';
import Button from './ui/button';
import Form from './ui/form';
import Input from './ui/input';


export default function LoginForm() {
	const [user, setUser] = useState({ username: "", password: "" });
	const router = useRouter();

	const loginUser = async (credentials: { username: string; password: string }) => {
		const res = await fetch(`http://localhost:4000/users?username=${credentials.username}&password=${credentials.password}`);
		const data = await res.json();

		if (data.length === 0) throw new Error("Invalid credentials");

		const user = data[0];

		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", user.token);

		Cookies.set('auth_token', data.token, { expires: 1, path: '/' });

		return user;
	};

	const mutation = useMutation({
		mutationFn: loginUser,
		onSuccess: (data) => {
			console.log("Login exitoso:", data);

			setTimeout(() => {
				router.replace("/crypto");
			}, 1000);
		},
		onError: () => {
			console.error("Usuario o contraseña incorrectos");
		}
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.id]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutation.mutate(user);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Label htmlFor="username">username</Label>
			<Input id="username" type="text" onChange={handleChange} placeholder="myUsername123" />

			<Label htmlFor="password">password</Label>
			<Input id="password" type="password" onChange={handleChange} placeholder="•••••••" />

			<Button type="submit" disabled={mutation.isLoading} variant='primary'>
				{mutation.isLoading ? "Logging in..." : "Login"}
			</Button>

			{mutation.isError && <p style={{ color: "red" }}>Usuario o contraseña incorrectos</p>}
		</Form>
	);
}
