import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import { getCurrentWeather, getForecast, } from '../services/weatherService';
import { useTheme } from '../contexts/ThemeContext';
import { useTemperature } from '../contexts/TemperatureContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { TemperatureUnitSelector } from '../components/TemperatureUnitSelector';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  width: 100%;
  background: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f5f5f5'};
  transition: background-color 0.3s ease;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CityName = styled.h1`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  margin: 0;
  font-size: 2em;
  text-align: center;
  flex: 1;
`;

const BackButton = styled.button`
  padding: 8px 16px;
  background: ${props => props.theme === 'dark' ? '#4a4a4a' : '#f0f0f0'};
  border: none;
  border-radius: 5px;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme === 'dark' ? '#5a5a5a' : '#e0e0e0'};
  }
`;

const WeatherDetails = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const DetailCard = styled(motion.div)`
  background: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DetailTitle = styled(motion.h3)`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
  margin: 0 0 10px 0;
`;

const DetailValue = styled(motion.p)`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
  margin: 0;
  font-size: 1.2em;
`;

const HourlyForecast = styled.div`
  margin-top: 40px;
  padding: 20px;
  background: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const HourlyTitle = styled.h2`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  margin-bottom: 25px;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '🕒';
    font-size: 1.2em;
  }
`;

const HourlyList = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
  overflow-x: auto;
  padding: 10px 0;
  scrollbar-width: thin;
  scrollbar-color: ${props => props.theme === 'dark' ? '#4a4a4a' : '#e0e0e0'} transparent;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme === 'dark' ? '#4a4a4a' : '#e0e0e0'};
    border-radius: 3px;
  }
`;

const HourlyCard = styled(motion.div)`
  background: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
  padding: 15px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HourlyTime = styled(motion.div)`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
  font-size: 0.9em;
  margin-bottom: 8px;
  font-weight: 500;
`;

const HourlyTemp = styled(motion.div)`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
  font-size: 1.4em;
  font-weight: bold;
  margin: 5px 0;
`;

const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px 0;
`;


const MapWrapper = styled.div`
  margin: 20px 0;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .leaflet-container {
    height: 100%;
    width: 100%;
  }
`;

// Harita güncelleme bileşeni
const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 10);
  }, [center, map]);
  return null;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const DetailPage: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { temperatureUnit, convertTemperature } = useTemperature();

  const { data: weatherData, isLoading: isWeatherLoading } = useQuery({
    queryKey: ['weather', city],
    queryFn: () => getCurrentWeather(city || ''),
    enabled: !!city,
  });

  const { data: forecastData, isLoading: isForecastLoading } = useQuery({
    queryKey: ['forecast', weatherData?.coord],
    queryFn: () => {
      if (weatherData?.coord) {
        return getForecast(weatherData.coord.lat, weatherData.coord.lon);
      }
      throw new Error('No coordinates available');
    },
    enabled: !!weatherData?.coord,
  });

  const formatTime = (dt: number) => {
    return new Date(dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isWeatherLoading || isForecastLoading) {
    return <LoadingSpinner />;
  }

  if (!weatherData) {
    return <div>{t('cityNotFound')}</div>;
  }

  return (
    <Container theme={theme}>
      <Header>
        <BackButton onClick={() => navigate('/')} theme={theme}>
          ← {t('back')}
        </BackButton>
        <CityName theme={theme}>{weatherData.name}</CityName>
        <TemperatureUnitSelector />
      </Header>

      <WeatherDetails
        variants={container}
        initial="hidden"
        animate="show"
      >
        <DetailCard theme={theme} variants={item}>
          <DetailTitle theme={theme}>{t('temperature')}</DetailTitle>
          <DetailValue theme={theme}>
            {convertTemperature(weatherData.main.temp)}°{temperatureUnit === 'celsius' ? 'C' : 'F'}
          </DetailValue>
        </DetailCard>

        <DetailCard theme={theme} variants={item}>
          <DetailTitle theme={theme}>{t('feelsLike')}</DetailTitle>
          <DetailValue theme={theme}>
            {convertTemperature(weatherData.main.feels_like)}°{temperatureUnit === 'celsius' ? 'C' : 'F'}
          </DetailValue>
        </DetailCard>

        <DetailCard theme={theme} variants={item}>
          <DetailTitle theme={theme}>{t('humidity')}</DetailTitle>
          <DetailValue theme={theme} aria-label={`${weatherData.main.humidity} percent`}>
            {weatherData.main.humidity}%
          </DetailValue>
        </DetailCard>

        <DetailCard theme={theme} variants={item}>
          <DetailTitle theme={theme}>{t('windSpeed')}</DetailTitle>
          <DetailValue theme={theme} aria-label={`${weatherData.wind.speed} meters per second`}>
            {weatherData.wind.speed} m/s
          </DetailValue>
        </DetailCard>

        <DetailCard theme={theme} variants={item}>
          <DetailTitle theme={theme}>{t('pressure')}</DetailTitle>
          <DetailValue theme={theme} aria-label={`${weatherData.main.pressure} hectopascals`}>
            {weatherData.main.pressure} hPa
          </DetailValue>
        </DetailCard>

        <DetailCard theme={theme} variants={item}>
          <DetailTitle theme={theme}>{t('visibility')}</DetailTitle>
          <DetailValue theme={theme} aria-label={`${weatherData.visibility / 1000} kilometers`}>
            {weatherData.visibility / 1000} km
          </DetailValue>
        </DetailCard>
      </WeatherDetails>

      {forecastData && (
        <HourlyForecast theme={theme}>
          <HourlyTitle theme={theme}>{t('hourlyForecast')}</HourlyTitle>
          <HourlyList
            variants={container}
            initial="hidden"
            animate="show"
          >
            {forecastData.list.slice(0, 8).map((forecast) => (
              <HourlyCard key={forecast.dt} theme={theme} variants={item}>
                <HourlyTime theme={theme}>{formatTime(forecast.dt)}</HourlyTime>
                <WeatherIcon 
                  src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                  alt={forecast.weather[0].description}
                  aria-hidden="true"
                />
                <HourlyTemp theme={theme}>
                  {convertTemperature(forecast.main.temp)}°{temperatureUnit === 'celsius' ? 'C' : 'F'}
                </HourlyTemp>
              </HourlyCard>
            ))}
          </HourlyList>
        </HourlyForecast>
      )}

      {weatherData.coord && (
        <MapWrapper>
          <MapContainer
            center={[weatherData.coord.lat, weatherData.coord.lon]}
            zoom={10}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
            attributionControl={true}
          >
            <MapUpdater center={[weatherData.coord.lat, weatherData.coord.lon]} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[weatherData.coord.lat, weatherData.coord.lon]}>
              <Popup>
                {weatherData.name}<br />
                {convertTemperature(weatherData.main.temp)}°{temperatureUnit === 'celsius' ? 'C' : 'F'}
              </Popup>
            </Marker>
          </MapContainer>
        </MapWrapper>
      )}
    </Container>
  );
}; 