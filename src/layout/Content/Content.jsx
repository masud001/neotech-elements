import styled from 'styled-components';
import { useContext } from 'react';
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
  overflow-x: hidden; /* Prevent horizontal scrollbar */
  height: 100vh; /* Full height for proper scroll context */
  overflow-y: auto; /* Enable vertical scrolling */
  
  /* Ensure charts resize properly when sidebar toggles */
  .chart-container,
  canvas {
    transition: ${({ theme }) => theme.transitions.default};
    max-width: 100%;
    box-sizing: border-box;
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints['2xl']}) {
    padding-left: ${({ theme }) => theme.layout.content.padding.lg};
    padding-right: ${({ theme }) => theme.layout.content.padding.lg};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    padding-right: ${({ theme }) => theme.layout.content.padding.md};
    padding-left: ${({ theme }) => theme.layout.content.padding.md};
  }
  
  /* Sidebar collapsed state - handled by App.css now */
  &.sidebar-collapsed {
    /* Margin adjustment handled by App.css */
  }
`;

const Content = () => {
  const { isSidebarOpen } = useContext(SidebarContext);
  
  return (
    <MainContent className={!isSidebarOpen ? 'sidebar-collapsed' : 'main-content'}>
      <ContentTop />
      <ContentMain />
    </MainContent>
  );
};

export default Content;
