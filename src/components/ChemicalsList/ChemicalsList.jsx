import React, { useState } from 'react';
import styled from 'styled-components';
import { LoadingSpinner, SearchInput, ErrorMessage } from '../UI';

// Styled Components
const ChemicalsContainer = styled.div`

  width: 100% !important;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing['4xl']};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['2xl']};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 0;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: table;

  /* Ensure horizontal scroll works on small screens */
  min-width: 800px;  

  border: 1px solid ${({ theme }) => theme.colors.primaryLight};

  tbody tr:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    transition: ${({ theme }) => theme.transitions.default};
  }

  tbody tr:nth-of-type(odd) {
    background-color: ${({ theme }) => `${theme.colors.primaryLight}08`};
  }

  tbody tr:nth-of-type(odd):hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
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

const TableHeader = styled.thead`
  background: ${({ theme }) => theme.colors.primaryLight};
  border-bottom: 2px solid ${({ theme }) => theme.colors.pumpkin};
`;

const TableHeaderCell = styled.th`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: left;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primaryLight};
  border-right: 1px solid ${({ theme }) => theme.colors.primaryLight};
  
  &:last-child {
    border-right: none;
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xs};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: ${({ theme }) => theme.spacing.xs};
    font-size: 10px;
    letter-spacing: 0.3px;
  }
`;

const TableBody = styled.tbody`
  /* Table body styling */
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.primaryLight};
  transition: ${({ theme }) => theme.transitions.default};
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  vertical-align: middle;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xs};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: ${({ theme }) => theme.spacing.xs};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

const ProductName = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.white};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

const CasNumber = styled.div`
  font-family: monospace;
  color: ${({ theme }) => theme.colors.silverV1};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: 10px;
  }
`;

const Manufacturer = styled.div`
  color: ${({ theme }) => theme.colors.silverV1};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

const StockInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.xs};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const StockQuantity = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

const StockUnit = styled.span`
  color: ${({ theme }) => theme.colors.silverV1};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-transform: lowercase;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: 8px;
  }
`;

const HazardLevel = styled.div.withConfig({
  shouldForwardProp: (prop) => !['hazardType'].includes(prop)
})`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme, hazardType }) => {
    switch (hazardType) {
      case 'Flammable':
        return `${theme.colors.scarlet}15`;
      case 'Corrosive':
        return `${theme.colors.pumpkin}15`;
      case 'Toxic':
        return `${theme.colors.green}15`;
      default:
        return `${theme.colors.yellow}15`;
    }
  }};
  border: 1px solid ${({ theme, hazardType }) => {
    switch (hazardType) {
      case 'Flammable':
        return `${theme.colors.scarlet}30`;
      case 'Corrosive':
        return `${theme.colors.pumpkin}30`;
      case 'Toxic':
        return `${theme.colors.green}30`;
      default:
        return `${theme.colors.yellow}30`;
    }
  }};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: ${({ theme }) => theme.spacing.xs};
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const HazardIcon = styled.span.withConfig({
  shouldForwardProp: (prop) => !['hazardType'].includes(prop)
})`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
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
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: 12px;
  }
`;

const HazardText = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: 10px;
  }
`;

const SDSStatus = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop)
})`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme, isActive }) => 
    isActive ? `${theme.colors.green}15` : `${theme.colors.scarlet}15`
  };
  border: 1px solid ${({ theme, isActive }) => 
    isActive ? `${theme.colors.green}30` : `${theme.colors.scarlet}30`
  };
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: ${({ theme }) => theme.spacing.xs};
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const StatusIcon = styled.span.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop)
})`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.green : theme.colors.scarlet
  };
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: 12px;
  }
`;

const StatusText = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: 10px;
  }
`;

const HazardBadge = styled.span`
  background: ${({ theme, hazardType }) => {
    switch (hazardType) {
      case 'Flammable':
        return theme.colors.scarletV1;
      case 'Corrosive':
        return theme.colors.pumpkin;
      case 'Toxic':
        return theme.colors.green;
      default:
        return theme.colors.jet;
    }
  }};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;



const NoDataContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['6xl']};
  color: ${({ theme }) => theme.colors.silverV1};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;



const ChemicalsList = ({ data, loading, error }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getPrimaryHazard = (ghsClasses) => {
    if (ghsClasses.some(cls => cls.includes('Flammable'))) return 'Flammable';
    if (ghsClasses.some(cls => cls.includes('Corrosive'))) return 'Corrosive';
    if (ghsClasses.some(cls => cls.includes('Toxic'))) return 'Toxic';
    return 'Other';
  };

  if (loading) {
    return (
      <ChemicalsContainer>
        <Header>
          <Title>Chemical Inventory</Title>
        </Header>
        <LoadingSpinner 
          size="large" 
          color="primary" 
          text="Loading chemical data..." 
        />
      </ChemicalsContainer>
    );
  }

  if (error) {
    return (
      <ErrorMessage message={`Error loading chemical data: ${error}`} />
    );
  }

  if (!data || !data.chemicals) {
    return (
      <NoDataContainer>
        No chemical data available
      </NoDataContainer>
    );
  }

  const filteredChemicals = data.chemicals.filter(chemical =>
    chemical.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chemical.casNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chemical.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getPrimaryHazard(chemical.hazardClassification.ghsClasses).toLowerCase().includes(searchTerm.toLowerCase()) ||
    chemical.sdsInfo.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ChemicalsContainer className='chemicals-container'>
      <Header>
        <Title>Chemical Inventory</Title>
        <SearchInput
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="250px"
          size="medium"
        />
      </Header>
      
      

      <TableWrapper className='table-wrapper'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Product Name</TableHeaderCell>
              <TableHeaderCell>CAS Number</TableHeaderCell>
              <TableHeaderCell>Manufacturer</TableHeaderCell>
              <TableHeaderCell>Stock/Unit</TableHeaderCell>
              <TableHeaderCell>Hazard Level</TableHeaderCell>
              <TableHeaderCell>SDS Status</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredChemicals.map((chemical) => (
              <TableRow key={chemical.id}>
                <TableCell>
                  <ProductName>{chemical.productName}</ProductName>
                </TableCell>
                <TableCell>
                  <CasNumber>{chemical.casNumber}</CasNumber>
                </TableCell>
                <TableCell>
                  <Manufacturer>{chemical.manufacturer}</Manufacturer>
                </TableCell>
                <TableCell>
                  <StockInfo>
                    <StockQuantity>{chemical.inventoryData.currentStock}</StockQuantity>/
                    <StockUnit>{chemical.inventoryData.unit}</StockUnit>
                  </StockInfo>
                </TableCell>
                <TableCell>
                  <HazardLevel
                    hazardType={getPrimaryHazard(chemical.hazardClassification.ghsClasses)}
                  >
                    <HazardIcon
                      hazardType={getPrimaryHazard(chemical.hazardClassification.ghsClasses)}
                    >
                      {getPrimaryHazard(chemical.hazardClassification.ghsClasses) === 'Flammable' ? '⚡' : 
                       getPrimaryHazard(chemical.hazardClassification.ghsClasses) === 'Corrosive' ? '☣️' : 
                       getPrimaryHazard(chemical.hazardClassification.ghsClasses) === 'Toxic' ? '☠️' : '⚠️'}
                    </HazardIcon>
                    <HazardText>
                      {getPrimaryHazard(chemical.hazardClassification.ghsClasses)}
                    </HazardText>
                  </HazardLevel>
                </TableCell>
                <TableCell>
                  <SDSStatus
                    isActive={chemical.sdsInfo.status === 'active'}
                  >
                    <StatusIcon
                      isActive={chemical.sdsInfo.status === 'active'}
                    >
                      {chemical.sdsInfo.status === 'active' ? '✓' : '✗'}
                    </StatusIcon>
                    <StatusText>
                      {chemical.sdsInfo.status === 'active' ? 'Active' : 'Inactive'}
                    </StatusText>
                  </SDSStatus>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </ChemicalsContainer>
  );
};

export default ChemicalsList;
