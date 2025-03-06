'use client';
import styled, { css } from 'styled-components';

type ButtonVariants = 'primary' | 'cancel' | 'modify' | 'delete';

interface ButtonProps {
  variant?: ButtonVariants;
}

const Button = styled.button<ButtonProps>`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #bf4f74;
  color: #bf4f74;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  width: fit-content;
  transition: all 0.2s linear;

  &:hover {
    background: #bf4f74;
    color: white;
  }

  ${(props) =>
    props.variant === 'primary' &&
    css`
      background: #bf4f74;
      color: white;
    `}
  ${(props) =>
    props.variant === 'cancel' &&
    css`
      background: transparent;
      color: #c10000; /* rojo suave */
      border-color: #c10000;

      &:hover {
        background: #f8dcdc;
      }
    `}
    ${(props) =>
    props.variant === 'modify' &&
    css`
      background-color: rgb(34, 255, 0);
      border: 2px solid rgb(34, 255, 0);
      color: #333;

      &:hover {
        background: rgb(116, 255, 118);
        box-shadow: 0 0 10px 0 rgb(34, 255, 0);
      }

      &:active {
        transform: scale(0.98);
      }
    `}
    ${(props) =>
    props.variant === 'delete' &&
    css`
      background: #c10000; /* Rojo fuerte */
      border-color: #c10000;
      color: white;

      &:hover {
        background: #ff3333; /* Rojo claro */
        box-shadow: 0 0 5px 0 #c10000;
      }
    `};
`;

export default Button;
