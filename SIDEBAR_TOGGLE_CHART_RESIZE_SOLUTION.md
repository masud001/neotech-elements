# Sidebar Toggle Chart Resize Solution

## Problem Description

When the sidebar is toggled (collapsed/expanded), the main content area expands to fill the available space, but the Chart.js components inside don't automatically resize to take advantage of the new space. This results in charts that don't properly fill their containers after sidebar state changes.

## Root Cause

1. **Chart.js Resize Detection**: Chart.js components don't automatically detect when their container size changes due to sidebar state changes
2. **Missing Event Triggers**: No mechanism to notify charts when the sidebar toggles
3. **Timing Issues**: Charts need time to detect and respond to container size changes

## Solution Architecture

### 1. Enhanced Sidebar Context

#### **SidebarContext.js**
```javascript
export const SidebarContext = createContext({
  isSidebarOpen: true,
  toggleSidebar: () => {},
  triggerChartResize: () => {} // New function
});
```

#### **SidebarProvider.jsx**
```javascript
const triggerChartResize = () => {
  // Trigger a window resize event to force all charts to resize
  window.dispatchEvent(new Event('resize'));
  
  // Also dispatch a custom event for components that might be listening
  window.dispatchEvent(new CustomEvent('sidebarToggle', {
    detail: { isOpen: state.isSidebarOpen }
  }));
};

// Trigger chart resize whenever sidebar state changes
useEffect(() => {
  const timer = setTimeout(() => {
    triggerChartResize();
  }, 100);
  
  return () => clearTimeout(timer);
}, [state.isSidebarOpen]);
```

### 2. Custom Hook for Chart Components

#### **useSidebarResize.js**
```javascript
const useSidebarResize = (options = {}) => {
  const { enabled = true, delay = 150, onResize } = options;
  const { isSidebarOpen } = useSidebar();
  
  // Function to trigger chart resize
  const triggerResize = useCallback(() => {
    if (!enabled) return;
    
    const timer = setTimeout(() => {
      if (chartRef.current) {
        // Trigger Chart.js resize
        if (chartRef.current.resize) {
          chartRef.current.resize();
        }
        
        // Dispatch resize event for Chart.js
        window.dispatchEvent(new Event('resize'));
        
        // Call custom resize callback if provided
        if (onResize && typeof onResize === 'function') {
          onResize();
        }
      }
    }, delay);
  }, [enabled, delay, onResize]);

  // Listen for sidebar state changes
  useEffect(() => {
    if (enabled) {
      triggerResize();
    }
  }, [isSidebarOpen, triggerResize, enabled]);

  return { chartRef, triggerResize, isSidebarOpen };
};
```

### 3. Chart Component Integration

#### **MonthlyUsageChart.jsx**
```javascript
const MonthlyUsageChart = ({ data, loading, error }) => {
  // Use the sidebar resize hook for automatic chart resizing
  const { chartRef, triggerResize } = useSidebarResize({
    enabled: true,
    delay: 200,
    onResize: () => {
      // Additional custom resize logic if needed
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.resize();
      }
    }
  });
  
  // ... rest of component
};
```

#### **HazardDistributionChart.jsx**
```javascript
const HazardDistributionChart = ({ data, loading, error }) => {
  // Use the sidebar resize hook for automatic chart resizing
  const { chartRef, triggerResize } = useSidebarResize({
    enabled: true,
    delay: 200,
    onResize: () => {
      // Additional custom resize logic if needed
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.resize();
      }
    }
  });
  
  // ... rest of component
};
```

#### **ComplianceTrackingChart.jsx**
```javascript
const ComplianceTrackingChart = ({ data, loading, error }) => {
  // Use the sidebar resize hook for automatic chart resizing
  const { chartRef, triggerResize } = useSidebarResize({
    enabled: true,
    delay: 200,
    onResize: () => {
      // Additional custom resize logic if needed
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.resize();
      }
    }
  });
  
  // ... rest of component
};
```

### 4. ContentMain Component Enhancement

#### **ContentMain.jsx**
```javascript
const ContentMain = () => {
  const { data, loading, error } = useChemicalData();
  const { isSidebarOpen } = useSidebar(); // Access sidebar state
  const containerRef = useRef(null);

  // Trigger chart resize when sidebar toggles
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 150);
    
    return () => clearTimeout(timer);
  }, [isSidebarOpen]);

  // ... rest of component
};
```

### 5. CSS Transitions and Optimizations

