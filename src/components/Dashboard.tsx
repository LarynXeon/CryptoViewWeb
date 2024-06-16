import React from 'react';
import Chart from './Chart';
import RealTimeData from './RealTimeData';
import styled from '@emotion/styled';

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Dashboard: React.FC = () => {
  return (
    <DashboardContainer>
      <RealTimeData />
      <Chart />
    </DashboardContainer>
  );
};

export default Dashboard;
