'use client';
import styled from 'styled-components';

const Label = styled.label`
  color: white;
  font-size: 16px;
  text-transform: lowercase; /* Asegura que todo el texto sea minúscula */

  &::first-letter {
    text-transform: uppercase; /* Convierte solo la primera letra en mayúscula */
  }
`;

export default Label;
