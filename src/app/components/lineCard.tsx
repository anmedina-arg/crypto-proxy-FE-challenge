import { Crypto } from "@/utils/mockCriptos";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Card from "./ui/card";
import Button from "./ui/button";
import CardButtonsContainer from "./ui/containers/cardButtonsContainer";
import CardInfoContainer from "./ui/containers/cardInfoContainer";

type LineCardProps = {
	cripto: Crypto;
};

export default function LineCard({ cripto }: LineCardProps) {
	const { id, nombre, ticker, precioCompra, cantidadComprada } = cripto;

	const queryClient = useQueryClient();

	const deleteCrypto = async (id: string) => {
		const res = await fetch(`http://localhost:4000/criptos/${id}`, {
			method: "DELETE",
		});

		if (!res.ok) throw new Error("Error eliminando la cripto");
	};

	const mutation = useMutation({
		mutationFn: deleteCrypto,
		onSuccess: (_, deletedId) => {
			queryClient.setQueryData<Crypto[]>(["cryptos"], (oldData) => {
				if (!oldData) return [];
				return oldData.filter((cripto) => cripto.id !== deletedId);
			});

			queryClient.invalidateQueries({ queryKey: ["cryptos"] });
		},
	});

	const handleDelete = () => {
		const isConfirmed = window.confirm(
			`¿Estás seguro de eliminar ${nombre} (${ticker})?`
		);
		if (isConfirmed) {
			mutation.mutate(id!);
		}
	};

	return (
		<Card>
			<CardInfoContainer>
				<div>
					<h3>{nombre}</h3> <span>({ticker})</span>
				</div>
				<span>Precio de compra: {precioCompra}</span>
				<span>Cantidad comprada: {cantidadComprada}</span>
			</CardInfoContainer>

			<CardButtonsContainer>
				<Link href={`/crypto/modifyCripto/${id}`}>
					<Button variant="modify">
						Modificar
					</Button>
				</Link>
				<Button variant="delete" onClick={handleDelete}>
					Eliminar
				</Button>
			</CardButtonsContainer>
		</Card>
	);
}
