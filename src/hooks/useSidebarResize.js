import { useEffect, useRef, useCallback } from 'react';
import { useSidebar } from '../context/SidebarContext';

/**
 * Custom hook for chart components to automatically resize when sidebar toggles
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether to enable auto-resize (default: true)
 * @param {number} options.delay - Delay before resize in milliseconds (default: 150)
 * @param {Function} options.onResize - Custom resize callback function
 * @returns {Object} - Resize utilities
 */
const useSidebarResize = (options = {}) => {
  const { enabled = true, delay = 150, onResize } = options;
  const { isSidebarOpen } = useSidebar();
  const resizeTimeoutRef = useRef(null);
  const chartRef = useRef(null);

  // Function to trigger chart resize
  const triggerResize = useCallback(() => {
    if (!enabled) return;

    // Clear any existing timeout
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    // Set a new timeout to allow DOM to settle
    resizeTimeoutRef.current = setTimeout(() => {
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

  // Listen for custom sidebar toggle events
  useEffect(() => {
    const handleSidebarToggle = () => {
      if (enabled) {
        triggerResize();
      }
    };

    window.addEventListener('sidebarToggle', handleSidebarToggle);
    
    return () => {
      window.removeEventListener('sidebarToggle', handleSidebarToggle);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [enabled, triggerResize]);

  // Listen for window resize events
  useEffect(() => {
    const handleWindowResize = () => {
      if (enabled) {
        triggerResize();
      }
    };

    window.addEventListener('resize', handleWindowResize);
    
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [enabled, triggerResize]);

  return {
    chartRef,
    triggerResize,
    isSidebarOpen
  };
};

export default useSidebarResize;