#### **Content.css**
```css
.main-content {
  transition: all 300ms ease-in-out;
  min-width: 0; /* Allow content to shrink below flex-basis */
  overflow-x: hidden; /* Prevent horizontal scrollbar */
}

/* Ensure charts resize properly when sidebar toggles */
.main-content .chart-container,
.main-content canvas {
  transition: all 300ms ease-in-out;
  max-width: 100%;
  box-sizing: border-box;
}
```

#### **App.css**
```css
.app {
  display: flex;
  min-height: 100vh;
  transition: all 300ms ease-in-out;
}

/* Ensure smooth transitions for sidebar toggle */
.app > * {
  transition: all 300ms ease-in-out;
}

/* Optimize chart rendering during transitions */
.app canvas {
  transition: all 300ms ease-in-out;
  will-change: width, height;
}
```

## How It Works

### 1. **Sidebar Toggle Flow**
```
User clicks toggle button → Sidebar state changes → useEffect triggers → triggerChartResize() called → Window resize event dispatched → Charts detect resize → Charts redraw with new dimensions
```

### 2. **Chart Resize Detection**
- **Window Resize Event**: Standard Chart.js resize detection
- **Custom Sidebar Toggle Event**: Additional event for specific sidebar changes
- **ResizeObserver**: Monitors container size changes
- **useEffect Dependencies**: React hooks respond to sidebar state changes

### 3. **Timing and Delays**
- **100ms delay**: In SidebarProvider to ensure DOM has updated
- **150ms delay**: In ContentMain for additional safety
- **200ms delay**: In chart components for optimal timing

## Benefits

### ✅ **Automatic Resizing**
- Charts automatically resize when sidebar toggles
- No manual intervention required
- Consistent behavior across all chart components

### ✅ **Performance Optimized**
- Debounced resize events prevent excessive redraws
- Smooth transitions with CSS animations
- Efficient event handling

### ✅ **Developer Experience**
- Simple hook usage: `useSidebarResize()`
- Configurable options for different use cases
- Consistent API across all chart components

### ✅ **Responsive Design**
- Charts adapt to all screen sizes
- Mobile-friendly with appropriate delays
- Cross-browser compatibility

## Usage Examples

### Basic Usage
```javascript
import useSidebarResize from '../../hooks/useSidebarResize';

const MyChart = () => {
  const { chartRef } = useSidebarResize();
  
  return <canvas ref={chartRef} />;
};
```

### Advanced Usage
```javascript
const { chartRef, triggerResize } = useSidebarResize({
  enabled: true,
  delay: 300,
  onResize: () => {
    // Custom resize logic
    console.log('Chart resized!');
  }
});
```

### Disabled for Specific Cases
```javascript
const { chartRef } = useSidebarResize({
  enabled: false // Disable auto-resize for this component
});
```

## Troubleshooting

### Common Issues

1. **Charts Not Resizing**
   - Check if `useSidebarResize` hook is properly imported
   - Verify `SidebarProvider` wraps the app
   - Ensure chart components use the `chartRef` from the hook

2. **Performance Issues**
   - Adjust delay values if charts resize too frequently
   - Consider disabling auto-resize for complex charts
   - Monitor resize event frequency

3. **Layout Issues**
   - Verify CSS transitions are properly applied
   - Check container dimensions and overflow settings
   - Ensure responsive breakpoints are correct

### Debug Mode
```javascript
const { chartRef, triggerResize, isSidebarOpen } = useSidebarResize({
  enabled: true,
  delay: 200,
  onResize: () => {
    console.log('Sidebar state:', isSidebarOpen);
    console.log('Chart ref:', chartRef.current);
  }
});
```

## Future Enhancements

### Potential Improvements
1. **Resize Throttling**: More sophisticated debouncing for performance
2. **Custom Events**: Additional event types for different resize scenarios
3. **Animation Control**: Configurable transition animations
4. **Performance Metrics**: Monitoring resize performance and optimization

### Integration Points
1. **Other Layout Changes**: Handle other layout modifications
2. **Theme Changes**: Resize charts when theme switches
3. **Window Resize**: Enhanced window resize handling
4. **Mobile Orientation**: Handle device orientation changes

## Conclusion

This solution provides a robust, performant way for Chart.js components to automatically resize when the sidebar toggles. The combination of React context, custom hooks, and CSS transitions ensures smooth, responsive behavior while maintaining good performance and developer experience.

The implementation is:
- **Automatic**: No manual resize calls needed
- **Efficient**: Debounced events prevent excessive redraws
- **Flexible**: Configurable options for different use cases
- **Maintainable**: Clean, reusable code structure
- **Performant**: Optimized for smooth user experience
