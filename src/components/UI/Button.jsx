import React from 'react';
import styled from 'styled-components';

/**
 * Reusable Button component with multiple variants and sizes
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {boolean} [props.active=false] - Whether the button is in active state
 * @param {Function} [props.onClick] - Click handler function
 * @param {'toggle'|'primary'|'secondary'|'danger'|'success'} [props.variant='toggle'] - Button variant
 * @param {'small'|'medium'|'large'} [props.size='medium'] - Button size
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {string} [props.type='button'] - Button type attribute
 * @param {Object} props - Additional props spread to the button element
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
  variant = 'toggle',
  size = 'medium',
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

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['active', 'variant', 'size'].includes(prop)
})`
  /* Base Styles */
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
  ${({ variant, theme, active }) => getVariantStyles(variant, theme, active)}
  
  /* Size Styles */
  ${({ size, theme }) => getSizeStyles(size, theme)}
  
  /* Focus Styles */
  &:focus {
    box-shadow: 0 0 0 2px ${({ theme, variant, active }) => getFocusColor(variant, theme)};
  }
  
  /* Disabled Styles */
  ${({ disabled, theme }) => disabled && getDisabledStyles(theme)}
  
  /* Responsive Styles */
  ${({ size, theme }) => getResponsiveStyles(size, theme)}
`;

// ============================================================================
// STYLE FUNCTIONS
// ============================================================================

/**
 * Get variant-specific styles for the button
 */
const getVariantStyles = (variant, theme, active) => {
  const variants = {
    primary: `
      background: ${active ? theme.colors.pumpkin : theme.colors.primary};
      color: ${theme.colors.white};
      border: 1px solid ${active ? theme.colors.pumpkin : theme.colors.primary};
      
      &:hover:not(:disabled) {
        background: ${theme.colors.pumpkin};
        border-color: ${theme.colors.pumpkin};
      }
    `,
    
    secondary: `
      background: ${active ? theme.colors.pumpkin : theme.colors.primaryLight};
      color: ${active ? theme.colors.white : theme.colors.silverV1};
      border: 1px solid ${active ? theme.colors.pumpkin : theme.colors.jet};
      
      &:hover:not(:disabled) {
        background: ${theme.colors.pumpkin};
        border-color: ${theme.colors.pumpkin};
        color: ${theme.colors.white};
      }
    `,
    
    danger: `
      background: ${active ? theme.colors.scarlet : theme.colors.danger};
      color: ${theme.colors.white};
      border: 1px solid ${active ? theme.colors.scarlet : theme.colors.danger};
      
      &:hover:not(:disabled) {
        background: ${theme.colors.scarlet};
        border-color: ${theme.colors.scarlet};
      }
    `,
    
    success: `
      background: ${active ? theme.colors.success : theme.colors.primaryLight};
      color: ${active ? theme.colors.white : theme.colors.silverV1};
      border: 1px solid ${active ? theme.colors.success : theme.colors.jet};
      
      &:hover:not(:disabled) {
        background: ${theme.colors.success};
        border-color: ${theme.colors.success};
        color: ${theme.colors.white};
      }
    `,
    
    toggle: `
      background: ${active ? theme.colors.pumpkin : theme.colors.primaryLight};
      color: ${active ? theme.colors.white : theme.colors.silverV1};
      border: 1px solid ${active ? theme.colors.pumpkin : theme.colors.jet};
      
      &:hover:not(:disabled) {
        background: ${active ? theme.colors.scarlet : theme.colors.pumpkin};
        border-color: ${active ? theme.colors.scarlet : theme.colors.pumpkin};
        color: ${theme.colors.white};
      }
    `
  };
  
  return variants[variant] || variants.toggle;
};

/**
 * Get size-specific styles for the button
 */
const getSizeStyles = (size, theme) => {
  const sizes = {
    small: `
      padding: ${theme.spacing.xs} ${theme.spacing.sm};
      font-size: ${theme.typography.fontSize.xs};
      min-width: 60px;
      height: 32px;
    `,
    
    medium: `
      padding: ${theme.spacing.sm} ${theme.spacing.md};
      font-size: ${theme.typography.fontSize.sm};
      min-width: 80px;
      height: 40px;
    `,
    
    large: `
      padding: ${theme.spacing.md} ${theme.spacing.lg};
      font-size: ${theme.typography.fontSize.md};
      min-width: 100px;
      height: 48px;
    `
  };
  
  return sizes[size] || sizes.medium;
};

/**
 * Get focus color based on variant
 */
const getFocusColor = (variant, theme) => {
  const focusColors = {
    danger: theme.colors.danger + '40',
    success: theme.colors.success + '40',
    default: theme.colors.pumpkin + '40'
  };
  
  return focusColors[variant] || focusColors.default;
};

/**
 * Get disabled state styles
 */
const getDisabledStyles = (theme) => `
  opacity: 0.6;
  cursor: not-allowed;
  
  &:hover {
    background: inherit;
    border-color: inherit;
    color: inherit;
  }
`;

/**
 * Get responsive styles for different screen sizes
 */
const getResponsiveStyles = (size, theme) => {
  if (size !== 'medium') return '';
  
  return `
    @media screen and (max-width: ${theme.breakpoints.lg}) {
      padding: ${theme.spacing.sm} ${theme.spacing.md};
      font-size: ${theme.typography.fontSize.sm};
      min-width: 70px;
    }
    
    @media screen and (max-width: ${theme.breakpoints.md}) {
      padding: ${theme.spacing.sm} ${theme.spacing.md};
      font-size: ${theme.typography.fontSize.sm};
      min-width: 80px;
    }
    
    @media screen and (max-width: ${theme.breakpoints.sm}) {
      padding: ${theme.spacing.xs} ${theme.spacing.sm};
      font-size: ${theme.typography.fontSize.xs};
      min-width: 70px;
      height: 36px;
    }
    
    @media screen and (max-width: ${theme.breakpoints.xs}) {
      padding: ${theme.spacing.xs} ${theme.spacing.sm};
      font-size: ${theme.typography.fontSize.xs};
      min-width: 60px;
      height: 32px;
      white-space: normal;
      text-align: center;
      line-height: 1.2;
    }
  `;
};

export default Button;
