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
  const lastResizeTime = useRef(0);

  // Function to trigger chart resize
  const triggerResize = useCallback(() => {
    if (!enabled) return;

    // Prevent rapid successive resizes
    const now = Date.now();
    if (now - lastResizeTime.current < 100) {
      return;
    }
    lastResizeTime.current = now;

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
      // Add a small delay to ensure DOM has settled
      const sidebarResizeTimeout = setTimeout(() => {
        triggerResize();
      }, 50);
      
      return () => clearTimeout(sidebarResizeTimeout);
    }
  }, [isSidebarOpen, triggerResize, enabled]);

  // Listen for custom sidebar toggle events
  useEffect(() => {
    const handleSidebarToggle = () => {
      if (enabled) {
        // Add a small delay to ensure DOM has settled
        setTimeout(() => {
          triggerResize();
        }, 50);
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
        // Debounce window resize events
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current);
        }
        
        resizeTimeoutRef.current = setTimeout(() => {
          triggerResize();
        }, 100);
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
