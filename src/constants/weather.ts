export const DEFAULT_CITY = 'Istanbul';
export const DEFAULT_COORDINATES = [41.0082, 28.9784] as [number, number];

export const WEATHER_ICON_BASE_URL = 'http://openweathermap.org/img/wn';
export const WEATHER_ICON_SIZE = '@2x';

export const MAP_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export const TEMPERATURE_UNITS = {
  CELSIUS: 'celsius',
  FAHRENHEIT: 'fahrenheit',
} as const;

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const; 