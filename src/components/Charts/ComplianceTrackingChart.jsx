import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styled, { keyframes } from 'styled-components';
import { Button, LoadingSpinner } from '../UI';
import useSidebarResize from '../../hooks/useSidebarResize';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ComplianceTrackingChart = ({ data, loading, error }) => {
  const [chartType, setChartType] = useState('bar');
  const [isMobile, setIsMobile] = useState(false);
  
  // Use the sidebar resize hook for automatic chart resizing
  const { chartRef, triggerResize } = useSidebarResize({
    enabled: true,
    delay: 200,
    onResize: () => {
      // Additional custom resize logic if needed
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.resize();
      }
    }
  });

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      // Force chart resize
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.resize();
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <ChartContainer>
        <ChartHeader>
          <ChartTitle>Compliance Tracking Across Regions</ChartTitle>
        </ChartHeader>
        <LoadingSpinner 
          size="large" 
          color="primary" 
          text="Loading compliance data..." 
        />
      </ChartContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <div>Error loading compliance data: {error}</div>
      </ErrorContainer>
    );
  }

  if (!data || !data.reports || !data.reports.complianceTracking) {
    return (
      <NoDataContainer>
        <div>No compliance data available</div>
      </NoDataContainer>
    );
  }

  const complianceData = data.reports.complianceTracking;

  const renderProgressBars = () => (
    <ProgressBarsContainer>
      {complianceData.map((region, index) => {
        const total = region.compliant + region.nonCompliant;
        const compliantPercentage = total > 0 ? (region.compliant / total) * 100 : 0;
        const nonCompliantPercentage = total > 0 ? (region.nonCompliant / total) * 100 : 0;
        
        return (
          <ProgressBarItem key={index}>
            <ProgressBarHeader>
              <RegionName>{region.region}</RegionName>
              <RegionStats>
                <StatItem>
                  <StatLabel>Compliant:</StatLabel>
                  <StatValue compliant>{region.compliant}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>Non-Compliant:</StatLabel>
                  <StatValue nonCompliant>{region.nonCompliant}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>Total:</StatLabel>
                  <StatValue>{total}</StatValue>
                </StatItem>
              </RegionStats>
            </ProgressBarHeader>
            <ProgressBarWrapper index={index}>
              <ProgressBar
                compliant
                width={compliantPercentage}
                title={`${compliantPercentage.toFixed(1)}% Compliant`}
                index={index}
              />
              <ProgressBar
                nonCompliant
                width={nonCompliantPercentage}
                title={`${nonCompliantPercentage.toFixed(1)}% Non-Compliant`}
                index={index}
              />
            </ProgressBarWrapper>
            <ProgressPercentage index={index}>
              {compliantPercentage.toFixed(1)}% Compliant
            </ProgressPercentage>
          </ProgressBarItem>
        );
      })}
    </ProgressBarsContainer>
  );

  // Create chart data with theme colors
  const getChartData = () => ({
    labels: complianceData.map(item => item.region),
    datasets: [
      {
        label: 'Compliant',
        data: complianceData.map(item => item.compliant),
        backgroundColor: 'rgba(40, 167, 69, 0.8)', // #28a745 (theme.colors.success) with opacity
        borderColor: '#28a745', // theme.colors.success
        borderWidth: isMobile ? 2 : 3,
        borderRadius: isMobile ? 4 : 6,
      },
      {
        label: 'Non-Compliant',
        data: complianceData.map(item => item.nonCompliant),
        backgroundColor: 'rgba(220, 53, 69, 0.8)', // #dc3545 (theme.colors.danger) with opacity
        borderColor: '#dc3545', // theme.colors.danger
        borderWidth: isMobile ? 2 : 3,
        borderRadius: isMobile ? 4 : 6,
      }
    ]
  });

  const chartData = getChartData();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
          font: {
            size: isMobile ? 12 : 14,
            weight: 'bold'
          },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: isMobile ? 12 : 16,
          boxWidth: isMobile ? 12 : 16,
          boxHeight: isMobile ? 12 : 16
        },
        align: 'center',
        padding: {
          top: isMobile ? 8 : 16,
          bottom: isMobile ? 16 : 24,
          left: isMobile ? 8 : 16,
          right: isMobile ? 8 : 16
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#ffa500',
        borderWidth: 1,
        titleFont: {
          size: isMobile ? 12 : 14,
          weight: 'bold'
        },
        bodyFont: {
          size: isMobile ? 11 : 13
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: isMobile ? 10 : 12,
            weight: 'bold'
          },
          padding: isMobile ? 4 : 8
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: isMobile ? 10 : 12,
            weight: 'bold'
          },
          padding: isMobile ? 4 : 8
        }
      }
    },
    layout: {
      padding: {
        top: isMobile ? 16 : 32,
        right: isMobile ? 10 : 20,
        bottom: isMobile ? 10 : 20,
        left: isMobile ? 10 : 20
      }
    },
    elements: {
      bar: {
        borderWidth: isMobile ? 1 : 2
      }
    }
  };

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>Compliance Tracking Across Regions</ChartTitle>
        <ToggleContainer>
          <ToggleLabel>View:</ToggleLabel>
          <Button
            active={chartType === 'bar'}
            onClick={() => setChartType('bar')}
            variant="toggle"
            size="small"
          >
            Bar Chart
          </Button>
          <Button
            active={chartType === 'progress'}
            onClick={() => setChartType('progress')}
            variant="toggle"
            size="small"
          >
            Progress Bars
          </Button>
        </ToggleContainer>
      </ChartHeader>
      
      <ChartWrapper>
        {chartType === 'bar' ? (
          <Bar data={chartData} options={chartOptions} ref={chartRef} />
        ) : (
          renderProgressBars()
        )}
      </ChartWrapper>
    </ChartContainer>
  );
};

