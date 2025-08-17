import React from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '../../components/UI';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: #1e1611;
  position: relative;
  z-index: ${({ theme }) => theme?.zIndex?.loading || 999};
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-align: center;

  @media (max-width: 768px) {
    padding: 20px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 480px;
  width: 100%;
`;

const LoadingFallback = () => (
  <Wrapper role="alert" aria-live="polite">
    <Inner>
      <LoadingSpinner
        size="large"
        color="primary"
        text="Loading Chemical Safety Dashboard..."
      />
    </Inner>
  </Wrapper>
);

export default React.memo(LoadingFallback);