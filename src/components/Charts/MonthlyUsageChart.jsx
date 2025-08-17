import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Bar, Line } from 'react-chartjs-2';
import { Button, LoadingSpinner } from '../UI';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import useSidebarResize from '../../hooks/useSidebarResize';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Styled Components
const ChartContainer = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  min-width: 0;
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding: ${({ theme }) => theme.spacing['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing['3xl']};
    margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing['4xl']};
    margin-bottom: ${({ theme }) => theme.spacing['4xl']};
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    padding: ${({ theme }) => theme.spacing['5xl']};
    margin-bottom: ${({ theme }) => theme.spacing['5xl']};
  }
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
    gap: ${({ theme }) => theme.spacing.md};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
    text-align: center;
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
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
  text-align: left;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    text-align: center;
    flex: none;
    width: 100%;
    margin-bottom: ${({ theme }) => theme.spacing.md};
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
  justify-content: flex-end;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    justify-content: center;
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.md};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.sm};
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.xs};
    flex-wrap: wrap;
    justify-content: center;
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
    height: 400px;
    margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    height: 450px;
    margin-bottom: ${({ theme }) => theme.spacing['4xl']};
  }
  
  /* Ensure Chart.js canvas is responsive */
  canvas {
    width: 100% !important;
    height: 100% !important;
    max-width: 100% !important;
    max-height: 100% !important;
  }
  
  /* Responsive chart container */
  .chartjs-render-monitor {
    width: 100% !important;
    height: 100% !important;
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

const MonthlyUsageChart = ({ data, loading, error }) => {
  const [chartType, setChartType] = useState('line'); // 'line' or 'bar'
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
          <ChartTitle>Monthly Chemical Usage & Incidents</ChartTitle>
        </ChartHeader>
        <LoadingSpinner 
          size="large" 
          color="primary" 
          text="Loading chart data..." 
        />
      </ChartContainer>
    );
  }

  if (error) {
    return (
      <ChartContainer>
        <ChartHeader>
          <ChartTitle>Monthly Chemical Usage & Incidents</ChartTitle>
        </ChartHeader>
        <ErrorContainer>
          Error loading chart data: {error}
        </ErrorContainer>
      </ChartContainer>
    );
  }

  if (!data || !data.reports || !data.reports.monthlyUsage) {
    return (
      <NoDataContainer>
        <div>No monthly usage data available</div>
        <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.7 }}>
          {!data ? 'No data received' : 
           !data.reports ? 'No reports data' : 
           !data.reports.monthlyUsage ? 'No monthly usage data' : 'Unknown error'}
        </div>
        {data && (
          <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.5 }}>
            Available data keys: {Object.keys(data).join(', ')}
            {data.reports && ` | Reports keys: ${Object.keys(data.reports).join(', ')}`}
          </div>
        )}
      </NoDataContainer>
    );
  }

  const monthlyData = data.reports.monthlyUsage;

  const chartData = {
    labels: monthlyData.map(item => item.month),
    datasets: [
      {
        label: 'Chemical Usage (units)',
        data: monthlyData.map(item => item.totalUsage),
        borderColor: 'rgba(255, 165, 0, 1)', // Pumpkin color
        backgroundColor: 'rgba(255, 165, 0, 0.1)', // Pumpkin color with transparency
        borderWidth: isMobile ? 1.5 : 3,
        fill: chartType === 'line',
        tension: chartType === 'line' ? 0.4 : 0,
        pointBackgroundColor: 'rgba(255, 165, 0, 1)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: isMobile ? 1 : 2,
        pointRadius: chartType === 'line' ? (isMobile ? 3 : 6) : 0,
        pointHoverRadius: chartType === 'line' ? (isMobile ? 5 : 8) : 0,
        yAxisID: 'y',
        // Bar chart specific properties
        borderRadius: chartType === 'bar' ? (isMobile ? 2 : 4) : 0,
        borderSkipped: false,
      },
      {
        label: 'Incident Count',
        data: monthlyData.map(item => item.incidentCount),
        borderColor: 'rgba(220, 53, 69, 1)', // Scarlet color
        backgroundColor: 'rgba(220, 53, 69, 0.1)', // Scarlet color with transparency
        borderWidth: isMobile ? 1.5 : 3,
        fill: false,
        tension: chartType === 'line' ? 0.4 : 0,
        pointBackgroundColor: 'rgba(220, 53, 69, 1)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: isMobile ? 1 : 2,
        pointRadius: chartType === 'line' ? (isMobile ? 3 : 6) : 0,
        pointHoverRadius: chartType === 'line' ? (isMobile ? 5 : 8) : 0,
        yAxisID: 'y1',
        // Bar chart specific properties
        borderRadius: chartType === 'bar' ? (isMobile ? 2 : 4) : 0,
        borderSkipped: false,
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
            size: isMobile ? 11 : 14,
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
          size: isMobile ? 11 : 14,
          weight: 'bold'
        },
        bodyFont: {
          size: isMobile ? 10 : 13
        },
        padding: isMobile ? 8 : 12
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
            size: isMobile ? 9 : 12,
            weight: 'bold'
          },
          maxRotation: isMobile ? 45 : 0,
          minRotation: isMobile ? 0 : 0,
          padding: isMobile ? 4 : 8
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: isMobile ? 9 : 12,
            weight: 'bold'
          },
          padding: isMobile ? 4 : 8
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: isMobile ? 9 : 12,
            weight: 'bold'
          },
          padding: isMobile ? 4 : 8
        }
      }
    },
    layout: {
      padding: {
        top: isMobile ? 16 : 32,
        right: isMobile ? 8 : 20,
        bottom: isMobile ? 8 : 20,
        left: isMobile ? 8 : 20
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    elements: {
      point: {
        radius: isMobile ? 2 : 5,
        hoverRadius: isMobile ? 4 : 7
      },
      line: {
        borderWidth: isMobile ? 1.5 : 3
      }
    }
  };

  const handleToggle = (type) => {
    setChartType(type);
  };

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>Monthly Chemical Usage & Incidents</ChartTitle>
        <ToggleContainer>
          <ToggleLabel>Chart Type:</ToggleLabel>
          <Button
            active={chartType === 'line'}
            onClick={() => handleToggle('line')}
            variant="toggle"
            size="small"
          >
            Line Chart
          </Button>
          <Button
            active={chartType === 'bar'}
            onClick={() => handleToggle('bar')}
            variant="toggle"
            size="small"
          >
            Bar Chart
          </Button>
        </ToggleContainer>
      </ChartHeader>
      <ChartWrapper ref={chartRef}>
        {chartType === 'line' ? (
          <Line data={chartData} options={options} />
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </ChartWrapper>
    </ChartContainer>
  );
};

export default MonthlyUsageChart;
