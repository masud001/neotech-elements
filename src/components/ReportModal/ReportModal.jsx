import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MonthlyUsageChart, HazardDistributionChart, ComplianceTrackingChart } from '../Charts';
import { LoadingSpinner, ErrorMessage } from '../UI';

const ReportModal = ({ isOpen, onClose, data, loading, error }) => {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Don't render if not open
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (loading) {
    return (
      <ModalOverlay onClick={handleBackdropClick}>
        <ModalContent>
          <LoadingSpinner 
            size="large" 
            color="primary" 
            text="Generating comprehensive report..." 
          />
        </ModalContent>
      </ModalOverlay>
    );
  }

  if (error) {
    return (
      <ModalOverlay onClick={handleBackdropClick}>
        <ModalContent>
          <ErrorMessage 
            message={`Error generating report: ${error}`}
            variant="error"
            size="large"
          />
        </ModalContent>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay onClick={handleBackdropClick}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Chemical Safety Dashboard Report</ModalTitle>
          <CloseButton onClick={onClose} aria-label="Close report">
            <CloseIcon>×</CloseIcon>
          </CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <ReportSection>
            <SectionTitle>Executive Summary</SectionTitle>
            <SummaryGrid>
              <SummaryCard>
                <SummaryLabel>Total Chemicals</SummaryLabel>
                <SummaryValue>{data?.dashboardMetrics?.totalChemicals || 'N/A'}</SummaryValue>
              </SummaryCard>
              <SummaryCard>
                <SummaryLabel>Active SDS Documents</SummaryLabel>
                <SummaryValue>{data?.dashboardMetrics?.activeSDSDocuments || 'N/A'}</SummaryValue>
              </SummaryCard>
              <SummaryCard>
                <SummaryLabel>Compliance Score</SummaryLabel>
                <SummaryValue>{data?.dashboardMetrics?.complianceScore || 'N/A'}%</SummaryValue>
              </SummaryCard>
              <SummaryCard>
                <SummaryLabel>Recent Incidents</SummaryLabel>
                <SummaryValue>{data?.dashboardMetrics?.recentIncidents || 'N/A'}</SummaryValue>
              </SummaryCard>
            </SummaryGrid>
          </ReportSection>

          <ReportSection>
            <SectionTitle>Monthly Chemical Usage & Incidents</SectionTitle>
            <ChartWrapper>
              <MonthlyUsageChart 
                data={data} 
                loading={loading} 
                error={error} 
              />
            </ChartWrapper>
          </ReportSection>

          <ReportSection>
            <SectionTitle>Hazard Classification Distribution</SectionTitle>
            <ChartWrapper>
              <HazardDistributionChart 
                data={data} 
                loading={loading} 
                error={error} 
              />
            </ChartWrapper>
          </ReportSection>

          <ReportSection>
            <SectionTitle>Compliance Tracking Across Regions</SectionTitle>
            <ChartWrapper>
              <ComplianceTrackingChart 
                data={data} 
                loading={loading} 
                error={error} 
              />
            </ChartWrapper>
          </ReportSection>

          <ReportSection>
            <SectionTitle>Chemical Inventory Details</SectionTitle>
            <TableWrapper>
              <InventoryTable>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>CAS Number</th>
                    <th>Manufacturer</th>
                    <th>Current Stock</th>
                    <th>Hazard Level</th>
                    <th>SDS Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.chemicals?.map((chemical) => (
                    <tr key={chemical.id}>
                      <td>{chemical.productName}</td>
                      <td>{chemical.casNumber}</td>
                      <td>{chemical.manufacturer}</td>
                      <td>{chemical.inventoryData.currentStock} {chemical.inventoryData.unit}</td>
                      <td>
                        <HazardBadge hazardType={getPrimaryHazard(chemical.hazardClassification.ghsClasses)}>
                          {getPrimaryHazard(chemical.hazardClassification.ghsClasses)}
                        </HazardBadge>
                      </td>
                      <td>
                        <StatusBadge isActive={chemical.sdsInfo.status === 'active'}>
                          {chemical.sdsInfo.status === 'active' ? 'Active' : 'Inactive'}
                        </StatusBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </InventoryTable>
            </TableWrapper>
          </ReportSection>

          <ReportSection>
            <SectionTitle>Regulatory Compliance</SectionTitle>
            <ComplianceGrid>
              {data?.regulations?.map((regulation) => (
                <ComplianceCard key={regulation.region}>
                  <ComplianceRegion>{regulation.region}</ComplianceRegion>
                  <ComplianceStandards>
                    {regulation.standards.map((standard, index) => (
                      <StandardTag key={index}>{standard}</StandardTag>
                    ))}
                  </ComplianceStandards>
                  <ComplianceDate>Updated: {regulation.lastUpdated}</ComplianceDate>
                </ComplianceCard>
              ))}
            </ComplianceGrid>
          </ReportSection>
        </ModalBody>

        <ModalFooter>
          <FooterButton onClick={onClose}>Close Report</FooterButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

// Helper function to get primary hazard
const getPrimaryHazard = (ghsClasses) => {
  if (ghsClasses.some(cls => cls.includes('Flammable'))) return 'Flammable';
  if (ghsClasses.some(cls => cls.includes('Corrosive'))) return 'Corrosive';
  if (ghsClasses.some(cls => cls.includes('Toxic'))) return 'Toxic';
  return 'Other';
};

export default ReportModal;

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  padding: ${({ theme }) => theme.spacing.md};
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  max-width: 95vw;
  max-height: 95vh;
  width: 1400px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: modalSlideIn 0.3s ease-out;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 95vw;
    max-height: 90vh;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 98vw;
    max-height: 85vh;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100vw;
    height: 100vh;
    max-height: 85vh;
    border-radius: 0;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing['4xl']};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primaryLight};
  background: ${({ theme }) => theme.colors.primaryLight};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['2xl']};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.silverV1};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const CloseIcon = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 1;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing['4xl']};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['2xl']};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const ReportSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['6xl']};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing['4xl']};
  }
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin: 0 0 ${({ theme }) => theme.spacing['2xl']} 0;
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.pumpkin};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const SummaryCard = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing['2xl']};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.jet};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const SummaryLabel = styled.div`
  color: ${({ theme }) => theme.colors.silverV1};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SummaryValue = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

const ChartWrapper = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.jet};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;

  /* Mobile & tablet: force horizontal scroll */
  @media screen and (max-width: 1199px) {
    overflow-x: auto;
  }

  /* Desktop >= 1200px: show full table, no scroll */
  @media screen and (min-width: 1200px) {
    overflow-x: visible;
  }

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.primaryLight};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.pumpkin};
    border-radius: 3px;
    &:hover {
      background: ${({ theme }) => theme.colors.scarlet};
    }
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.pumpkin} ${({ theme }) =>
    theme.colors.primaryLight};
`;

const InventoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.jet};
  
  /* Ensure horizontal scroll works on small screens */
  min-width: 800px;
  
  th, td {
    padding: ${({ theme }) => theme.spacing.md};
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.jet};
    
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
      padding: ${({ theme }) => theme.spacing.sm};
      font-size: ${({ theme }) => theme.typography.fontSize.sm};
    }
    
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: ${({ theme }) => theme.spacing.sm};
      font-size: ${({ theme }) => theme.typography.fontSize.xs};
    }
    
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
      padding: ${({ theme }) => theme.spacing.xs};
      font-size: 10px;
    }
  }
  
  th {
    background: ${({ theme }) => theme.colors.jet};
    color: ${({ theme }) => theme.colors.white};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
      letter-spacing: 0.3px;
    }
  }
  
  td {
    color: ${({ theme }) => theme.colors.white};
  }
  
  tbody tr:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const HazardBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => !['hazardType'].includes(prop)
})`
  background: ${({ theme, hazardType }) => {
    switch (hazardType) {
      case 'Flammable':
        return `${theme.colors.scarlet}20`;
      case 'Corrosive':
        return `${theme.colors.pumpkin}20`;
      case 'Toxic':
        return `${theme.colors.green}20`;
      default:
        return `${theme.colors.yellow}20`;
    }
  }};
  color: ${({ theme, hazardType }) => {
    switch (hazardType) {
      case 'Flammable':
        return theme.colors.scarlet;
      case 'Corrosive':
        return theme.colors.pumpkin;
      case 'Toxic':
        return theme.colors.green;
      default:
        return theme.colors.yellow;
    }
  }};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid ${({ theme, hazardType }) => {
    switch (hazardType) {
      case 'Flammable':
        return `${theme.colors.scarlet}40`;
      case 'Corrosive':
        return `${theme.colors.pumpkin}40`;
      case 'Toxic':
        return `${theme.colors.green}40`;
      default:
        return `${theme.colors.yellow}40`;
    }
  }};
`;

const StatusBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop)
})`
  background: ${({ theme, isActive }) => 
    isActive ? `${theme.colors.green}20` : `${theme.colors.scarlet}20`
  };
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.green : theme.colors.scarlet
  };
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid ${({ theme, isActive }) => 
    isActive ? `${theme.colors.green}40` : `${theme.colors.scarlet}40`
  };
`;

const ComplianceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const ComplianceCard = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.jet};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const ComplianceRegion = styled.h4`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`;

const ComplianceStandards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StandardTag = styled.span`
  background: ${({ theme }) => theme.colors.pumpkin};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ComplianceDate = styled.div`
  color: ${({ theme }) => theme.colors.silverV1};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-style: italic;
`;

const ModalFooter = styled.div`
  padding: ${({ theme }) => theme.spacing['4xl']};
  border-top: 1px solid ${({ theme }) => theme.colors.primaryLight};
  background: ${({ theme }) => theme.colors.primaryLight};
  display: flex;
  justify-content: flex-end;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['2xl']};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const FooterButton = styled.button`
  background: ${({ theme }) => theme.colors.pumpkin};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background: ${({ theme }) => theme.colors.scarlet};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;
