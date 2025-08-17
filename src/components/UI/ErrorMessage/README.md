# ErrorMessage Component

A versatile, theme-aware error message component that can display various types of messages (error, warning, info, success) with customizable styling and optional retry functionality.

## Features

- 🎨 **Theme Integration**: Automatically uses your application's theme colors and spacing
- 📱 **Responsive Design**: Adapts to different screen sizes with appropriate styling
- 🔧 **Multiple Variants**: Support for error, warning, info, and success message types
- ♿ **Accessible**: Proper focus states, keyboard navigation, and semantic HTML
- 🚀 **Interactive**: Optional retry button with customizable text
- 🎯 **Flexible**: Configurable icons, titles, and sizes

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | `"An error occurred"` | The main error message text |
| `title` | `string` | `"Error"` | Custom title (overrides variant-based title) |
| `variant` | `'error' \| 'warning' \| 'info' \| 'success'` | `'error'` | Message type and styling |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Component size variant |
| `showIcon` | `boolean` | `true` | Whether to display the variant icon |
| `showTitle` | `boolean` | `true` | Whether to display the title |
| `onRetry` | `function` | - | Optional retry callback function |
| `retryText` | `string` | `"Try Again"` | Custom text for the retry button |
| `...props` | - | - | All standard HTML div props |

## Variants

### Error (Default)
- **Icon**: ❌
- **Title**: "Error"
- **Colors**: `danger` theme colors
- **Use Case**: Critical errors, failed operations

### Warning
- **Icon**: ⚠️
- **Title**: "Warning"
- **Colors**: `warning` theme colors
- **Use Case**: Non-critical issues, user attention needed

### Info
- **Icon**: ℹ️
- **Title**: "Information"
- **Colors**: `info` theme colors
- **Use Case**: General information, helpful tips

### Success
- **Icon**: ✅
- **Title**: "Success"
- **Colors**: `success` theme colors
- **Use Case**: Successful operations, confirmations

## Size Variants

### Small
- **Padding**: `theme.spacing.md`
- **Icon Size**: `theme.typography.fontSize.lg`
- **Title Size**: `theme.typography.fontSize.sm`
- **Message Size**: `theme.typography.fontSize.xs`

### Medium (Default)
- **Padding**: `theme.spacing.lg`
- **Icon Size**: `theme.typography.fontSize.xl`
- **Title Size**: `theme.typography.fontSize.base`
- **Message Size**: `theme.typography.fontSize.sm`

### Large
- **Padding**: `theme.spacing.xl`
- **Icon Size**: `theme.typography.fontSize['2xl']`
- **Title Size**: `theme.typography.fontSize.lg`
- **Message Size**: `theme.typography.fontSize.base`

## Usage Examples

### Basic Error Message
```jsx
import { ErrorMessage } from '../UI';

<ErrorMessage message="Failed to load chemical data" />
```

### Custom Warning Message
```jsx
<ErrorMessage
  message="Some chemicals may be expired soon"
  variant="warning"
  title="Expiration Notice"
/>
```

### Info Message with Custom Title
```jsx
<ErrorMessage
  message="Data will be refreshed automatically every 5 minutes"
  variant="info"
  title="Auto-refresh Enabled"
/>
```

### Success Message
```jsx
<ErrorMessage
  message="Chemical inventory updated successfully"
  variant="success"
  title="Update Complete"
/>
```

### Error with Retry Functionality
```jsx
const handleRetry = () => {
  // Retry logic here
  fetchChemicalData();
};

<ErrorMessage
  message="Network connection failed"
  variant="error"
  onRetry={handleRetry}
  retryText="Retry Connection"
/>
```

### Compact Error Message
```jsx
<ErrorMessage
  message="Invalid input format"
  variant="error"
  size="small"
  showTitle={false}
/>
```

### Large Success Message
```jsx
<ErrorMessage
  message="All safety checks passed successfully"
  variant="success"
  size="large"
  title="Safety Validation Complete"
/>
```

### Custom Styling
```jsx
<ErrorMessage
  message="Custom styled message"
  variant="info"
  style={{ marginTop: '20px', borderWidth: '2px' }}
  className="custom-error-class"
/>
```

## Theme Integration

The component automatically uses your theme's:

