import { iconsImgs } from "../../utils/images";
import { useContext, useState } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import styled from "styled-components";
import ReportModal from "../ReportModal";
import { useChemicalData } from "../../hooks/useChemicalData";
import { Button } from "../UI";

const ContentTop = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { data, loading, error } = useChemicalData();

  const handleGenerateReport = () => {
    setIsReportModalOpen(true);
  };

  const handleCloseReport = () => {
    setIsReportModalOpen(false);
  };

  return (
    <>
      <MainContentTop>
        <ContentTopLeft>
          <SidebarToggler type="button" onClick={() => toggleSidebar()}>
            <MenuIcon src={iconsImgs.menu} alt="Toggle sidebar" />
          </SidebarToggler>
          <ContentTopTitle>Home</ContentTopTitle>
        </ContentTopLeft>
        <ContentTopButtons>
          <ResponsiveButton 
            onClick={handleGenerateReport}
            variant="primary"
            size="medium"
            active={true}
          >
            📊 Generate Report
          </ResponsiveButton>
          <SearchButton type="button" className="search-btn">
            <SearchIcon src={iconsImgs.search} alt="Search" />
          </SearchButton>
          <NotificationButton className="notification-btn">
            <BellIcon src={iconsImgs.bell} alt="Notifications" />
            <NotificationDot />
          </NotificationButton>
        </ContentTopButtons>
      </MainContentTop>

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={handleCloseReport}
        data={data}
        loading={loading}
        error={error}
      />
    </>
  );
};

// Styled Components
const MainContentTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing['6xl']};
  padding: ${({ theme }) => theme.spacing.md} 0;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.spacing['4xl']};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const ContentTopLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SidebarToggler = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.default};
 
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.xs};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: ${({ theme }) => theme.spacing.xs};
  }
`;

const MenuIcon = styled.img`
  width: ${({ theme }) => theme.spacing['4xl']};
  height: auto;
  filter: brightness(0) invert(1);
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: ${({ theme }) => theme.spacing['3xl']};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    width: ${({ theme }) => theme.spacing['2xl']};
  }
`;

const ContentTopTitle = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const ContentTopButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.sm};
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    margin-left: 0;
    gap: ${({ theme }) => theme.spacing.xs};
    
    align-items: stretch;
    width: 100%;
  }
`;

const TopButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.default};
  position: relative;
  
  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
  
  &:focus {
    outline: none;
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.xs};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: ${({ theme }) => theme.spacing.xs};
  }
`;



const SearchButton = styled(TopButton)`
  /* Inherits all styles from TopButton */
`;

const NotificationButton = styled(TopButton)`
  /* Inherits all styles from TopButton */
`;

const SearchIcon = styled.img`
  width: ${({ theme }) => theme.spacing['4xl']};
  height: auto;
  filter: brightness(0) invert(1);
  transition: ${({ theme }) => theme.transitions.default};
  
  ${TopButton}:hover & {
    filter: brightness(0) invert(1);
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: ${({ theme }) => theme.spacing['3xl']};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    width: ${({ theme }) => theme.spacing['2xl']};
  }
`;

const BellIcon = styled.img`
  width: ${({ theme }) => theme.spacing['4xl']};
  height: auto;
  filter: brightness(0) invert(1);
  transition: ${({ theme }) => theme.transitions.default};
  
  ${TopButton}:hover & {
    filter: brightness(0) invert(1);
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: ${({ theme }) => theme.spacing['3xl']};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    width: ${({ theme }) => theme.spacing['2xl']};
  }
`;



const ResponsiveButton = styled(Button)`
  /* Mobile-first responsive adjustments */
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    min-width: auto;
    width: auto;
    height: 36px;
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: ${({ theme }) => theme.spacing.xs};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    min-width: auto;
    width: auto;
    height: 32px;
    white-space: normal;
    text-align: center;
    line-height: 1.2;
  }
`;

const NotificationDot = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xs};
  right: ${({ theme }) => theme.spacing.xs};
  width: ${({ theme }) => theme.spacing.sm};
  height: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.scarlet};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: ${({ theme }) => theme.spacing.xs};
    height: ${({ theme }) => theme.spacing.xs};
    top: ${({ theme }) => theme.spacing.xs};
    right: ${({ theme }) => theme.spacing.xs};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    width: ${({ theme }) => theme.spacing.xs};
    height: ${({ theme }) => theme.spacing.xs};
  }
`;

export default ContentTop;
