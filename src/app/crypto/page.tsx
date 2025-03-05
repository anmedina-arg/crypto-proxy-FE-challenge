"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/utils/mockUsers";
import CryptoList from "@/app/components/cryptoList";

export default function Dashboard() {
	const router = useRouter();
	const [user, setUser] = useState<User>({
		username: "",
		password: "",
		token: "",
		id: 0
	});

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (!storedUser) {
			router.push("/"); // Redirigir si no hay usuario
		} else {
			setUser(JSON.parse(storedUser));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!user) return <p>Loading...</p>;

	return (
		<div>
			<h1>Welcome, {user.username}!</h1>
			<h2>Mocked Data:</h2>
			<CryptoList />
			<button
				onClick={() => {
					localStorage.removeItem("user");
					router.push("/");
				}}
			>
				Logout
			</button>
		</div>
	);
}
