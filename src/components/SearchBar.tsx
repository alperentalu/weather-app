import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onHomeClick: () => void;
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  padding: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid ${props => props.theme === 'dark' ? '#444444' : '#dddddd'};
  border-radius: 5px;
  background: ${props => props.theme === 'dark' ? '#2d2d2d' : '#ffffff'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  font-size: 1em;

  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'dark' ? '#666666' : '#999999'};
  }
`;

const SearchButton = styled.button`
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

const HomeButton = styled.button`
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

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onHomeClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleHomeClick = () => {
    setSearchTerm('');
    onHomeClick();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', width: '100%' }}>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t('search')}
          theme={theme}
        />
        <SearchButton type="submit" theme={theme}>
          {t('search')}
        </SearchButton>
        <HomeButton type="button" onClick={handleHomeClick} theme={theme}>
          🏠
        </HomeButton>
      </form>
    </Container>
  );
}; 