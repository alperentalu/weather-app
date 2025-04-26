import { useQuery } from '@tanstack/react-query';
import { getCurrentWeather, getForecast } from '../services/weatherService';

export const useWeather = (city: string) => {
  const { data: weatherData, error: weatherError, isLoading: isWeatherLoading } = useQuery({
    queryKey: ['weather', city],
    queryFn: () => getCurrentWeather(city),
    retry: false,
    retryDelay: 0,
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
    retry: false,
    retryDelay: 0,
  });

  return {
    weatherData,
    forecastData,
    weatherError,
    isWeatherLoading,
    isForecastLoading,
  };
}; 