// Styled Components
const ChartContainer = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  min-width: 0;
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding: ${({ theme }) => theme.spacing['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing['3xl']};
    margin-bottom: ${({ theme }) => theme.spacing['4xl']};
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing['4xl']};
    margin-bottom: ${({ theme }) => theme.spacing['5xl']};
  }
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    gap: ${({ theme }) => theme.spacing.md};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const ChartTitle = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
  line-height: 1.2;
  flex: 1;
  min-width: 0;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    text-align: center;
    flex: none;
    width: 100%;
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: 0;
  flex-direction: row;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    justify-content: center;
    flex-direction: row;
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.xs};
    flex-direction: row;
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const ToggleLabel = styled.span`
  color: ${({ theme }) => theme.colors.silverV1};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  white-space: nowrap;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    text-align: center;
  }
`;

const ChartWrapper = styled.div`
  position: relative;
  height: 300px;
  width: 100%;
  max-width: 100%;
  min-height: 250px;
  box-sizing: border-box;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 350px;
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 450px;
    margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  }
`;

const ErrorContainer = styled.div`
  background: ${({ theme }) => theme.colors.scarletV1};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
  margin: ${({ theme }) => theme.spacing['2xl']} 0;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
    margin: ${({ theme }) => theme.spacing.lg} 0;
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm};
    margin: ${({ theme }) => theme.spacing.md} 0;
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: ${({ theme }) => theme.spacing.sm};
    margin: ${({ theme }) => theme.spacing.sm} 0;
  }
`;

const NoDataContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['4xl']};
  color: ${({ theme }) => theme.colors.silverV1};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    padding: ${({ theme }) => theme.spacing['3xl']};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing['2xl']};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['2xl']};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

// Progress Bars Styled Components
const ProgressBarsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  height: 100%;
  overflow-y: auto;
  padding-right: ${({ theme }) => theme.spacing.sm};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const ProgressBarItem = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.jet};
  opacity: 0;
  transform: translateY(20px);
  animation: slideInUp 0.6s ease-out forwards;
  animation-delay: ${({ index }) => index * 0.15}s;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }

  @keyframes slideInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ProgressBarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const RegionName = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

const RegionStats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.silverV1};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const StatValue = styled.span`
  color: ${({ theme, compliant, nonCompliant }) => {
    if (compliant) return theme.colors.success;
    if (nonCompliant) return theme.colors.danger;
    return theme.colors.white;
  }};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  height: 20px;
  background: ${({ theme }) => theme.colors.jet};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  position: relative;
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
  animation-delay: ${({ index }) => (index * 0.15) + 0.3}s;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 16px;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    animation: shimmer 2s infinite;
    animation-delay: ${({ index }) => (index * 0.15) + 1}s;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${({ width }) => width}%;
  background: ${({ compliant, nonCompliant, theme }) => {
    if (compliant) return theme.colors.success;
    if (nonCompliant) return theme.colors.danger;
    return theme.colors.pumpkin;
  }};
  transition: all ${({ theme }) => theme.transitions.default};
  cursor: pointer;
  transform: scaleX(0);
  transform-origin: left;
  animation: progressBarEntrance 0.8s ease-out forwards;
  animation-delay: ${({ index }) => index * 0.2}s;

  &:hover {
    opacity: 0.8;
    transform: scaleX(1.02);
    box-shadow: 0 0 8px ${({ compliant, nonCompliant, theme }) => {
      if (compliant) return theme.colors.success;
      if (nonCompliant) return theme.colors.danger;
      return theme.colors.pumpkin;
    }}40;
  }

  @keyframes progressBarEntrance {
    0% {
      transform: scaleX(0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scaleX(1);
      opacity: 1;
    }
  }
`;

const ProgressPercentage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.silverV1};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: ${({ index }) => (index * 0.2) + 0.4}s;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default ComplianceTrackingChart;