import React from 'react';
import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  background-color: #1f1f1f;
  padding: 20px;
  color: white;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>Crypto Monitoring Tool</Title>
    </HeaderContainer>
  );
};

export default Header;
