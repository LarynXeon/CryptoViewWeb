import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import styled from '@emotion/styled';

const AppContainer = styled.div`
  background-color: #121212;
  min-height: 100vh;
  color: #e0e0e0;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Header />
      <Dashboard />
    </AppContainer>
  );
};

export default App;
