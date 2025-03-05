import { Crypto } from "@/utils/mockCriptos";
import Link from "next/link";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const StyledLineCard = styled.div`
  border: 2px solid black;
  padding: 8px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  h3 {
    display: inline;
  }

  .modifyCripto {
    background-color: green;
    color: white;
    padding: 5px;
    margin-right: 5px;
    text-decoration: none;
    border-radius: 5px;
  }

  .deleteCripto {
    background-color: red;
    color: white;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

type LineCardProps = {
	cripto: Crypto;
};

export default function LineCard({ cripto }: LineCardProps) {
	const { id, nombre, ticker, precioCompra, cantidadComprada } = cripto;

	const queryClient = useQueryClient();

	const deleteCrypto = async (id: string) => { // <-- id ahora es string
		const res = await fetch(`http://localhost:4000/criptos/${id}`, {
			method: "DELETE",
		});

		if (!res.ok) throw new Error("Error eliminando la cripto");
	};

	// useMutation con el id como string
	const mutation = useMutation({
		mutationFn: deleteCrypto,
		onSuccess: (_, deletedId) => {
			queryClient.setQueryData<Crypto[]>(["cryptos"], (oldData) => {
				if (!oldData) return [];
				return oldData.filter((cripto) => cripto.id !== deletedId); // <-- Comparar como string
			});

			queryClient.invalidateQueries({ queryKey: ["cryptos"] });
		},
	});

	// En handleDelete, pasamos el id como string
	const handleDelete = () => {
		const isConfirmed = window.confirm(
			`¿Estás seguro de eliminar ${nombre} (${ticker})?`
		);
		if (isConfirmed) {
			mutation.mutate(id!); // <-- Ya no convertimos a número
		}
	};

	return (
		<StyledLineCard>
			<div>
				<h3>{nombre}</h3> <span>({ticker})</span>
			</div>
			<span>Precio de compra: {precioCompra}</span>
			<span>Cantidad comprada: {cantidadComprada}</span>

			<div>
				<Link href={`/crypto/modifyCripto/${id}`} className="modifyCripto">
					Modificar
				</Link>
				<button className="deleteCripto" onClick={handleDelete}>
					Eliminar
				</button>
			</div>
		</StyledLineCard>
	);
}
