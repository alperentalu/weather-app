import React from 'react';
import styled from '@emotion/styled';
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

export const LanguageSelector: React.FC = () => {
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