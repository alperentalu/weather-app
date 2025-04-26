import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

type Language = 'en' | 'tr' | 'az';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        currentWeather: 'Current Weather',
        forecast: '7-Day Forecast',
        search: 'Search',
        temperature: 'Temperature',
        humidity: 'Humidity',
        windSpeed: 'Wind Speed',
        feelsLike: 'Feels Like',
        pressure: 'Pressure',
        error: 'Error',
        loading: 'Loading...',
        language: 'Language',
        theme: 'Theme',
        dark: 'Dark',
        light: 'Light',
        cityNotFound: 'City not found. Please try another city.',
        hourlyForecast: 'Hourly Forecast',
        back: 'Back',
        visibility: 'Visibility',
        tryAgain: 'Try Again',
        home: 'Home',
        settings: 'Settings',
        temperatureUnit: 'Temperature Unit',
        celsius: 'Celsius',
        fahrenheit: 'Fahrenheit',
      },
    },
    tr: {
      translation: {
        currentWeather: 'Mevcut Hava Durumu',
        forecast: '7 Günlük Tahmin',
        search: 'Ara',
        temperature: 'Sıcaklık',
        humidity: 'Nem',
        windSpeed: 'Rüzgar Hızı',
        feelsLike: 'Hissedilen',
        pressure: 'Basınç',
        error: 'Hata',
        loading: 'Yükleniyor...',
        language: 'Dil',
        theme: 'Tema',
        dark: 'Karanlık',
        light: 'Aydınlık',
        cityNotFound: 'Şehir bulunamadı. Lütfen başka bir şehir deneyin.',
        hourlyForecast: 'Saatlik Tahmin',
        back: 'Geri',
        visibility: 'Görüş Mesafesi',
        tryAgain: 'Tekrar Dene',
        home: 'Ana Sayfa',
        settings: 'Ayarlar',
        temperatureUnit: 'Sıcaklık Birimi',
        celsius: 'Celsius',
        fahrenheit: 'Fahrenheit',
      },
    },
    az: {
      translation: {
        currentWeather: 'Cari Hava',
        forecast: '7 Günlük Proqnoz',
        search: 'Axtar',
        temperature: 'Temperatur',
        humidity: 'Rütubət',
        windSpeed: 'Külək Sürəti',
        feelsLike: 'Hiss Olunan',
        pressure: 'Təzyiq',
        error: 'Xəta',
        loading: 'Yüklənir...',
        language: 'Dil',
        theme: 'Tema',
        dark: 'Qaranlıq',
        light: 'İşıqlı',
        cityNotFound: 'Şəhər tapılmadı. Zəhmət olmasa başqa bir şəhər sınayın.',
        hourlyForecast: 'Saatlıq Proqnoz',
        back: 'Geri',
        visibility: 'Görünüş Məsafəsi',
        tryAgain: 'Yenidən Cəhd Edin',
        home: 'Ana Səhifə',
        settings: 'Parametrlər',
        temperatureUnit: 'Temperatur Vahidi',
        celsius: 'Selsi',
        fahrenheit: 'Farenheit',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    i18n.changeLanguage(language);
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 