import React, { Suspense, lazy, memo } from 'react';
import { ThemeProvider, GlobalStyles } from './theme';
import SidebarProvider from './context/SidebarProvider';
import LoadingFallback from './components/feedback/LoadingFallback';
import './App.css';

// Lazy load large layout pieces
const Sidebar = lazy(() => import('./layout/Sidebar/Sidebar'));
const Content = lazy(() => import('./layout/Content/Content'));

const App = () => (
  <ThemeProvider>
    <GlobalStyles />
    <SidebarProvider>
      <Suspense fallback={<LoadingFallback />}>
        <div className="app">
          <Sidebar />
          <Content />
        </div>
      </Suspense>
    </SidebarProvider>
  </ThemeProvider>
);

export default memo(App);
