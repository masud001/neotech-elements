import { createContext, useReducer, useEffect, useState } from 'react';
import { SidebarContext } from './SidebarContext';
import sidebarReducer, { initialState } from '../reducer/sidebarReducer';

const SidebarProvider = ({ children }) => {
  // Detect screen size and set initial sidebar state
  const [isDesktop, setIsDesktop] = useState(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768; // Desktop breakpoint
    }
    return true; // Default to desktop on server-side
  });

  // Create initial state based on screen size
  const getInitialState = () => ({
    isSidebarOpen: isDesktop // Open on desktop, closed on mobile
  });

  const [state, dispatch] = useReducer(sidebarReducer, getInitialState());

  // Handle window resize to update sidebar state
  useEffect(() => {
    const handleResize = () => {
      const newIsDesktop = window.innerWidth >= 768;
      if (newIsDesktop !== isDesktop) {
        setIsDesktop(newIsDesktop);
        // Auto-open sidebar on desktop, auto-close on mobile
        if (newIsDesktop && !state.isSidebarOpen) {
          dispatch({ type: 'SET_SIDEBAR_STATE', payload: true });
        } else if (!newIsDesktop && state.isSidebarOpen) {
          dispatch({ type: 'SET_SIDEBAR_STATE', payload: false });
        }
      }
    };

    // Set initial state on mount
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isDesktop, state.isSidebarOpen]);

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  const expandSidebar = () => {
    // Only expand if sidebar is currently closed
    if (!state.isSidebarOpen) {
      dispatch({ type: 'SET_SIDEBAR_STATE', payload: true });
    }
  };

  const collapseSidebar = () => {
    // Only collapse if sidebar is currently open
    if (state.isSidebarOpen) {
      dispatch({ type: 'SET_SIDEBAR_STATE', payload: false });
    }
  };

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
    // Small delay to ensure DOM has updated
    const timer = setTimeout(() => {
      triggerChartResize();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [state.isSidebarOpen]);

  return (
    <SidebarContext.Provider value={{ 
      ...state, 
      toggleSidebar,
      expandSidebar,
      collapseSidebar,
      triggerChartResize,
      isDesktop
    }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;