- **Colors**: `danger`, `warning`, `info`, `success`, `textPrimary`
- **Spacing**: `xs`, `sm`, `md`, `lg`, `xl`
- **Typography**: Font sizes and weights
- **Border Radius**: `md` for consistent corners
- **Shadows**: `sm`, `md` for hover effects
- **Transitions**: `default` for smooth animations

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| **Desktop** | Horizontal layout with icon and content side-by-side |
| **Mobile (≤sm)** | Vertical layout with centered alignment |
| **All Sizes** | Responsive typography and spacing |

## Accessibility Features

- ✅ **Focus States**: Clear visual focus indicators with theme colors
- ✅ **Keyboard Navigation**: Full keyboard support for retry button
- ✅ **Screen Reader**: Proper semantic structure and ARIA attributes
- ✅ **High Contrast**: Theme-based color contrast for visibility
- ✅ **Icon Alternatives**: Emoji icons with semantic meaning

## Interactive Features

### Retry Button
- **Conditional Display**: Only shows when `onRetry` prop is provided
- **Custom Text**: Configurable button text via `retryText` prop
- **Hover Effects**: Subtle animations and shadow effects
- **Focus States**: Accessible focus indicators

### Hover Effects
- **Container**: Subtle upward movement and shadow
- **Retry Button**: Enhanced hover states with transforms

## Styling Customization

### CSS Custom Properties
You can override specific styles using CSS custom properties:

```css
.error-message {
  --error-bg: #custom-error-bg;
  --error-border: #custom-error-border;
}
```

### Theme Override
For advanced customization, you can extend the theme:

```javascript
// In your theme.js
components: {
  errorMessage: {
    customBackground: '#special-color',
    customBorderRadius: '20px'
  }
}
```

## Performance Notes

- **Memoization**: Consider wrapping in `React.memo` for heavy usage
- **Event Handlers**: Use `useCallback` for `onRetry` functions
- **Conditional Rendering**: Component only renders what's needed

## Browser Support

- ✅ **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest)
- ✅ **Mobile Browsers**: iOS Safari, Chrome Mobile
- ✅ **CSS Features**: Flexbox, CSS Grid, CSS Custom Properties
- ⚠️ **Legacy Support**: IE11+ (with polyfills)

## Migration Guide

### From Custom Error Containers
```jsx
// Before
const ErrorContainer = styled.div`
  background: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

// After
import { ErrorMessage } from '../UI';

<ErrorMessage
  message="Error message here"
  variant="error"
/>
```

### From HTML Error Messages
```jsx
// Before
<div className="error-message">
  <h3>Error</h3>
  <p>Something went wrong</p>
  <button onClick={retry}>Try Again</button>
</div>

// After
import { ErrorMessage } from '../UI';

<ErrorMessage
  message="Something went wrong"
  variant="error"
  onRetry={retry}
/>
```

## Common Use Cases

### API Error Handling
```jsx
const [error, setError] = useState(null);

if (error) {
  return (
    <ErrorMessage
      message={error.message}
      variant="error"
      onRetry={() => {
        setError(null);
        fetchData();
      }}
    />
  );
}
```

### Form Validation
```jsx
<ErrorMessage
  message="Please fill in all required fields"
  variant="warning"
  size="small"
  showIcon={false}
/>
```

### Success Confirmations
```jsx
<ErrorMessage
  message="Your changes have been saved successfully"
  variant="success"
  size="large"
  title="Save Complete"
/>
```

### Information Display
```jsx
<ErrorMessage
  message="This feature is currently in beta testing"
  variant="info"
  showTitle={false}
/>
```

## Troubleshooting

### Common Issues

1. **Theme Not Applied**: Ensure the component is wrapped in `ThemeProvider`
2. **Styling Conflicts**: Check for conflicting CSS classes
3. **Responsive Issues**: Verify breakpoint values in your theme

### Debug Mode
Enable debug mode to see theme values:

```jsx
<ErrorMessage
  debug={true}
  message="Debug mode enabled"
  variant="error"
/>
```

## Contributing

When contributing to this component:

1. **Maintain Theme Consistency**: Use theme values for all styling
2. **Add Responsive Support**: Ensure all new features work on mobile
3. **Update Documentation**: Keep examples and props documentation current
4. **Test Accessibility**: Verify keyboard navigation and screen reader support
5. **Add Variants**: Consider new message types if needed
