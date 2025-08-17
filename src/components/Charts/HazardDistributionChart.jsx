import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Button, LoadingSpinner } from '../UI';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import useSidebarResize from '../../hooks/useSidebarResize';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

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
  color: ${({ theme }) => theme.colors.silver};
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
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  color: ${({ theme }) => theme.colors.silver};
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

const HazardDistributionChart = ({ data, loading, error }) => {
  const [chartType, setChartType] = useState('doughnut'); // 'doughnut' or 'pie'
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
          <ChartTitle>Hazard Classification Distribution</ChartTitle>
        </ChartHeader>
        <LoadingSpinner 
          size="large" 
          color="white" 
          text="Loading hazard data..." 
        />
      </ChartContainer>
    );
  }

  if (error) {
    return (
      <ChartContainer>
        <ChartHeader>
          <ChartTitle>Hazard Classification Distribution</ChartTitle>
        </ChartHeader>
        <ErrorContainer>
          Error loading hazard data: {error}
        </ErrorContainer>
      </ChartContainer>
    );
  }

  if (!data || !data.reports || !data.reports.hazardDistribution) {
    return (
      <ChartContainer>
        <ChartHeader>
          <ChartTitle>Hazard Classification Distribution</ChartTitle>
        </ChartHeader>
        <NoDataContainer>
          No hazard distribution data available
        </NoDataContainer>
      </ChartContainer>
    );
  }

  const hazardData = data.reports.hazardDistribution;

  // Show all categories including those with 0 count for complete visibility
  const chartData = {
    labels: hazardData.map(item => item.category),
    datasets: [
      {
        data: hazardData.map(item => item.count),
        backgroundColor: [
          'rgba(255, 165, 0, 0.8)',   // Pumpkin - Flammable
          'rgba(220, 53, 69, 0.8)',    // Scarlet - Corrosive
          'rgba(40, 167, 69, 0.8)',    // Green - Toxic
          'rgba(255, 193, 7, 0.8)',    // Yellow - Oxidizing
        ],
        borderColor: [
          'rgba(255, 165, 0, 1)',      // Pumpkin - Flammable
          'rgba(220, 53, 69, 1)',      // Scarlet - Corrosive
          'rgba(40, 167, 69, 1)',      // Green - Toxic
          'rgba(255, 193, 7, 1)',      // Yellow - Oxidizing
        ],
        borderWidth: isMobile ? 2 : 3,
        hoverBorderWidth: isMobile ? 3 : 4,
        hoverOffset: isMobile ? 8 : 12,
      }
    ]
  };

  const options = {
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
        },
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
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
      arc: {
        borderWidth: isMobile ? 2 : 3,
        hoverOffset: isMobile ? 8 : 12
      }
    }
  };

  const handleToggle = (type) => {
    setChartType(type);
  };

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>Hazard Classification Distribution</ChartTitle>
        <ToggleContainer>
          <ToggleLabel>Chart Type:</ToggleLabel>
          <Button
            active={chartType === 'doughnut'}
            onClick={() => handleToggle('doughnut')}
            variant="toggle"
            size="small"
          >
            Donut
          </Button>
          <Button
            active={chartType === 'pie'}
            onClick={() => handleToggle('pie')}
            variant="toggle"
            size="small"
          >
            Pie
          </Button>
        </ToggleContainer>
      </ChartHeader>
      <ChartWrapper ref={chartRef}>
        {chartType === 'doughnut' ? (
          <Doughnut data={chartData} options={options} />
        ) : (
          <Pie data={chartData} options={options} />
        )}
      </ChartWrapper>
    </ChartContainer>
  );
};

export default HazardDistributionChart;
