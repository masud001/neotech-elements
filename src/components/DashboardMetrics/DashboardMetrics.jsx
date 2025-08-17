import React, { memo, useEffect } from 'react';
import styled from 'styled-components';
import useChemicalData from '../../hooks/useChemicalData';
import { LoadingSpinner } from '../UI';

// Styled Components
const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing['2xl']};
  padding-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
  
  /* Performance optimizations */
  contain: layout style paint;
  will-change: auto;
  
  /* Prevent layout shift - consistent grid dimensions */
  min-height: 200px;
  
  @media screen and (min-width: 1540px) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacing['2xl']};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing['2xl']};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const MetricCard = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing['4xl']};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  transition: ${({ theme }) => theme.transitions.default};
  
  /* Performance optimizations */
  contain: layout style paint;
  will-change: auto;
  
  /* Prevent layout shift - consistent card dimensions */
  min-height: 160px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.pumpkin};
  }
`;

const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  /* Prevent layout shift - consistent header height */
  min-height: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
`;

const MetricTitle = styled.h3`
  color: ${({ theme }) => theme.colors.silverV1};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  /* Prevent layout shift */
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 70%;
`;

const MetricIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop)
})`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme, variant }) => {
    switch (variant) {
      case 'chemicals':
        return `linear-gradient(135deg, ${theme.colors.green}, ${theme.colors.peach})`;
      case 'sds':
        return `linear-gradient(135deg, ${theme.colors.pumpkin}, ${theme.colors.yellow})`;
      case 'incidents':
        return `linear-gradient(135deg, ${theme.colors.scarlet}, ${theme.colors.peach})`;
      case 'compliance':
        return `linear-gradient(135deg, ${theme.colors.green}, ${theme.colors.yellow})`;
      case 'expiring':
        return `linear-gradient(135deg, ${theme.colors.scarlet}, ${theme.colors.pumpkin})`;
      case 'audit':
        return `linear-gradient(135deg, ${theme.colors.green}, ${theme.colors.peach})`;
      case 'nextAudit':
        return `linear-gradient(135deg, ${theme.colors.pumpkin}, ${theme.colors.yellow})`;
      default:
        return `linear-gradient(135deg, ${theme.colors.pumpkin}, ${theme.colors.green})`;
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  
  /* Prevent layout shift */
  flex-shrink: 0;
`;

const MetricValue = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extrabold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  /* Prevent layout shift - consistent value height */
  line-height: 1.2;
  min-height: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const MetricSubtext = styled.div`
  color: ${({ theme }) => theme.colors.silverV1};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  
  /* Prevent layout shift - consistent subtext height */
  line-height: 1.4;
  min-height: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
`;

const MetricTrendStyled = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme, $isPositive }) => 
    $isPositive ? theme.colors.silverV1 : theme.colors.silverV1};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  /* Prevent layout shift - consistent trend height */
  line-height: 1.4;
  min-height: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  margin-top: auto;
`;

const MetricTrend = ({ isPositive, children, ...props }) => (
  <MetricTrendStyled $isPositive={isPositive} {...props}>
    {children}
  </MetricTrendStyled>
);

const TrendIcon = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  
  /* Prevent layout shift */
  flex-shrink: 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.silverV1};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  /* Prevent layout shift - match metrics container height */
  min-height: 200px;
`;

const ErrorContainer = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.silverV1};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border: 1px solid ${({ theme }) => theme.colors.jet};
  
  /* Prevent layout shift - match metrics container height */
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DashboardMetrics = () => {
  const { data, loading, error, dataSource } = useChemicalData();


  // Date formatting function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner 
          size="large" 
          color="primary" 
          text="Loading dashboard metrics..." 
        />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        Error loading data: {error}
      </ErrorContainer>
    );
  }

  if (!data) {
    return null;
  }

  const { dashboardMetrics } = data;

  // Validate that dashboardMetrics exists and has required properties
  if (!dashboardMetrics) {
    return (
      <ErrorContainer>
        Dashboard metrics data not available
      </ErrorContainer>
    );
  }

  // Check if all required properties exist
  const requiredProperties = [
    'totalChemicals', 
    'activeSDSDocuments', 
    'recentIncidents', 
    'complianceScore',
    'lastAuditDate',
    'nextAuditDate'
  ];
  const missingProperties = requiredProperties.filter(prop => !(prop in dashboardMetrics));

  const metrics = [
    {
      title: 'Total Chemicals',
      value: dashboardMetrics.totalChemicals || 'N/A',
      subtext: 'Active inventory items',
      icon: '🧪',
      variant: 'chemicals',
      trend: '+2 this month',
      isPositive: true
    },
    {
      title: 'Active SDS Documents',
      value: dashboardMetrics.activeSDSDocuments || 'N/A',
      subtext: 'Safety Data Sheets',
      icon: '📋',
      variant: 'sds',
      trend: 'All up to date',
      isPositive: true
    },
    {
      title: 'Recent Incidents',
      value: dashboardMetrics.recentIncidents || 'N/A',
      subtext: 'Last 30 days',
      icon: '⚠️',
      variant: 'incidents',
      trend: (dashboardMetrics.recentIncidents || 0) > 0 ? 'Requires attention' : 'No incidents',
      isPositive: (dashboardMetrics.recentIncidents || 0) === 0
    },
    {
      title: 'Compliance Score',
      value: dashboardMetrics.complianceScore ? `${dashboardMetrics.complianceScore}%` : 'N/A',
      subtext: 'Regulatory compliance',
      icon: '✅',
      variant: 'compliance',
      trend: (dashboardMetrics.complianceScore || 0) >= 90 ? 'Excellent' : 'Needs improvement',
      isPositive: (dashboardMetrics.complianceScore || 0) >= 90
    },
    {
      title: 'Last Audit',
      value: dashboardMetrics.lastAuditDate ? formatDate(dashboardMetrics.lastAuditDate) : 'N/A',
      subtext: 'Most recent audit date',
      icon: '📅',
      variant: 'audit',
      trend: 'Completed',
      isPositive: true
    },
    {
      title: 'Next Audit',
      value: dashboardMetrics.nextAuditDate ? formatDate(dashboardMetrics.nextAuditDate) : 'N/A',
      subtext: 'Upcoming audit date',
      icon: '📋',
      variant: 'nextAudit',
      trend: 'Scheduled',
      isPositive: true
    }
  ];

  return (
    <>
      <MetricsContainer className='dashboard-metrics-container'>
        {metrics.map((metric, index) => (
          <MetricCard key={index}>
            <MetricHeader>
              <MetricTitle>{metric.title}</MetricTitle>
              <MetricIcon variant={metric.variant}>
                {metric.icon}
              </MetricIcon>
            </MetricHeader>
            <MetricValue>{metric.value}</MetricValue>
            <MetricSubtext>{metric.subtext}</MetricSubtext>
            <MetricTrend isPositive={metric.isPositive}>
              <TrendIcon>
                {metric.isPositive ? '↗' : '↘'}
              </TrendIcon>
              {metric.trend}
            </MetricTrend>
          </MetricCard>
        ))}
      </MetricsContainer>
    </>
  );
};

export default memo(DashboardMetrics);
