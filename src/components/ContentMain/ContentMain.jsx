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
      
      {/* Temporary test element to verify scrolling */}
      <TestScrollSection>
        <h3>Test Scrolling</h3>
        <p>This is a test element to verify that scrolling is working properly.</p>
        <div style={{ height: '100vh', background: 'linear-gradient(to bottom, #29221d, #473b33)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <h2>Scroll down to see this content!</h2>
        </div>
      </TestScrollSection>
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
`;

const DashboardSection = styled.div`
  width: 100%;
  max-width: 100%;
`;

const MonthlyUsageSection = styled.div`
  width: 100%;
  max-width: 100%;
`;

const DoubleChartSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['4xl']};
  width: 100%;
  max-width: 100%;
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing['4xl']};
  }
`;

const ChartColumn = styled.div`
  width: 100%;
  max-width: 100%;
  
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 50%;
    max-width: 50%;
  }
`;

const ChemicalsSection = styled.div`
  width: 100%;
  max-width: 100%;
`;

const TestScrollSection = styled.div`
  width: 100%;
  max-width: 100%;
  padding: ${({ theme }) => theme.spacing['4xl']};
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-top: ${({ theme }) => theme.spacing['4xl']};
  
  h3 {
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  p {
    color: ${({ theme }) => theme.colors.silverV1};
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  }
`;

export default ContentMain;
