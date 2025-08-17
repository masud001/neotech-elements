import styled from 'styled-components';
import ContentTop from '../../components/ContentTop/ContentTop';
import ContentMain from '../../components/ContentMain/ContentMain';

// Styled Components
const MainContent = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  flex: 1;
  padding: ${({ theme }) => theme.layout.content.padding.default};
  transition: ${({ theme }) => theme.transitions.default};
  min-width: 0; /* Allow content to shrink below flex-basis */
  overflow-x: hidden; /* Prevent horizontal scrollbar */
  
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
`;

const Content = () => {
  return (
    <MainContent>
      <ContentTop />
      <ContentMain />
    </MainContent>
  );
};

export default Content;
