import React, { Suspense, lazy } from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from './components/UI';
import { ThemeProvider, GlobalStyles } from './theme';
import SidebarProvider from './context/SidebarProvider';
import './App.css';

// Lazy load components for better performance
const Sidebar = lazy(() => import('./layout/Sidebar/Sidebar'));
const Content = lazy(() => import('./layout/Content/Content'));

// Styled loading fallback container
const LoadingFallbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: #1e1611;
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.loading};
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
  /* Additional centering for cross-browser compatibility */
  text-align: center;
  
  /* Ensure perfect centering on all devices */
  @media screen and (max-width: 768px) {
    padding: 20px;
    box-sizing: border-box;
    min-height: 100vh;
    overflow-y: auto;
  }
  
  /* Mobile-specific fixes for 420px and below */
  @media screen and (max-width: 420px) {
    min-height: 100vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
  }
`;

// Loading fallback component
const LoadingFallback = () => (
  <LoadingFallbackContainer>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      maxWidth: '100%',
      padding: '20px'
    }}>
      <LoadingSpinner 
        size="large" 
        color="primary" 
        text="Loading Chemical Safety Dashboard..." 
      />
    </div>
  </LoadingFallbackContainer>
);

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <SidebarProvider>
          <Suspense fallback={<LoadingFallback />}>
            <div className='app'>
                <Sidebar />
                <Content />
            </div>
          </Suspense>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default React.memo(App);
