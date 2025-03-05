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

	// Función para eliminar una cripto en json-server
	const deleteCrypto = async (id: number) => {
		const res = await fetch(`http://localhost:4000/criptos/${id}`, {
			method: "DELETE",
		});

		if (!res.ok) throw new Error("Error eliminando la cripto");
	};

	// useMutation para eliminar la cripto
	const mutation = useMutation({
		mutationFn: deleteCrypto,
		onSuccess: (_, deletedId) => {
			// Actualizar manualmente la caché
			queryClient.setQueryData<Crypto[]>(["cryptos"], (oldData) => {
				if (!oldData) return [];
				return oldData.filter((cripto) => Number(cripto.id) !== deletedId);
			});

			// Invalidar la consulta para forzar un refetch
			queryClient.invalidateQueries({ queryKey: ["cryptos"] });
		},
	});

	// Función para manejar la eliminación con confirmación
	const handleDelete = () => {
		const isConfirmed = window.confirm(
			`¿Estás seguro de eliminar ${nombre} (${ticker})?`
		);
		if (isConfirmed) {
			mutation.mutate(Number(id)!); // Aseguramos que id no sea undefined
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
