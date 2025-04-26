import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { ForecastData } from '../services/weatherService';
import { useTheme } from '../contexts/ThemeContext';
import { ForecastDetail } from './ForecastDetail';
import { formatDateForAzerbaijani } from '../utils/dateFormat';

interface ForecastListProps {
  data: ForecastData;
  temperatureUnit: 'celsius' | 'fahrenheit';
  convertTemperature: (temp: number) => number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h2`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  margin: 0 0 15px 0;
  font-size: 1.5rem;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ForecastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ForecastCard = styled.div`
  background: ${props => props.theme === 'dark' ? '#2d2d2d' : '#ffffff'};
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const DateText = styled.div`
  font-size: 1.1em;
  font-weight: bold;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 1em;
  }
`;

const Temperature = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme === 'dark' ? '#cccccc' : '#666666'};
`;

const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 10px 0;
`;

export const ForecastList: React.FC<ForecastListProps> = ({ data, temperatureUnit, convertTemperature }) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Her gün için ilk tahmini al (12:00'deki tahmin)
  const dailyForecasts = data.list.filter(forecast => {
    const date = new Date(forecast.dt * 1000);
    return date.getHours() === 12;
  });

  const formatDate = (dt: number) => {
    const date = new Date(dt * 1000);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    };

    if (i18n.language === 'az') {
      return formatDateForAzerbaijani(date);
    }

    return new Intl.DateTimeFormat(i18n.language, options).format(date);
  };

  return (
    <Container>
      <Title theme={theme}>{t('forecast')}</Title>
      <ForecastGrid>
        {dailyForecasts.map((forecast, index) => (
          <ForecastCard 
            key={index} 
            theme={theme}
            onClick={() => {
              const date = new Date(forecast.dt * 1000);
              setSelectedDate(date.toISOString().split('T')[0]);
            }}
          >
            <DateText>{formatDate(forecast.dt)}</DateText>
            <WeatherIcon
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
              alt={forecast.weather[0].description}
            />
            <Temperature>
              <span>{convertTemperature(forecast.main.temp)}°{temperatureUnit === 'celsius' ? 'C' : 'F'}</span>
            </Temperature>
          </ForecastCard>
        ))}
      </ForecastGrid>

      {selectedDate && (
        <ForecastDetail
          data={data}
          selectedDate={selectedDate}
          onClose={() => setSelectedDate(null)}
          temperatureUnit={temperatureUnit}
          convertTemperature={convertTemperature}
        />
      )}
    </Container>
  );
}; 