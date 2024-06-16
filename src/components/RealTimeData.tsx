import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

const DataContainer = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #1f1f1f;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  color: #e0e0e0;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #333;
  position: relative;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #333;
    cursor: pointer;

    .tooltip {
      display: block;
    }
  }
`;

const CoinName = styled.span`
  font-weight: 500;
`;

const CoinPrice = styled.span`
  color: #2ecc71;
`;

const ShowMoreButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #444;
  }
`;

const Tooltip = styled.div`
  background-color: #333;
  color: white;
  padding: 10px;
  border-radius: 8px;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  display: none;

  p {
    margin: 0;
  }
`;

interface CoinData {
  id: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

const RealTimeData: React.FC = () => {
  const [data, setData] = useState<CoinData[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            per_page: 50, // Adjust per_page as needed
            page: 1,
          },
        });
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const handleCoinClick = (coin: CoinData) => {
    setSelectedCoin(coin);
  };

  return (
    <DataContainer>
      <h2>Real-Time Data</h2>
      <List>
        {data.slice(0, visibleCount).map((coin) => (
          <ListItem key={coin.id} onClick={() => handleCoinClick(coin)}>
            <CoinName>{coin.name}</CoinName>
            <CoinPrice>${coin.current_price}</CoinPrice>
            <Tooltip className="tooltip">
              <p>Market Cap: ${coin.market_cap}</p>
              <p>24h Change: {coin.price_change_percentage_24h}%</p>
            </Tooltip>
          </ListItem>
        ))}
      </List>
      {visibleCount < data.length && (
        <ShowMoreButton onClick={handleShowMore}>Show More</ShowMoreButton>
      )}

      {selectedCoin && (
        <p>Selected Coin: {selectedCoin.name}</p>
      )}
    </DataContainer>
  );
};

export default RealTimeData;
