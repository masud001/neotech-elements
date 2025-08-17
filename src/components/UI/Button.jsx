import React from 'react';
import styled from 'styled-components';

/**
 * Reusable Button component with multiple variants and sizes
 * 
 * @example
 * // Chart toggle buttons
 * <Button active={isActive} onClick={handleClick} variant="toggle">
 *   Chart Type
 * </Button>
 * 
 * // Generate Report button
 * <Button onClick={generateReport} variant="primary" size="large">
 *   Generate Report
 * </Button>
 * 
 * // Danger action button
 * <Button onClick={deleteItem} variant="danger" size="medium">
 *   Delete
 * </Button>
 * 
 * // Success action button
 * <Button onClick={saveItem} variant="success" size="small">
 *   Save
 * </Button>
 */
const Button = ({ 
  children, 
  active = false, 
  onClick, 
  variant = 'toggle', // 'toggle', 'primary', 'secondary', 'danger', 'success'
  size = 'medium', // 'small', 'medium', 'large'
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <StyledButton
      active={active}
      variant={variant}
      size={size}
      disabled={disabled}
      type={type}
      onClick={handleClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

// Styled Components
const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: ${({ theme }) => theme.transitions.default};
  white-space: nowrap;
  text-decoration: none;
  outline: none;
  
  /* Variant Styles */
  ${({ variant, theme, active }) => {
    switch (variant) {
      case 'primary':
        return `
          background: ${active ? theme.colors.pumpkin : theme.colors.primary};
          color: ${theme.colors.white};
          border: 1px solid ${active ? theme.colors.pumpkin : theme.colors.primary};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.pumpkin};
            border-color: ${theme.colors.pumpkin};
          }
        `;
      
      case 'secondary':
        return `
          background: ${active ? theme.colors.pumpkin : theme.colors.primaryLight};
          color: ${active ? theme.colors.white : theme.colors.silver};
          border: 1px solid ${active ? theme.colors.pumpkin : theme.colors.jet};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.pumpkin};
            border-color: ${theme.colors.pumpkin};
            color: ${theme.colors.white};
          }
        `;
      
      case 'danger':
        return `
          background: ${active ? theme.colors.scarlet : theme.colors.danger};
          color: ${theme.colors.white};
          border: 1px solid ${active ? theme.colors.scarlet : theme.colors.danger};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.scarlet};
            border-color: ${theme.colors.scarlet};
          }
        `;
      
      case 'success':
        return `
          background: ${active ? theme.colors.success : theme.colors.primaryLight};
          color: ${active ? theme.colors.white : theme.colors.silver};
          border: 1px solid ${active ? theme.colors.success : theme.colors.jet};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.success};
            border-color: ${theme.colors.success};
            color: ${theme.colors.white};
          }
        `;
      
      default: // toggle
        return `
          background: ${active ? theme.colors.pumpkin : theme.colors.primaryLight};
          color: ${active ? theme.colors.white : theme.colors.silver};
          border: 1px solid ${active ? theme.colors.pumpkin : theme.colors.jet};
          
          &:hover:not(:disabled) {
            background: ${active ? theme.colors.scarlet : theme.colors.pumpkin};
            border-color: ${active ? theme.colors.scarlet : theme.colors.pumpkin};
            color: ${theme.colors.white};
          }
        `;
    }
  }}
  
  /* Size Styles */
  ${({ size, theme }) => {
    switch (size) {
      case 'small':
        return `
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          font-size: ${theme.typography.fontSize.xs};
          min-width: 60px;
          height: 32px;
        `;
      
      case 'large':
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.typography.fontSize.md};
          min-width: 100px;
          height: 48px;
        `;
      
      default: // medium
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.sm};
          min-width: 80px;
          height: 40px;
        `;
    }
  }}
  
  /* Focus Styles */
  &:focus {
    box-shadow: 0 0 0 2px ${({ theme, variant, active }) => {
      if (variant === 'danger') return theme.colors.danger + '40';
      if (variant === 'success') return theme.colors.success + '40';
      return theme.colors.pumpkin + '40';
    }};
  }
  
  /* Disabled Styles */
  ${({ disabled, theme }) => disabled && `
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      background: inherit;
      border-color: inherit;
      color: inherit;
    }
  `}
  
  /* Responsive Styles */
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    ${({ size, theme }) => size === 'medium' && `
      padding: ${theme.spacing.sm} ${theme.spacing.md};
      font-size: ${theme.typography.fontSize.sm};
      min-width: 70px;
    `}
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${({ size, theme }) => size === 'medium' && `
      padding: ${theme.spacing.sm} ${theme.spacing.md};
      font-size: ${theme.typography.fontSize.sm};
      min-width: 80px;
    `}
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${({ size, theme }) => size === 'medium' && `
      padding: ${theme.spacing.xs} ${theme.spacing.sm};
      font-size: ${theme.typography.fontSize.xs};
      min-width: 70px;
      height: 36px;
    `}
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    ${({ size, theme }) => size === 'medium' && `
      padding: ${theme.spacing.xs} ${theme.spacing.sm};
      font-size: ${theme.typography.fontSize.xs};
      min-width: 60px;
      height: 32px;
      white-space: normal;
      text-align: center;
      line-height: 1.2;
    `}
  }
`;

export default Button;
