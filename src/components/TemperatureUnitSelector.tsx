import React from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { useTemperature } from '../contexts/TemperatureContext';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f5f5f5'};
  padding: 8px 12px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;

  @media (max-width: 480px) {
    padding: 6px 10px;
    gap: 5px;
  }
`;

const Label = styled.span`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  font-size: 0.9em;
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;

const Button = styled.button<{ active: boolean }>`
  padding: 6px 12px;
  background: ${props => props.active 
    ? (props.theme === 'dark' ? '#4a4a4a' : '#e0e0e0')
    : 'transparent'};
  border: none;
  border-radius: 15px;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: ${props => props.active ? '600' : '400'};
  white-space: nowrap;
  font-size: 0.9em;

  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 0.8em;
  }

  &:hover {
    background: ${props => props.theme === 'dark' ? '#5a5a5a' : '#e0e0e0'};
  }
`;

const Icon = styled.span`
  font-size: 1.2em;

  @media (max-width: 480px) {
    font-size: 1em;
  }
`;

export const TemperatureUnitSelector: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { temperatureUnit, setTemperatureUnit } = useTemperature();

  return (
    <Container theme={theme}>
      <Label theme={theme}>
        <Icon>🌡️</Icon>
        {t('temperatureUnit')}:
      </Label>
      <Button 
        theme={theme} 
        active={temperatureUnit === 'celsius'} 
        onClick={() => setTemperatureUnit('celsius')}
      >
        <Icon>°C</Icon>
        {t('celsius')}
      </Button>
      <Button 
        theme={theme} 
        active={temperatureUnit === 'fahrenheit'} 
        onClick={() => setTemperatureUnit('fahrenheit')}
      >
        <Icon>°F</Icon>
        {t('fahrenheit')}
      </Button>
    </Container>
  );
}; 