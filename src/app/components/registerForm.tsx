"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Label from './ui/label';
import Button from './ui/button';
import Form from "./ui/form";
import Input from "./ui/input";

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
		<Form onSubmit={handleSubmit}>
			<Label htmlFor="username">Username</Label>
			<Input id="username" type="text" onChange={handleChange} placeholder="myUsername123" />

			<Label htmlFor="password">Password</Label>
			<Input id="password" type="password" onChange={handleChange} />

			<Button type="submit" disabled={mutation.isLoading}>
				{mutation.isLoading ? "Registering..." : "Register"}
			</Button>

			{mutation.isError && <p style={{ color: "red" }}>Error en el registro</p>}
			{mutation.isSuccess && <p style={{ color: "green" }}>Usuario registrado con éxito</p>}
		</Form>
	);
}
