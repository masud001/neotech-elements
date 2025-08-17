import React from 'react';
import styled from 'styled-components';

const SearchInput = ({
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
  width = "250px",
  size = "medium",
  variant = "default", // 'default', 'compact', 'large'
  disabled = false,
  ...props
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <StyledSearchInput
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={handleKeyPress}
      width={width}
      size={size}
      variant={variant}
      disabled={disabled}
      {...props}
    />
  );
};

// Styled Components
const StyledSearchInput = styled.input.withConfig({
  shouldForwardProp: (prop) => !['width', 'size', 'variant'].includes(prop)
})`
  background: ${({ theme }) => theme.colors.primaryLight};
  border: 1px solid ${({ theme }) => theme.colors.jet};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  width: ${({ width }) => width};
  transition: ${({ theme }) => theme.transitions.default};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.silver};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.pumpkin};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.pumpkin}20;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.jet};
  }

  /* Size Variants */
  ${({ size, theme }) => {
    switch (size) {
      case 'small':
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.sm};
          min-height: 32px;
        `;
      case 'large':
        return `
          padding: ${theme.spacing.lg} ${theme.spacing.xl};
          font-size: ${theme.typography.fontSize.lg};
          min-height: 48px;
        `;
      default: // medium
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.typography.fontSize.base};
          min-height: 40px;
        `;
    }
  }}

  /* Variant Styles */
  ${({ variant, theme }) => {
    switch (variant) {
      case 'compact':
        return `
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          font-size: ${theme.typography.fontSize.sm};
          min-height: 28px;
        `;
      case 'large':
        return `
          padding: ${theme.spacing.lg} ${theme.spacing.xl};
          font-size: ${theme.typography.fontSize.lg};
          min-height: 48px;
        `;
      default:
        return '';
    }
  }}

  /* Responsive Design */
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${({ size, theme }) => size === 'medium' && `
      padding: ${theme.spacing.md} ${theme.spacing.lg};
      font-size: ${theme.typography.fontSize.sm};
      min-height: 36px;
    `}
    
    ${({ size, theme }) => size === 'large' && `
      padding: ${theme.spacing.md} ${theme.spacing.lg};
      font-size: ${theme.typography.fontSize.base};
      min-height: 40px;
    `}
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    
    ${({ size, theme }) => size === 'medium' && `
      padding: ${theme.spacing.sm} ${theme.spacing.md};
      min-height: 36px;
    `}
    
    ${({ size, theme }) => size === 'large' && `
      padding: ${theme.spacing.md} ${theme.spacing.lg};
      min-height: 40px;
    `}
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    
    ${({ size, theme }) => size === 'medium' && `
      min-height: 32px;
    `}
    
    ${({ size, theme }) => size === 'large' && `
      min-height: 36px;
    `}
  }
`;

export default SearchInput;
