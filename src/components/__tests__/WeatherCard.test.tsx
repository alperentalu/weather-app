import { render, screen } from '@testing-library/react';
import { WeatherCard } from '../WeatherCard';
import { useTemperature } from '../../contexts/TemperatureContext';
import { WeatherData } from '../../services/weatherService';

jest.mock('../../contexts/TemperatureContext');

const mockWeatherData = {
  name: 'Istanbul',
  main: {
    temp: 20,
    feels_like: 22,
    humidity: 65,
    pressure: 1015,
  },
  weather: [{
    main: 'Clear',
    description: 'clear sky',
    icon: '01d',
  }],
  wind: {
    speed: 5,
  },
  visibility: 10000,
  coord: {
    lat: 41.0082,
    lon: 28.9784,
  },
} as WeatherData;

describe('WeatherCard', () => {
  beforeEach(() => {
    (useTemperature as jest.Mock).mockReturnValue({
      temperatureUnit: 'celsius',
      convertTemperature: (temp: number) => Math.round(temp),
    });
  });

  it('renders weather information correctly', () => {
    render(<WeatherCard data={mockWeatherData} temperatureUnit="celsius" convertTemperature={(temp) => Math.round(temp)} />);
    
    expect(screen.getByText('Istanbul')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
    expect(screen.getByText('clear sky')).toBeInTheDocument();
  });

  it('converts temperature to fahrenheit when unit is fahrenheit', () => {
    (useTemperature as jest.Mock).mockReturnValue({
      temperatureUnit: 'fahrenheit',
      convertTemperature: (temp: number) => Math.round((temp * 9/5) + 32),
    });

    render(<WeatherCard data={mockWeatherData} temperatureUnit="fahrenheit" convertTemperature={(temp) => Math.round((temp * 9/5) + 32)} />);
    
    expect(screen.getByText('68°F')).toBeInTheDocument();
  });
}); 