# Theme System for Styled Components

This theme system provides a comprehensive design token library for the Chemical Safety Dashboard application, extracted from the existing CSS files and organized for use with styled-components.

## 🎨 Features

- **Complete Color Palette**: All colors from the existing CSS files
- **Typography System**: Font families, sizes, weights, and line heights
- **Spacing Scale**: Consistent spacing values throughout the app
- **Responsive Breakpoints**: Media query helpers for responsive design
- **Component-Specific Tokens**: Specialized values for cards, progress bars, etc.
- **Theme Switching**: Support for light/dark themes
- **Global Styles**: CSS reset and base styles

## 📁 File Structure

```
src/theme/
├── index.js          # Main exports
├── theme.js          # Theme configuration
├── ThemeProvider.jsx # React context provider
├── GlobalStyles.js   # Global styled-components styles
└── README.md         # This file
```

## 🚀 Quick Start

### 1. Wrap Your App

```jsx
import { ThemeProvider, GlobalStyles } from './theme';

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

### 2. Use Theme in Styled Components

```jsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.pumpkin};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.scarlet};
  }
`;
```

### 3. Use Theme Hook

```jsx
import { useTheme } from './theme';

function MyComponent() {
  const { theme, toggleTheme, isDark } = useTheme();
  
  return (
    <div>
      <p>Current theme: {isDark ? 'Dark' : 'Light'}</p>
      <button onClick={toggleTheme}>
        Switch to {isDark ? 'Light' : 'Dark'} Theme
      </button>
    </div>
  );
}
```

## 🎯 Available Theme Properties

### Colors
```jsx
theme.colors.primary        // #29221d
theme.colors.pumpkin        // #fe6c00
theme.colors.scarlet        // #fe1e00
theme.colors.white          // #fff
theme.colors.silver         // #a8a5a6
// ... and more
```

### Typography
```jsx
theme.typography.fontSize.xs      // 12px
theme.typography.fontSize.sm      // 14px
theme.typography.fontSize.base    // 16px
theme.typography.fontSize.lg      // 18px
theme.typography.fontSize.xl      // 20px
theme.typography.fontSize['2xl'] // 24px
theme.typography.fontSize['3xl'] // 32px

theme.typography.fontWeight.light     // 200
theme.typography.fontWeight.normal    // 300
theme.typography.fontWeight.medium    // 400
theme.typography.fontWeight.semibold  // 500
theme.typography.fontWeight.bold      // 600
theme.typography.fontWeight.extrabold // 700
```

### Spacing
```jsx
theme.spacing.xs      // 4px
theme.spacing.sm      // 6px
theme.spacing.md      // 8px
theme.spacing.lg      // 10px
theme.spacing.xl      // 12px
theme.spacing['2xl'] // 16px
theme.spacing['3xl'] // 20px
theme.spacing['4xl'] // 24px
// ... and more
```

### Border Radius
```jsx
theme.borderRadius.none  // 0
theme.borderRadius.sm    // 4px
theme.borderRadius.md    // 8px
theme.borderRadius.lg    // 10px
theme.borderRadius.xl    // 12px
theme.borderRadius['2xl'] // 16px
theme.borderRadius.full  // 100%
```

### Shadows
```jsx
theme.shadows.sm  // rgba(0, 0, 0, 0.05) 0px 8px 24px
theme.shadows.md  // rgba(0, 0, 0, 0.1) 0px 20px 25px -5px
theme.shadows.lg  // rgba(0, 0, 0, 0.35) 0px 5px 15px
```

### Transitions
```jsx
theme.transitions.default // all 300ms ease-in-out
theme.transitions.fast    // all 150ms ease-in-out
theme.transitions.slow    // all 500ms ease-in-out
```

### Breakpoints
```jsx
theme.breakpoints.xs  // 420px
theme.breakpoints.sm  // 768px
theme.breakpoints.md  // 992px
theme.breakpoints.lg  // 1200px
theme.breakpoints.xl  // 1400px
```

## 📱 Media Query Helpers

```jsx
import { media } from './theme';

const ResponsiveComponent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  
  ${media.md} {
    padding: ${({ theme }) => theme.spacing.md};
  }
  
  ${media.sm} {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;
```

## 🔧 Helper Functions

### Color Helper
```jsx
import { getColor } from './theme';

const color = getColor('cardText.primary'); // #c7c4c6
```

### Spacing Helper
```jsx
import { getSpacing } from './theme';

const padding = getSpacing('2xl'); // 16px
```

### Typography Helper
```jsx
import { getTypography } from './theme';

const textStyle = getTypography('lg-medium'); // { fontSize: '18px', fontWeight: 400 }
```

## 🌓 Theme Switching

The theme system supports dynamic theme switching:

```jsx
const { toggleTheme, updateTheme, resetTheme } = useTheme();

// Switch between light/dark
toggleTheme();

// Custom theme update
updateTheme({
  colors: {
    primary: '#custom-color'
  }
});

// Reset to default
resetTheme();
```

## 📋 Migration from CSS

### Before (CSS Variables)
```css
.my-component {
  background-color: var(--clr-primary);
  padding: var(--spacing-24);
  border-radius: var(--border-radius-12);
}
```

### After (Styled Components)
```jsx
const MyComponent = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing['4xl']};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;
```

## 🎨 Customization

You can extend the theme by adding new properties:

```jsx
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    custom: '#ff0000'
  }
};
```

## 📚 Best Practices

1. **Always use theme values** instead of hardcoded values
2. **Use semantic naming** for custom colors (e.g., `success`, `warning`, `error`)
3. **Leverage the spacing scale** for consistent layouts
4. **Use media query helpers** for responsive design
5. **Keep component styles** focused on layout and behavior, not colors

## 🔍 Troubleshooting

### Theme not available
Make sure your component is wrapped in `ThemeProvider` and you're using the `theme` prop in styled-components.

### Colors not updating
Check that you're using the theme object correctly: `${({ theme }) => theme.colors.primary}`

### Media queries not working
Ensure you're importing and using the `media` helpers correctly.

## 📖 Additional Resources

- [Styled Components Documentation](https://styled-components.com/)
- [Design Tokens Guide](https://www.designtokens.org/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
