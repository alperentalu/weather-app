import React, { useCallback, memo } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WeatherData } from '../services/weatherService';
import { useTheme } from '../contexts/ThemeContext';

const Card = styled(motion.div)`
  background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#ffffff'};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const CityName = styled(motion.h2)`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  margin: 0 0 10px 0;
`;

const Temperature = styled(motion.div)`
  font-size: 2.5em;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  margin: 10px 0;
`;

const Description = styled(motion.div)`
  color: ${props => props.theme === 'dark' ? '#cccccc' : '#666666'};
  text-transform: capitalize;
`;

interface WeatherCardProps {
  data: WeatherData;
  temperatureUnit: 'celsius' | 'fahrenheit';
  convertTemperature: (temp: number) => number;
}

export const WeatherCard: React.FC<WeatherCardProps> = memo(({ data, temperatureUnit, convertTemperature }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleClick = useCallback(() => {
    navigate(`/detail/${data.name}`);
  }, [navigate, data.name]);

  const temperature = useCallback(() => {
    return `${convertTemperature(data.main.temp)}°${temperatureUnit === 'celsius' ? 'C' : 'F'}`;
  }, [convertTemperature, data.main.temp, temperatureUnit]);

  return (
    <Card
      theme={theme}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <CityName
        theme={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {data.name}
      </CityName>
      <Temperature
        theme={theme}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        {temperature()}
      </Temperature>
      <Description
        theme={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {data.weather[0].description}
      </Description>
    </Card>
  );
}); 