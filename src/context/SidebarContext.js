import { createContext, useContext } from 'react';

export const SidebarContext = createContext({
  isSidebarOpen: true,
  isDesktop: true,
  toggleSidebar: () => {},
  expandSidebar: () => {},
  collapseSidebar: () => {},
  triggerChartResize: () => {}
});

export const useSidebar = () => useContext(SidebarContext);
