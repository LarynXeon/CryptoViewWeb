import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from '@emotion/styled';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import InfoIcon from '@mui/icons-material/Info';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

const darkTheme = {
  background: '#1f1f1f',
  text: '#e0e0e0',
  tabBackground: '#333',
  tabBackgroundHover: '#444',
  chartGrid: '#444',
};

const lightTheme = {
  background: '#f9f9f9',
  text: '#333',
  tabBackground: '#ddd',
  tabBackgroundHover: '#ccc',
  chartGrid: '#ccc',
};

const ChartContainer = styled.div<{ theme: typeof darkTheme | typeof lightTheme }>`
  margin: 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.text};
  transition: background-color 0.5s ease, color 0.5s ease;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const TabButton = styled.button<{ theme: typeof darkTheme | typeof lightTheme }>`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.tabBackground};
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.tabBackgroundHover};
  }
`;

const ThemeSwitchButton = styled.button<{ theme: typeof darkTheme | typeof lightTheme }>`
  position: absolute;
  top: 20px;
  right: 20px;
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const InfoContainer = styled.div<{ theme: typeof darkTheme | typeof lightTheme }>`
  margin-top: 20px;
  color: ${({ theme }) => theme.text};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const InfoIconWrapper = styled.div`
  margin-right: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const CryptoButton = styled.button<{ theme: typeof darkTheme | typeof lightTheme }>`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.tabBackground};
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.tabBackgroundHover};
  }
`;

interface CoinData {
  name: string;
  data: { name: string; price: number }[];
}

const fetchHistoricalData = async (coin: string): Promise<CoinData> => {
  const sampleDataBTC = [
    { name: 'Jan 2021', price: 30000 },
    { name: 'Feb 2021', price: 35000 },
    { name: 'Mar 2021', price: 42000 },
    { name: 'Apr 2021', price: 48000 },
    { name: 'May 2021', price: 35000 },
    { name: 'Jun 2021', price: 30000 },
    { name: 'Jul 2021', price: 31000 },
    { name: 'Aug 2021', price: 47000 },
    { name: 'Sep 2021', price: 43000 },
    { name: 'Oct 2021', price: 61000 },
    { name: 'Nov 2021', price: 57000 },
    { name: 'Dec 2021', price: 46000 },
    { name: 'Jan 2022', price: 42000 },
    { name: 'Feb 2022', price: 38000 },
    { name: 'Mar 2022', price: 47000 },
    { name: 'Apr 2022', price: 39000 },
    { name: 'May 2022', price: 29000 },
    { name: 'Jun 2022', price: 20000 },
    { name: 'Jul 2022', price: 23000 },
    { name: 'Aug 2022', price: 25000 },
    { name: 'Sep 2022', price: 19000 },
    { name: 'Oct 2022', price: 21000 },
    { name: 'Nov 2022', price: 16000 },
    { name: 'Dec 2022', price: 16500 },
    { name: 'Jan 2023', price: 23000 },
    { name: 'Feb 2023', price: 24000 },
    { name: 'Mar 2023', price: 28000 },
    { name: 'Apr 2023', price: 29000 },
    { name: 'May 2023', price: 27000 },
    { name: 'Jun 2023', price: 30000 },
    { name: 'Jul 2023', price: 31000 },
    { name: 'Aug 2023', price: 29000 },
    { name: 'Sep 2023', price: 26000 },
    { name: 'Oct 2023', price: 34000 },
    { name: 'Nov 2023', price: 37000 },
    { name: 'Dec 2023', price: 41000 },
  ];

  const sampleDataETH = [
    { name: 'Jan 2021', price: 1000 },
    { name: 'Feb 2021', price: 1200 },
    { name: 'Mar 2021', price: 1500 },
    { name: 'Apr 2021', price: 2200 },
    { name: 'May 2021', price: 3000 },
    { name: 'Jun 2021', price: 2000 },
    { name: 'Jul 2021', price: 2200 },
    { name: 'Aug 2021', price: 3200 },
    { name: 'Sep 2021', price: 3000 },
    { name: 'Oct 2021', price: 4300 },
    { name: 'Nov 2021', price: 4700 },
    { name: 'Dec 2021', price: 3900 },
    { name: 'Jan 2022', price: 3200 },
    { name: 'Feb 2022', price: 2700 },
    { name: 'Mar 2022', price: 3400 },
    { name: 'Apr 2022', price: 2800 },
    { name: 'May 2022', price: 2000 },
    { name: 'Jun 2022', price: 1100 },
    { name: 'Jul 2022', price: 1600 },
    { name: 'Aug 2022', price: 1800 },
    { name: 'Sep 2022', price: 1300 },
    { name: 'Oct 2022', price: 1500 },
    { name: 'Nov 2022', price: 1100 },
    { name: 'Dec 2022', price: 1200 },
    { name: 'Jan 2023', price: 1600 },
    { name: 'Feb 2023', price: 1700 },
    { name: 'Mar 2023', price: 1800 },
    { name: 'Apr 2023', price: 1900 },
    { name: 'May 2023', price: 2100 },
    { name: 'Jun 2023', price: 2200 },
    { name: 'Jul 2023', price: 2400 },
    { name: 'Aug 2023', price: 2300 },
    { name: 'Sep 2023', price: 2000 },
    { name: 'Oct 2023', price: 2500 },
    { name: 'Nov 2023', price: 2600 },
    { name: 'Dec 2023', price: 2900 },
  ];

  let data: { name: string; price: number; }[] = [];
  if (coin === 'BTC') {
    data = sampleDataBTC;
  } else if (coin === 'ETH') {
    data = sampleDataETH;
  }

  return { name: coin, data };
};

