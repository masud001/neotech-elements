# SearchInput Component

A reusable, theme-aware search input component built with styled-components.

## Features

- 🎨 **Theme Integration**: Automatically uses your application's theme colors and spacing
- 📱 **Responsive Design**: Adapts to different screen sizes with appropriate styling
- 🔧 **Customizable**: Multiple size variants and customization options
- ♿ **Accessible**: Proper focus states and keyboard navigation support
- 🚀 **Performance**: Optimized re-renders and smooth transitions

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `"Search..."` | Placeholder text for the input |
| `value` | `string` | - | Controlled input value |
| `onChange` | `function` | - | Change handler function |
| `onSearch` | `function` | - | Optional search handler for Enter key |
| `width` | `string` | `"250px"` | Custom width (CSS value) |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Input size variant |
| `variant` | `'default' \| 'compact' \| 'large'` | `'default'` | Additional styling variant |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `...props` | - | - | All standard HTML input props |

## Size Variants

### Small
- Height: 32px
- Padding: `theme.spacing.sm theme.spacing.md`
- Font size: `theme.typography.fontSize.sm`

### Medium (Default)
- Height: 40px
- Padding: `theme.spacing.md theme.spacing.lg`
- Font size: `theme.typography.fontSize.base`

### Large
- Height: 48px
- Padding: `theme.spacing.lg theme.spacing.xl`
- Font size: `theme.typography.fontSize.lg`

## Usage Examples

### Basic Usage
```jsx
import { SearchInput } from '../UI';

const [searchTerm, setSearchTerm] = useState('');

<SearchInput
  placeholder="Search chemicals..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

### With Custom Width and Size
```jsx
<SearchInput
  placeholder="Search by name..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  width="300px"
  size="large"
/>
```

### With Search Handler
```jsx
<SearchInput
  placeholder="Search..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  onSearch={(value) => performSearch(value)}
/>
```

### Compact Variant
```jsx
<SearchInput
  placeholder="Quick search..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  variant="compact"
  size="small"
/>
```

### Disabled State
```jsx
<SearchInput
  placeholder="Search disabled..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  disabled={true}
/>
```

## Theme Integration

The component automatically uses your theme's:

- **Colors**: `primaryLight`, `jet`, `white`, `silver`, `pumpkin`
- **Spacing**: `xs`, `sm`, `md`, `lg`, `xl`
- **Typography**: Font sizes and weights
- **Border Radius**: `md` for consistent corners
- **Transitions**: `default` for smooth animations

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| **Desktop** | Full width as specified |
| **Tablet (≤md)** | Adjusted padding and font sizes |
| **Mobile (≤sm)** | 100% width, optimized spacing |
| **Small Mobile (≤xs)** | Compact padding and smaller fonts |

## Accessibility Features

- ✅ **Focus States**: Clear visual focus indicators
- ✅ **Keyboard Navigation**: Enter key support for search
- ✅ **Screen Reader**: Proper ARIA attributes
- ✅ **High Contrast**: Theme-based color contrast
- ✅ **Disabled States**: Clear visual feedback

## Styling Customization

### CSS Custom Properties
You can override specific styles using CSS custom properties:

```css
.search-input {
  --search-bg: #custom-color;
  --search-border: #custom-border;
}
```

### Theme Override
For advanced customization, you can extend the theme:

```javascript
// In your theme.js
components: {
  searchInput: {
    customBackground: '#special-color',
    customBorderRadius: '20px'
  }
}
```

## Performance Notes

- **Memoization**: Consider wrapping in `React.memo` for heavy usage
- **Debouncing**: For search functionality, consider debouncing the onChange handler
- **Virtual Scrolling**: For large lists, combine with virtual scrolling libraries

## Browser Support

- ✅ **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest)
- ✅ **Mobile Browsers**: iOS Safari, Chrome Mobile
- ✅ **CSS Features**: Flexbox, CSS Grid, CSS Custom Properties
- ⚠️ **Legacy Support**: IE11+ (with polyfills)

## Migration Guide

### From Custom Styled Components
```jsx
// Before
const CustomSearch = styled.input`
  background: ${({ theme }) => theme.colors.primaryLight};
  /* ... other styles */
`;

// After
import { SearchInput } from '../UI';

<SearchInput
  placeholder="Search..."
  value={value}
  onChange={onChange}
/>
```

### From HTML Input
```jsx
// Before
<input
  type="text"
  placeholder="Search..."
  className="search-input"
/>

// After
import { SearchInput } from '../UI';

<SearchInput
  placeholder="Search..."
  value={value}
  onChange={onChange}
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
<SearchInput
  debug={true}
  placeholder="Debug mode..."
  value={value}
  onChange={onChange}
/>
```

## Contributing

When contributing to this component:

1. **Maintain Theme Consistency**: Use theme values for all styling
2. **Add Responsive Support**: Ensure all new features work on mobile
3. **Update Documentation**: Keep examples and props documentation current
4. **Test Accessibility**: Verify keyboard navigation and screen reader support
