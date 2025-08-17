import React, { useEffect, useRef, useCallback, memo, useMemo } from "react";
import styled from "styled-components";
import DashboardMetrics from "../DashboardMetrics/DashboardMetrics";
import ChemicalsList from "../ChemicalsList/ChemicalsList";
import { MonthlyUsageChart, HazardDistributionChart, ComplianceTrackingChart } from "../Charts";
import { useChemicalData } from "../../hooks/useChemicalData";
import { useSidebar } from "../../context/SidebarContext";

const ContentMain = memo(() => {
  const { data, loading, error } = useChemicalData();
  const { isSidebarOpen } = useSidebar();
  const containerRef = useRef(null);

  // Optimized resize handler with useCallback
  const handleResize = useCallback(() => {
    // Trigger window resize event to update all charts
    window.dispatchEvent(new Event('resize'));
  }, []);

  // Handle container resize for charts with optimized ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [handleResize]);

  // Optimized chart resize when sidebar toggles
  useEffect(() => {
    // Single optimized resize event with proper timing
    const timer = setTimeout(() => {
      handleResize();
    }, 150); // Reduced from multiple timers to single optimized timer
    
    return () => clearTimeout(timer);
  }, [isSidebarOpen, handleResize]);

  // Memoize sections to prevent unnecessary re-renders
  const dashboardSection = useMemo(() => (
    <DashboardSection>
      <DashboardMetrics data={data} loading={loading} error={error} />
    </DashboardSection>
  ), [data, loading, error]);

  const monthlyUsageSection = useMemo(() => (
    <MonthlyUsageSection>
      <MonthlyUsageChart data={data} loading={loading} error={error} />
    </MonthlyUsageSection>
  ), [data, loading, error]);

  const chartsSection = useMemo(() => (
    <DoubleChartSection>
      <ChartColumn>
        <HazardDistributionChart data={data} loading={loading} error={error} />
      </ChartColumn>
      <ChartColumn>
        <ComplianceTrackingChart data={data} loading={loading} error={error} />
      </ChartColumn>
    </DoubleChartSection>
  ), [data, loading, error]);

  const chemicalsSection = useMemo(() => (
    <ChemicalsSection>
      <ChemicalsList data={data} loading={loading} error={error} />
    </ChemicalsSection>
  ), [data, loading, error]);

  return (
    <MainContentHolder ref={containerRef} className='main-content-holder'>
      {dashboardSection}
      {monthlyUsageSection}
      {chartsSection}
      {chemicalsSection}
    </MainContentHolder>
  );
});

ContentMain.displayName = 'ContentMain';

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
