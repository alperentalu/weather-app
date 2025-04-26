import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomePage } from './pages/HomePage';
import { DetailPage } from './pages/DetailPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { TemperatureProvider } from './contexts/TemperatureContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TemperatureProvider>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/detail/:city" element={<DetailPage />} />
              </Routes>
            </Router>
          </TemperatureProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
