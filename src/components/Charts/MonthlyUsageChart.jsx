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
  /* Prevent layout shift */
  contain: layout style paint;
  /* Ensure consistent dimensions */
  min-height: 400px;
  height: auto;
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding: ${({ theme }) => theme.spacing['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
    min-height: 450px;
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing['3xl']};
    margin-bottom: ${({ theme }) => theme.spacing['3xl']};
    min-height: 500px;
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing['4xl']};
    margin-bottom: ${({ theme }) => theme.spacing['4xl']};
    min-height: 550px;
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    padding: ${({ theme }) => theme.spacing['5xl']};
    margin-bottom: ${({ theme }) => theme.spacing['5xl']};
    min-height: 600px;
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
  
  /* Prevent layout shift - consistent header height */
  min-height: 4rem;
  height: 4rem;
  
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
    /* Maintain consistent height even in column layout */
    min-height: 6rem;
    height: 6rem;
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
  
  /* Prevent layout shift - consistent title dimensions */
  min-height: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    text-align: center;
    flex: none;
    width: 100%;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    justify-content: center;
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
  
  /* Prevent layout shift - consistent toggle container dimensions */
  min-height: 2.5rem;
  height: 2.5rem;
  
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
  
  /* Prevent layout shift - consistent label dimensions */
  min-height: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  
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
  min-height: 300px;
  box-sizing: border-box;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  /* Prevent layout shift */
  contain: layout style paint;
  /* Ensure consistent dimensions */
  /* Smooth transitions to prevent layout shift */
  transition: opacity 0.3s ease-in-out;
  
  /* Prevent layout shift during chart type changes */
  &.chart-loading,
  &.chart-error {
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.primaryLight};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
  
  /* Prevent layout shift when chart is not ready */
  &.chart-not-ready {
    background: ${({ theme }) => theme.colors.primaryLight};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 350px;
    min-height: 350px;
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 400px;
    min-height: 400px;
    margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    height: 450px;
    min-height: 450px;
    margin-bottom: ${({ theme }) => theme.spacing['4xl']};
  }
  
  /* Prevent layout shift for Chart.js canvas */
  canvas {
    width: 100% !important;
    height: 100% !important;
    max-width: 100% !important;
    max-height: 100% !important;
    /* Prevent layout shift */
    contain: layout style paint;
    /* Optimize rendering */
    will-change: auto;
    /* Smooth transitions */
    transition: opacity 0.3s ease-in-out;
  }
  
  /* Responsive chart container */
  .chartjs-render-monitor {
    width: 100% !important;
    height: 100% !important;
    /* Prevent layout shift */
    contain: layout style paint;
    /* Smooth transitions */
    transition: opacity 0.3s ease-in-out;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.silverV1};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  /* Prevent layout shift - match chart wrapper height */
  min-height: 300px;
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 350px;
    min-height: 350px;
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 400px;
    min-height: 400px;
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    height: 450px;
    min-height: 450px;
  }
`;

const ErrorContainer = styled.div`
  background: ${({ theme }) => theme.colors.scarletV1};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
  margin: ${({ theme }) => theme.spacing['2xl']} 0;
  
  /* Prevent layout shift - match chart wrapper height */
  height: 300px;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  
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
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 350px;
    min-height: 350px;
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 400px;
    min-height: 400px;
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    height: 450px;
    min-height: 450px;
  }
`;

const NoDataContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['4xl']};
  color: ${({ theme }) => theme.colors.silverV1};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  
  /* Prevent layout shift - match chart wrapper height */
  height: 300px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
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
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 350px;
    min-height: 350px;
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 400px;
    min-height: 400px;
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    height: 450px;
    min-height: 450px;
  }
`;

const MonthlyUsageChart = ({ data, loading, error }) => {
  const [chartType, setChartType] = useState('line'); // 'line' or 'bar'
  const [isMobile, setIsMobile] = useState(false);
  const [chartReady, setChartReady] = useState(false);
  
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

  // Mark chart as ready after initial render
  useEffect(() => {
    if (!loading && !error && data) {
      const timer = setTimeout(() => {
        setChartReady(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [loading, error, data]);

  if (loading) {
    return (
      <ChartContainer>
        <ChartHeader>
          <ChartTitle>Monthly Chemical Usage & Incidents</ChartTitle>
        </ChartHeader>
        <ChartWrapper ref={chartRef} className="chart-loading">
          <LoadingSpinner 
            size="large" 
            color="primary" 
            text="Loading chart data..." 
          />
        </ChartWrapper>
      </ChartContainer>
    );
  }

  if (error) {
    return (
      <ChartContainer>
        <ChartHeader>
          <ChartTitle>Monthly Chemical Usage & Incidents</ChartTitle>
        </ChartHeader>
        <ChartWrapper ref={chartRef} className="chart-error">
          <ErrorContainer>
            Error loading chart data: {error}
          </ErrorContainer>
        </ChartWrapper>
      </ChartContainer>
    );
  }

  if (!data || !data.reports || !data.reports.monthlyUsage) {
    return (
      <ChartContainer>
        <ChartHeader>
          <ChartTitle>Monthly Chemical Usage & Incidents</ChartTitle>
        </ChartHeader>
        <ChartWrapper ref={chartRef} className="chart-error">
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
        </ChartWrapper>
      </ChartContainer>
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
    /* Prevent layout shift during chart rendering */
    animation: {
      duration: 300,
      easing: 'easeOutQuart'
    },
    /* Prevent layout shift during chart updates */
    transitions: {
      active: {
        animation: {
          duration: 300
        }
      },
      /* Prevent layout shift during chart type changes */
      resize: {
        animation: {
          duration: 0
        }
      },
      /* Prevent layout shift during data updates */
      show: {
        animations: {
          x: {
            from: 0
          },
          y: {
            from: 0
          }
        }
      }
    },
    /* Optimize chart rendering */
    elements: {
      point: {
        radius: isMobile ? 2 : 5,
        hoverRadius: isMobile ? 4 : 7
      },
      line: {
        borderWidth: isMobile ? 1.5 : 3
      }
    },
    /* Prevent layout shift during legend changes */
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
          padding: isMobile ? 8 : 8
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
    }
  };

  const handleToggle = (type) => {
    // Prevent layout shift by maintaining chart dimensions
    if (chartRef.current && chartRef.current.chartInstance) {
      const currentChart = chartRef.current.chartInstance;
      
      // Store current dimensions
      const currentWidth = currentChart.width;
      const currentHeight = currentChart.height;
      
      // Update chart type
      setChartType(type);
      
      // Force immediate resize to prevent layout shift
      setTimeout(() => {
        if (chartRef.current && chartRef.current.chartInstance) {
          const newChart = chartRef.current.chartInstance;
          newChart.resize();
          
          // Ensure consistent dimensions
          if (newChart.width !== currentWidth || newChart.height !== currentHeight) {
            newChart.resize();
          }
        }
      }, 50);
    } else {
      setChartType(type);
    }
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
      <ChartWrapper 
        ref={chartRef} 
        className={`responsive-element ${!chartReady ? 'chart-not-ready' : ''}`}
      >
        {chartType === 'line' ? (
          <Line 
            data={chartData} 
            options={options}
            style={{
              opacity: chartReady ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
          />
        ) : (
          <Bar 
            data={chartData} 
            options={options}
            style={{
              opacity: chartReady ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
          />
        )}
      </ChartWrapper>
    </ChartContainer>
  );
};

export default MonthlyUsageChart;
