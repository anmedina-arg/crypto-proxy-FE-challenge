import { Crypto } from "@/utils/mockCriptos";
import Link from "next/link";
import styled from "styled-components";

const StyledLineCard = styled.div`
border: 2px solid black;
padding: 8px;
border-radius: 10px;
display: flex;
flex-direction: column;

h3{
	display: inline
}

.modifyCripto{
	background-color: green;
	color: white
}

.deleteCripto{
	background-color: red;
	color: white;
}
`;

type LineCardProps = {
	cripto: Crypto,
};

export default function LineCard({ cripto }: LineCardProps) {
	const { cantidadComprada, id, nombre, precioCompra, ticker } = cripto;

	return (
		<StyledLineCard>
			<div>
				<h3>{nombre}</h3>
				<span>({ticker})</span>
			</div>
			<span>Precio de compra: {precioCompra}</span>
			<span>Cantidad comprada: {cantidadComprada}</span>

			<div>
				{/* Aquí pasamos el id como parte de la ruta dinámica */}
				<Link href={`/crypto/modifyCripto/${id}`} className="modifyCripto">
					Modificar
				</Link>
				<button className="deleteCripto">Eliminar</button>
			</div>
		</StyledLineCard>
	);
}
