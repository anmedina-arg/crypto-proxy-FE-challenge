'use client';

import styled from 'styled-components';

const Card = styled.div`
  background: linear-gradient(45deg, #0db3d8, #3e2fff);
  border: 2px solid black;
  padding: 8px;
  margin: 4px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;

  h3 {
    display: inline;
  }
`;

export default Card;
