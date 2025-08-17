import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  text = 'Loading...',
  showText = true 
}) => {
  return (
    <SpinnerContainer size={size}>
      <Spinner size={size} color={color} />
      {showText && <LoadingText size={size}>{text}</LoadingText>}
    </SpinnerContainer>
  );
};

// Styled Components
const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme, size }) => {
    switch (size) {
      case 'small': return theme.spacing.sm;
      case 'large': return theme.spacing.lg;
      default: return theme.spacing.md;
    }
  }};
  padding: ${({ theme, size }) => {
    switch (size) {
      case 'small': return theme.spacing.md;
      case 'large': return theme.spacing['2xl'];
      default: return theme.spacing.lg;
    }
  }};
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: ${({ size }) => {
    switch (size) {
      case 'small': return '24px';
      case 'large': return '48px';
      default: return '32px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'small': return '24px';
      case 'large': return '48px';
      default: return '32px';
    }
  }};
  border: 3px solid ${({ theme, color }) => {
    switch (color) {
      case 'primary': return theme.colors.primaryLight;
      case 'white': return 'rgba(255, 255, 255, 0.3)';
      case 'silver': return theme.colors.silverV1;
      default: return theme.colors.primaryLight;
    }
  }};
  border-top: 3px solid ${({ theme, color }) => {
    switch (color) {
      case 'primary': return theme.colors.pumpkin;
      case 'white': return theme.colors.white;
      case 'silver': return theme.colors.white;
      default: return theme.colors.pumpkin;
    }
  }};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-width: 2px;
  }
`;

const LoadingText = styled.div`
  color: ${({ theme, size }) => {
    switch (size) {
      case 'small': return theme.colors.silverV1;
      case 'large': return theme.colors.white;
      default: return theme.colors.silverV1;
    }
  }};
  font-size: ${({ theme, size }) => {
    switch (size) {
      case 'small': return theme.typography.fontSize.sm;
      case 'large': return theme.typography.fontSize.lg;
      default: return theme.typography.fontSize.base;
    }
  }};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme, size }) => {
      switch (size) {
        case 'small': return theme.typography.fontSize.xs;
        case 'large': return theme.typography.fontSize.base;
        default: return theme.typography.fontSize.sm;
      }
    }};
  }
`;

export default LoadingSpinner;
