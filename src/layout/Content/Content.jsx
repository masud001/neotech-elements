import React, { useContext, memo } from 'react';
import styled from 'styled-components';
import ContentTop from '../../components/ContentTop/ContentTop';
import ContentMain from '../../components/ContentMain/ContentMain';
import { SidebarContext } from '../../context/SidebarContext';

// Styled Components
const MainContent = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  flex: 1;
  padding-top: 0;
  margin-top: 32px;
  padding-right: ${({ theme }) => theme.layout.content.padding.default};
  padding-left: ${({ theme }) => theme.layout.content.padding.default};
  padding-bottom: ${({ theme }) => theme.layout.content.padding.default};
  transition: ${({ theme }) => theme.transitions.default};
  min-width: 0; /* Allow content to shrink below flex-basis */
  
  /* Remove conflicting scroll properties - let body handle scrolling */
  /* overflow-x: hidden; */ /* Removed - conflicts with body */
  /* height: 100vh; */ /* Removed - conflicts with body scroll */
  /* overflow-y: auto; */ /* Removed - conflicts with body scroll */
  
  /* Performance optimizations */
  contain: layout style paint;
  will-change: auto;
  
  /* Prevent layout shift */
  min-height: 100vh;
  
  /* Ensure charts resize properly when sidebar toggles */
  .chart-container,
  canvas {
    transition: ${({ theme }) => theme.transitions.default};
    max-width: 100%;
    box-sizing: border-box;
    /* Performance optimizations */
    contain: layout style paint;
    will-change: auto;
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints['2xl']}) {
    padding-left: ${({ theme }) => theme.layout.content.padding.lg};
    padding-right: ${({ theme }) => theme.layout.content.padding.lg};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    padding-right: ${({ theme }) => theme.layout.content.padding.md};
    padding-left: ${({ theme }) => theme.layout.content.padding.md};
  }
  
  /* Mobile performance optimizations */
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    /* Reduce layout shift on mobile */
    contain: layout style paint;
    /* Prevent layout shift */
    min-height: 100vh;
  }
  
  /* Sidebar collapsed state - handled by App.css now */
  &.sidebar-collapsed {
    /* Margin adjustment handled by App.css */
  }
`;

const Content = memo(() => {
  const { isSidebarOpen } = useContext(SidebarContext);
  
  return (
    <MainContent className={!isSidebarOpen ? 'sidebar-collapsed' : 'main-content'}>
      <ContentTop />
      <ContentMain />
    </MainContent>
  );
});

Content.displayName = 'Content';

export default Content;
