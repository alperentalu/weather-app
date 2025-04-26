# Weather App 🌤️

A modern, responsive weather application built with React, TypeScript, and Vite. Get real-time weather information and forecasts for any location around the world.

## Features ✨

- 🌍 Real-time weather data for any location
- 📱 Responsive design for all devices
- 🌙 Dark/Light theme support
- 🌡️ Temperature unit conversion (Celsius/Fahrenheit)
- 🌐 Multi-language support (English, Turkish, Azerbaijani)
- 📊 7-day weather forecast
- 🗺️ Interactive map with location markers
- ⚡ Fast and efficient with React Query
- 🎨 Beautiful UI with Framer Motion animations
- 🧪 Comprehensive test coverage

## Tech Stack 🛠️

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Query](https://tanstack.com/query/latest)
- [Emotion](https://emotion.sh/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)
- [Leaflet](https://leafletjs.com/)
- [i18next](https://www.i18next.com/)
- [Jest](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)

## Getting Started 🚀

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts 📜

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## Project Structure 📁

```
src/
├── components/   # Reusable UI components
├── containers/   # Smart components with logic
├── hooks/        # Custom React hooks
├── services/     # API services and utilities
├── contexts/     # Global state providers
├── styles/       # Global and component styles
├── constants/    # Application constants
├── i18n/         # Language files
├── pages/        # Page components
└── App.tsx       # Root component
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing 🧪

The project uses Jest and React Testing Library for testing. Run tests with:

```bash
npm test
```

For test coverage:

```bash
npm run test:coverage
```

## Deployment 🚀

The application is automatically deployed to Vercel when changes are pushed to the main branch.

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Maps powered by [OpenStreetMap](https://www.openstreetmap.org/)
- Icons from [Emoji](https://emojipedia.org/)
