import React from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { ForecastData } from '../services/weatherService';

interface ForecastDetailProps {
  data: ForecastData;
  selectedDate: string;
  onClose: () => void;
  temperatureUnit: 'celsius' | 'fahrenheit';
  convertTemperature: (temp: number) => number;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: ${props => props.theme === 'dark' ? '#2d2d2d' : '#ffffff'};
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
`;

const Title = styled.h2`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  margin: 0 0 20px 0;
`;

const HourlyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
`;

const HourlyCard = styled.div`
  background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#ffffff'};
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Time = styled.div`
  font-weight: bold;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  margin-bottom: 10px;
`;

const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 10px 0;
`;

const Temperature = styled.div`
  font-size: 1.2em;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  margin: 5px 0;
`;

const WeatherInfo = styled.div`
  color: ${props => props.theme === 'dark' ? '#cccccc' : '#666666'};
  font-size: 0.9em;
  margin-top: 5px;
`;

export const ForecastDetail: React.FC<ForecastDetailProps> = ({ 
  data, 
  selectedDate, 
  onClose,
  temperatureUnit,
  convertTemperature 
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const hourlyForecasts = data.list.filter(forecast => {
    const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString();
    return forecastDate === selectedDate;
  });

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Overlay onClick={onClose}>
      <Modal theme={theme} onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose} theme={theme}>×</CloseButton>
        <Title theme={theme}>{new Date(selectedDate).toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })}</Title>
        <HourlyGrid>
          {hourlyForecasts.map((forecast, index) => (
            <HourlyCard key={index} theme={theme}>
              <Time>{formatTime(forecast.dt)}</Time>
              <WeatherIcon
                src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                alt={forecast.weather[0].description}
              />
              <Temperature>{convertTemperature(forecast.main.temp)}°{temperatureUnit === 'celsius' ? 'C' : 'F'}</Temperature>
              <WeatherInfo>
                <div>{t('feelsLike')}: {convertTemperature(forecast.main.feels_like)}°{temperatureUnit === 'celsius' ? 'C' : 'F'}</div>
                <div>{t('humidity')}: {forecast.main.humidity}%</div>
                <div>{t('windSpeed')}: {forecast.wind.speed} m/s</div>
              </WeatherInfo>
            </HourlyCard>
          ))}
        </HourlyGrid>
      </Modal>
    </Overlay>
  );
}; 