import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { WeatherCard } from '../components/WeatherCard';
import { ForecastList } from '../components/ForecastList';
import { SearchBar } from '../components/SearchBar';
import { LanguageSelector } from '../components/LanguageSelector';
import { TemperatureUnitSelector } from '../components/TemperatureUnitSelector';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { getCurrentWeather, getForecast, CityNotFoundError } from '../services/weatherService';
import { useTheme } from '../contexts/ThemeContext';
import { useTemperature } from '../contexts/TemperatureContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  width: 100%;
  background: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f5f5f5'};
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
  padding: 15px;
  background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#ffffff'};
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5em;
  font-weight: bold;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
`;

const LogoIcon = styled.span`
  font-size: 1.8em;
`;

const Title = styled.h1`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  margin: 0;
  font-size: 1.2em;
  font-weight: 500;
`;

const ThemeToggle = styled.button`
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

const ErrorMessage = styled.div`
  color: #ff4444;
  padding: 10px;
  margin: 10px 0;
  background: ${props => props.theme === 'dark' ? '#3d3d3d' : '#ffffff'};
  border-radius: 5px;
  text-align: center;
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

export const HomePage: React.FC = () => {
  const [city, setCity] = useState('Istanbul');
  const [error, setError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([41.0082, 28.9784]);
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { temperatureUnit, convertTemperature } = useTemperature();

  const { data: weatherData, error: weatherError, isLoading: isWeatherLoading } = useQuery({
    queryKey: ['weather', city],
    queryFn: () => getCurrentWeather(city),
    retry: false,
    retryDelay: 0,
  });

  useEffect(() => {
    if (weatherError instanceof CityNotFoundError) {
      setError(t('cityNotFound'));
    } else if (weatherError) {
      setError(weatherError.message);
    } else {
      setError(null);
    }
  }, [weatherError, t]);

  const { data: forecastData, isLoading: isForecastLoading } = useQuery({
    queryKey: ['forecast', weatherData?.coord],
    queryFn: () => {
      if (weatherData?.coord) {
        return getForecast(weatherData.coord.lat, weatherData.coord.lon);
      }
      throw new Error('No coordinates available');
    },
    enabled: !!weatherData?.coord,
    retry: false,
    retryDelay: 0,
  });

  const getLocationWeather = async () => {
    if ('geolocation' in navigator) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        const { latitude, longitude } = position.coords;
        setMapCenter([latitude, longitude]);
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`
        );
        const data = await response.json();
        setCity(data.name);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    }
  };

  useEffect(() => {
    getLocationWeather();
  }, []);

  return (
    <Container theme={theme}>
      <Header theme={theme}>
        <HeaderLeft>
          <Logo theme={theme}>
            <LogoIcon>🌤️</LogoIcon>
            Weather App
          </Logo>
          <Title theme={theme}>{t('currentWeather')}</Title>
          <LanguageSelector />
        </HeaderLeft>
        <HeaderRight>
          <TemperatureUnitSelector />
          <ThemeToggle theme={theme} onClick={toggleTheme}>
            {theme === 'dark' ? '🌞' : '🌙'}
          </ThemeToggle>
        </HeaderRight>
      </Header>

      <SearchBar onSearch={setCity} onHomeClick={getLocationWeather} />

      {error && (
        <ErrorMessage theme={theme}>
          {error}
        </ErrorMessage>
      )}

      {isWeatherLoading ? (
        <LoadingSpinner />
      ) : (
        weatherData && (
          <>
            <WeatherCard 
              data={weatherData} 
              temperatureUnit={temperatureUnit}
              convertTemperature={convertTemperature}
            />
            {weatherData.coord && (
              <MapWrapper>
                <MapContainer
                  center={mapCenter}
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
          </>
        )
      )}

      {isForecastLoading ? (
        <LoadingSpinner />
      ) : (
        forecastData && (
          <ForecastList 
            data={forecastData} 
            temperatureUnit={temperatureUnit}
            convertTemperature={convertTemperature}
          />
        )
      )}
    </Container>
  );
}; 