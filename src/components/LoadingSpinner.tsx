import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '../contexts/ThemeContext';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${props => props.theme === 'dark' ? '#444444' : '#f3f3f3'};
  border-top: 4px solid ${props => props.theme === 'dark' ? '#ffffff' : '#3498db'};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const LoadingSpinner: React.FC = () => {
  const { theme } = useTheme();

  return (
    <SpinnerContainer>
      <Spinner theme={theme} />
    </SpinnerContainer>
  );
}; 