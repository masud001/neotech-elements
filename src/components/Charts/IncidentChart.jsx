import React from 'react';
import styled from 'styled-components';
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Styled Components
const ChartContainer = styled.div`
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

const ChartTitle = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0 0 ${({ theme }) => theme.spacing['2xl']} 0;
  text-align: center;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const ChartWrapper = styled.div`
  position: relative;
  height: 300px;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 250px;
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 200px;
  }
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    height: 180px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: ${({ theme }) => theme.colors.silver};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    height: 180px;
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const ErrorContainer = styled.div`
  background: ${({ theme }) => theme.colors.scarletV1};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
  margin: ${({ theme }) => theme.spacing['2xl']} 0;
`;

const NoDataContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['4xl']};
  color: ${({ theme }) => theme.colors.silver};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: ${({ theme }) => theme.spacing['2xl']};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const IncidentChart = ({ data, loading, error }) => {
  if (loading) {
    return (
      <ChartContainer>
        <ChartTitle>Monthly Incident Count</ChartTitle>
        <LoadingContainer>
          Loading chart data...
        </LoadingContainer>
      </ChartContainer>
    );
  }

  if (error) {
    return (
      <ChartContainer>
        <ChartTitle>Monthly Incident Count</ChartTitle>
        <ErrorContainer>
          Error loading chart data: {error}
        </ErrorContainer>
      </ChartContainer>
    );
  }

  if (!data || !data.reports || !data.reports.monthlyUsage) {
    return (
      <ChartContainer>
        <ChartTitle>Monthly Incident Count</ChartTitle>
        <NoDataContainer>
          No incident data available
        </NoDataContainer>
      </ChartContainer>
    );
  }

  const monthlyData = data.reports.monthlyUsage;

  const chartData = {
    labels: monthlyData.map(item => item.month),
    datasets: [
      {
        label: 'Incident Count',
        data: monthlyData.map(item => item.incidentCount),
        backgroundColor: 'rgba(220, 53, 69, 0.8)', // Scarlet color with transparency
        borderColor: 'rgba(220, 53, 69, 1)', // Solid scarlet color
        borderWidth: 2,
        borderRadius: 4,
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
            size: 12,
            weight: 'bold'
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#dc3545',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y} incidents`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)'
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)'
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        title: {
          display: true,
          text: 'Incident Count',
          color: '#ffffff',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    }
  };

  return (
    <ChartContainer>
      <ChartTitle>Monthly Incident Count</ChartTitle>
      <ChartWrapper>
        <Bar data={chartData} options={options} />
      </ChartWrapper>
    </ChartContainer>
  );
};

export default IncidentChart;
