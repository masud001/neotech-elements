import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.white};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  }

  ul {
    list-style-type: none;
  }

  a {
    color: unset;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white};
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .img-fit-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Utility Classes */
  .text-white {
    color: ${({ theme }) => theme.colors.white};
  }

  .text-silver-v1 {
    color: ${({ theme }) => theme.colors.silverV1};
  }

  .text-scarlet {
    color: ${({ theme }) => theme.colors.scarlet};
  }

  .text-green {
    color: ${({ theme }) => theme.colors.green};
  }

  .bg-jet {
    background: ${({ theme }) => theme.colors.jet};
  }

  .text-sm {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }

  /* Layout Classes */
  .app {
    display: flex;
    min-height: 100vh;
  }

  /* Common Component Classes */
  .lg-value {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .grid-common {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing['4xl']};
  }

  .grid-c-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  }

  .grid-c-title-text {
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.silver};
  }

  .grid-c-title-icon img {
    width: ${({ theme }) => theme.spacing['4xl']};
  }

  /* Responsive Design */
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    .grid-common {
      padding: ${({ theme }) => theme.spacing['2xl']};
    }
    
    body {
      font-size: ${({ theme }) => theme.typography.fontSize.sm} !important;
    }
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: ${({ theme }) => theme.shadows.scrollbar};
    border-radius: 18px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.pumpkin};
    border-radius: 18px;
  }



  /* Selection */
  ::selection {
    background-color: ${({ theme }) => theme.colors.pumpkin};
    color: ${({ theme }) => theme.colors.white};
  }

  /* Smooth Scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Print Styles */
  @media print {
    * {
      background: transparent !important;
      color: black !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }
  }

  /* Chart responsiveness */
  .chartjs-render-monitor {
    transition: all 0.3s ease-in-out;
  }
  
  /* Smooth chart container transitions */
  .chart-container {
    transition: all 0.3s ease-in-out;
  }
  
  /* Ensure charts maintain aspect ratio during resize */
  canvas {
    transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
  }
  
  /* Additional chart resizing support */
  .main-content canvas {
    transition: all 0.3s ease-in-out !important;
    will-change: width, height;
  }
  
  /* Force chart updates during sidebar toggle */
  .main-content .chart-container {
    transition: all 0.3s ease-in-out !important;
    will-change: width, height;
  }
`;

export default GlobalStyles;
