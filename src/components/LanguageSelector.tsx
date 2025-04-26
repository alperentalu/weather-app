import React from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme === 'dark' ? '#444444' : '#dddddd'};
  background: ${props => props.theme === 'dark' ? '#2d2d2d' : '#ffffff'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'dark' ? '#666666' : '#999999'};
  }
`;

const LanguageButton = styled.button`
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

export const LanguageSelector: React.FC = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const { theme } = useTheme();

  return (
    <Container>
      <Select
        value={language}
        onChange={(e) => changeLanguage(e.target.value as 'en' | 'tr' | 'az')}
        theme={theme}
      >
        <option value="en">English</option>
        <option value="tr">Türkçe</option>
        <option value="az">Azərbaycan</option>
      </Select>
    </Container>
  );
}; 