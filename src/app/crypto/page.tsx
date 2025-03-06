"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/utils/mockUsers";
import CryptoList from "@/app/components/cryptoList";
import Button from "../components/ui/button";
import Title from "../components/ui/title";
import Text from "../components/ui/text";

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
			<Title>Welcome, {user.username}!</Title>
			<Text>Tus cryptos son:</Text>
			<CryptoList />
			<Button
				onClick={() => {
					console.log("chau")
					localStorage.removeItem("user");
					router.push("/");
				}}
			>
				Logout
			</Button>
		</div>
	);
}
