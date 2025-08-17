import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import DashboardMetrics from "../DashboardMetrics/DashboardMetrics";
import ChemicalsList from "../ChemicalsList/ChemicalsList";
import { MonthlyUsageChart, HazardDistributionChart, ComplianceTrackingChart } from "../Charts";
import { useChemicalData } from "../../hooks/useChemicalData";
import { useSidebar } from "../../context/SidebarContext";

const ContentMain = () => {
  const { data, loading, error } = useChemicalData();
  const { isSidebarOpen } = useSidebar();
  const containerRef = useRef(null);

  // Handle container resize for charts
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      // Trigger window resize event to update all charts
      window.dispatchEvent(new Event('resize'));
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Trigger chart resize when sidebar toggles
  useEffect(() => {
    // Multiple resize events to ensure charts update properly
    const timer1 = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
    const timer2 = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
    
    const timer3 = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isSidebarOpen]);

  return (
    <MainContentHolder ref={containerRef} className='main-content-holder'>
      <DashboardSection>
        <DashboardMetrics data={data} loading={loading} error={error} />
      </DashboardSection>
      
      <MonthlyUsageSection>
        <MonthlyUsageChart data={data} loading={loading} error={error} />
      </MonthlyUsageSection>
      
      <DoubleChartSection>
        <ChartColumn>
          <HazardDistributionChart data={data} loading={loading} error={error} />
        </ChartColumn>
        <ChartColumn>
          <ComplianceTrackingChart data={data} loading={loading} error={error} />
        </ChartColumn>
      </DoubleChartSection>
      
      <ChemicalsSection>
        <ChemicalsList data={data} loading={loading} error={error} />
      </ChemicalsSection>
      
    </MainContentHolder>
  );
};

// Styled Components
const MainContentHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  /* Prevent layout shift */
  contain: layout style paint;
  will-change: auto;
  
  /* Ensure consistent dimensions */
  min-height: 100vh;
`;

const DashboardSection = styled.div`
  width: 100%;
  max-width: 100%;
  
  /* Prevent layout shift */
  contain: layout style paint;
  
  /* Ensure consistent dimensions */
  min-height: 200px;
`;

const MonthlyUsageSection = styled.div`
  width: 100%;
  max-width: 100%;
  
  /* Prevent layout shift */
  contain: layout style paint;
  
  /* Ensure consistent dimensions */
  min-height: 400px;
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 500px;
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 550px;
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    min-height: 600px;
  }
`;

const DoubleChartSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xl']};
  width: 100%;
  max-width: 100%;
  
  /* Prevent layout shift */
  contain: layout style paint;
  
  /* Ensure consistent dimensions */
  min-height: 400px;
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 500px;
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 550px;
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    min-height: 600px;
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
  }
`;

const ChartColumn = styled.div`
  flex: 1;
  width: 100%;
  max-width: 100%;
  
  /* Prevent layout shift */
  contain: layout style paint;
  
  /* Ensure consistent dimensions */
  min-height: 400px;
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 500px;
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 550px;
  }
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    min-height: 600px;
  }
`;

const ChemicalsSection = styled.div`
  width: 100%;
  max-width: 100%;
  
  /* Prevent layout shift */
  contain: layout style paint;
  
  /* Ensure consistent dimensions */
  min-height: 300px;
`;

export default ContentMain;
