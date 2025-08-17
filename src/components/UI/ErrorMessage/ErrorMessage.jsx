import React from 'react';
import styled from 'styled-components';

const ErrorMessage = ({
  message = "An error occurred",
  title: customTitle = "Error",
  variant = "error", // 'error', 'warning', 'info', 'success'
  size = "medium", // 'small', 'medium', 'large'
  showIcon = true,
  showTitle = true,
  onRetry,
  retryText = "Try Again",
  ...props
}) => {
  const getIcon = () => {
    if (!showIcon) return null;
    
    switch (variant) {
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'success':
        return '✅';
      default: // error
        return '❌';
    }
  };

  const getTitle = () => {
    if (!showTitle) return null;
    
    // Use custom title if provided, otherwise use variant-based title
    if (customTitle !== "Error") {
      return customTitle;
    }
    
    switch (variant) {
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Information';
      case 'success':
        return 'Success';
      default: // error
        return 'Error';
    }
  };

  return (
    <ErrorContainer
      variant={variant}
      size={size}
      {...props}
    >
      {showIcon && <ErrorIcon variant={variant}>{getIcon()}</ErrorIcon>}
      
      <ErrorContent>
        {showTitle && <ErrorTitle variant={variant}>{getTitle()}</ErrorTitle>}
        <ErrorMessageText variant={variant}>{message}</ErrorMessageText>
        
        {onRetry && (
          <RetryButton
            variant={variant}
            size={size}
            onClick={onRetry}
          >
            {retryText}
          </RetryButton>
        )}
      </ErrorContent>
    </ErrorContainer>
  );
};

// Styled Components
const ErrorContainer = styled.div`
  display: flex;
  align-items: flex-start;
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
      case 'large': return theme.spacing.xl;
      default: return theme.spacing.lg;
    }
  }};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid;
  background: ${({ theme, variant }) => {
    switch (variant) {
      case 'warning':
        return `${theme.colors.warning}15`;
      case 'info':
        return `${theme.colors.info}15`;
      case 'success':
        return `${theme.colors.success}15`;
      default: // error
        return `${theme.colors.danger}15`;
    }
  }};
  border-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'warning':
        return `${theme.colors.warning}30`;
      case 'info':
        return `${theme.colors.info}30`;
      case 'success':
        return `${theme.colors.success}30`;
      default: // error
        return `${theme.colors.danger}30`;
    }
  }};
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const ErrorIcon = styled.span`
  font-size: ${({ theme, size }) => {
    switch (size) {
      case 'small': return theme.typography.fontSize.lg;
      case 'large': return theme.typography.fontSize['2xl'];
      default: return theme.typography.fontSize.xl;
    }
  }};
  flex-shrink: 0;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme, size }) => {
      switch (size) {
        case 'small': return theme.typography.fontSize.base;
        case 'large': return theme.typography.fontSize.xl;
        default: return theme.typography.fontSize.lg;
      }
    }};
  }
`;

const ErrorContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ErrorTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme, size }) => {
    switch (size) {
      case 'small': return theme.typography.fontSize.sm;
      case 'large': return theme.typography.fontSize.lg;
      default: return theme.typography.fontSize.base;
    }
  }};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'warning':
        return theme.colors.warning;
      case 'info':
        return theme.colors.info;
      case 'success':
        return theme.colors.success;
      default: // error
        return theme.colors.danger;
    }
  }};
  
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

const ErrorMessageText = styled.p`
  margin: 0;
  font-size: ${({ theme, size }) => {
    switch (size) {
      case 'small': return theme.typography.fontSize.xs;
      case 'large': return theme.typography.fontSize.base;
      default: return theme.typography.fontSize.sm;
    }
  }};
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.5;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme, size }) => {
      switch (size) {
        case 'small': return theme.typography.fontSize.xs;
        case 'large': return theme.typography.fontSize.sm;
        default: return theme.typography.fontSize.xs;
      }
    }};
  }
`;

const RetryButton = styled.button`
  align-self: flex-start;
  background: ${({ theme, variant }) => {
    switch (variant) {
      case 'warning':
        return theme.colors.warning;
      case 'info':
        return theme.colors.info;
      case 'success':
        return theme.colors.success;
      default: // error
        return theme.colors.danger;
    }
  }};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme, size }) => {
    switch (size) {
      case 'small': return `${theme.spacing.xs} ${theme.spacing.sm}`;
      case 'large': return `${theme.spacing.md} ${theme.spacing.lg}`;
      default: return `${theme.spacing.sm} ${theme.spacing.md}`;
    }
  }};
  font-size: ${({ theme, size }) => {
    switch (size) {
      case 'small': return theme.typography.fontSize.xs;
      case 'large': return theme.typography.fontSize.base;
      default: return theme.typography.fontSize.sm;
    }
  }};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
    background: ${({ theme, variant }) => {
      switch (variant) {
        case 'warning':
          return theme.colors.warning;
        case 'info':
          return theme.colors.info;
        case 'success':
          return theme.colors.success;
        default: // error
          return theme.colors.danger;
      }
    }};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme, variant }) => {
      switch (variant) {
        case 'warning':
          return theme.colors.warning + '40';
        case 'info':
          return theme.colors.info + '40';
        case 'success':
          return theme.colors.success + '40';
        default: // error
          return theme.colors.danger + '40';
      }
    }};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    align-self: center;
    font-size: ${({ theme, size }) => {
      switch (size) {
        case 'small': return theme.typography.fontSize.xs;
        case 'large': return theme.typography.fontSize.sm;
        default: return theme.typography.fontSize.xs;
      }
    }};
  }
`;

export default ErrorMessage;
