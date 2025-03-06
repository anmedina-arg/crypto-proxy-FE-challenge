'use client';
import styled, { keyframes } from 'styled-components';

const shine = keyframes`
  to {
    background-position: 200% center;
  }
`;

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 3rem;
  background: linear-gradient(
    to right,
    #004aad 20%,
    #38b6ff 40% 60%,
    #004aad 80%
  );
  background-size: 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${shine} 5s linear infinite;
`;

export default Title;