const Chart: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [currentTab, setCurrentTab] = useState<'about' | 'usage' | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const fetchData = useCallback(async (coin: string) => {
    try {
      const data = await fetchHistoricalData(coin);
      setCoinData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setCoinData(null);
    }
  }, []);

  useEffect(() => {
    if (selectedCoin) {
      fetchData(selectedCoin);
    } else {
      setCoinData(null); // Reset data when no coin is selected
    }
  }, [selectedCoin, fetchData]);

  const handleCoinSelect = (coin: string) => {
    setSelectedCoin(coin);
    setCurrentTab(null); // Reset tab when selecting a coin
  };

  const handleTabChange = (tab: 'about' | 'usage') => {
    setCurrentTab(tab);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ChartContainer theme={theme === 'dark' ? darkTheme : lightTheme}>
      <ThemeSwitchButton onClick={toggleTheme} theme={theme === 'dark' ? darkTheme : lightTheme}>
        {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </ThemeSwitchButton>
      <h2 style={{ color: theme === 'dark' ? darkTheme.text : lightTheme.text }}>Historical Price Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={coinData?.data || []}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? darkTheme.chartGrid : lightTheme.chartGrid} />
          <XAxis dataKey="name" stroke={theme === 'dark' ? darkTheme.text : lightTheme.text} />
          <YAxis stroke={theme === 'dark' ? darkTheme.text : lightTheme.text} />
          <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? darkTheme.background : lightTheme.background, color: theme === 'dark' ? darkTheme.text : lightTheme.text, borderRadius: '8px', border: 'none' }} />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" name={`Price of ${coinData?.name || 'Market'}`} />
        </LineChart>
      </ResponsiveContainer>
      <ButtonContainer>
        <CryptoButton onClick={() => handleCoinSelect('BTC')} theme={theme === 'dark' ? darkTheme : lightTheme}>Show BTC</CryptoButton>
        <CryptoButton onClick={() => handleCoinSelect('ETH')} theme={theme === 'dark' ? darkTheme : lightTheme}>Show ETH</CryptoButton>
        {selectedCoin && <CryptoButton onClick={() => setSelectedCoin(null)} theme={theme === 'dark' ? darkTheme : lightTheme}>Show All</CryptoButton>}
      </ButtonContainer>
      <TabContainer>
        <TabButton onClick={() => handleTabChange('about')} theme={theme === 'dark' ? darkTheme : lightTheme}>About</TabButton>
        <TabButton onClick={() => handleTabChange('usage')} theme={theme === 'dark' ? darkTheme : lightTheme}>Usage</TabButton>
      </TabContainer>
      {currentTab === 'about' && (
        <InfoContainer theme={theme === 'dark' ? darkTheme : lightTheme}>
          <h3>About</h3>
          <InfoItem>
            <InfoIconWrapper><InfoIcon /></InfoIconWrapper>
            <p>This is a cryptocurrency historical price chart application.</p>
          </InfoItem>
          <InfoItem>
            <InfoIconWrapper><EmojiObjectsIcon /></InfoIconWrapper>
            <p>It displays historical price data for selected cryptocurrencies.</p>
          </InfoItem>
        </InfoContainer>
      )}
      {currentTab === 'usage' && (
        <InfoContainer theme={theme === 'dark' ? darkTheme : lightTheme}>
          <h3>Usage</h3>
          <InfoItem>
            <InfoIconWrapper><InfoIcon /></InfoIconWrapper>
            <p>Click on the buttons below to select a cryptocurrency:</p>
          </InfoItem>
        </InfoContainer>
      )}
    </ChartContainer>
  );
};

export default Chart;
