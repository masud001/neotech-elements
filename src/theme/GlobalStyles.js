import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  /* Performance optimizations */
  html {
    scroll-behavior: smooth;
    /* Prevent layout shift */
    scrollbar-gutter: stable;
    /* Ensure proper height */
    height: 100%;
    /* Prevent font-based layout shift */
    font-display: swap;
  }

  /* Font loading optimizations */
  @font-face {
    font-family: 'Bai Jamjuree';
    font-display: swap;
    font-style: normal;
    font-weight: 400;
  }

  /* Prevent layout shift for all elements */
  * {
    /* Optimize rendering */
    will-change: auto;
  }

  /* Apply containment only to specific elements that need it */
  .chart-container, .chart-wrapper, .chart-loading, .chart-error,
  .dynamic-content, .sidebar-transition, .responsive-element {
    /* Prevent layout shift */
    contain: layout style paint;
    /* Optimize rendering */
    will-change: auto;
  }

  /* Specific optimizations for text elements */
  h1, h2, h3, h4, h5, h6, p, span, div, button, input, textarea, label {
    /* Prevent font-based layout shift */
    font-display: swap;
    /* Ensure consistent text rendering */
    text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.white};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    /* Prevent layout shift */
    margin: 0;
    padding: 0;
    /* Optimize for performance */
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* Ensure body handles all scrolling */
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
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

  /* Prevent layout shift for images */
  img {
    max-width: 100%;
    height: auto;
    /* Prevent layout shift */
    aspect-ratio: attr(width) / attr(height);
    /* Optimize rendering */
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }

  /* Optimize image containers */
  .img-fit-cover {
    position: relative;
    overflow: hidden;
    /* Prevent layout shift */
    aspect-ratio: 1;
  }

  .img-fit-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Prevent layout shift */
    position: absolute;
    top: 0;
    left: 0;
  }

  /* Performance-optimized utility classes */
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

  /* Layout optimizations */
  .app {
    display: flex;
    min-height: 100vh;
    /* Optimize for performance */
    will-change: auto;
    /* Remove conflicting scroll properties - let body handle scrolling */
    /* overflow: hidden; */
  }

  /* Performance-optimized component classes */
  .lg-value {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    /* Prevent layout shift */
    line-height: 1.2;
  }

  .grid-common {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing['4xl']};
    /* Optimize rendering */
    will-change: auto;
  }

  .grid-c-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
    /* Prevent layout shift */
    min-height: 2.5rem;
  }

  .grid-c-title-text {
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.silver};
    /* Prevent layout shift */
    line-height: 1.2;
  }

  .grid-c-title-icon img {
    width: ${({ theme }) => theme.spacing['4xl']};
    height: ${({ theme }) => theme.spacing['4xl']};
    /* Prevent layout shift */
    aspect-ratio: 1;
  }

  /* Performance-optimized responsive design */
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    .grid-common {
      padding: ${({ theme }) => theme.spacing['2xl']};
    }
    
    body {
      font-size: ${({ theme }) => theme.typography.fontSize.sm} !important;
    }
  }

  /* Performance-optimized scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    /* Prevent layout shift */
    background: transparent;
  }

  ::-webkit-scrollbar-track {
    box-shadow: ${({ theme }) => theme.shadows.scrollbar};
    border-radius: 18px;
    /* Prevent layout shift */
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.pumpkin};
    border-radius: 18px;
    /* Prevent layout shift */
    border: 1px solid transparent;
    background-clip: content-box;
  }

  /* Firefox scrollbar */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.pumpkin} transparent;
  }

  /* Performance-optimized selection */
  ::selection {
    background-color: ${({ theme }) => theme.colors.pumpkin};
    color: ${({ theme }) => theme.colors.white};
  }

  /* Performance-optimized chart responsiveness */
  .chartjs-render-monitor {
    /* Optimize transitions */
    transition: opacity 0.3s ease-in-out;
    /* Prevent layout shift */
    contain: layout style paint;
    /* Ensure consistent dimensions */
    width: 100% !important;
    height: 100% !important;
    /* Optimize rendering */
    will-change: auto;
  }
  
  /* Performance-optimized chart containers */
  .chart-container {
    /* Optimize transitions */
    transition: opacity 0.3s ease-in-out;
    /* Prevent layout shift */
    contain: layout style paint;
    /* Optimize rendering */
    will-change: auto;
    /* Ensure consistent dimensions */
    min-height: 300px;
    height: auto;
  }
  
  /* Performance-optimized canvas elements */
  canvas {
    /* Optimize transitions */
    transition: opacity 0.3s ease-in-out;
    /* Prevent layout shift */
    contain: layout style paint;
    /* Optimize rendering */
    will-change: auto;
    /* Ensure consistent dimensions */
    width: 100% !important;
    height: 100% !important;
    max-width: 100% !important;
    max-height: 100% !important;
  }
  
  /* Performance-optimized main content charts */
  .main-content canvas {
    /* Optimize transitions */
    transition: opacity 0.3s ease-in-out !important;
    /* Prevent layout shift */
    contain: layout style paint;
    /* Optimize rendering */
    will-change: auto;
    /* Ensure consistent dimensions */
    width: 100% !important;
    height: 100% !important;
  }
  
  /* Performance-optimized chart containers during sidebar toggle */
  .main-content .chart-container {
    /* Optimize transitions */
    transition: opacity 0.3s ease-in-out !important;
    /* Prevent layout shift */
    contain: layout style paint;
    /* Optimize rendering */
    will-change: auto;
    /* Ensure consistent dimensions */
    min-height: 300px;
    height: auto;
  }

  /* Chart loading states to prevent layout shift */
  .chart-loading {
    /* Prevent layout shift during loading */
    contain: layout style paint;
    /* Ensure consistent dimensions */
    min-height: 300px;
    height: auto;
    /* Show loading state */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Chart error states to prevent layout shift */
  .chart-error {
    /* Prevent layout shift during error */
    contain: layout style paint;
    /* Ensure consistent dimensions */
    min-height: 300px;
    height: auto;
    /* Show error state */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Performance optimizations for mobile */
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    /* Optimize images for mobile */
    img {
      content-visibility: auto;
      contain-intrinsic-size: 1px 5000px;
    }
    
    /* Optimize charts for mobile */
    .chart-container {
      content-visibility: auto;
      contain-intrinsic-size: 1px 300px;
    }
  }

  /* Critical CSS optimizations */
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    /* Optimize font loading */
    body {
      font-display: swap;
    }
    
    /* Ensure chart containers maintain dimensions */
    .chart-container, .chart-wrapper {
      min-height: 250px !important;
      height: auto !important;
    }
  }

  /* Prevent layout shift during font loading */
  .fonts-loading {
    /* Use fallback font to prevent layout shift */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
  }

  .fonts-loaded {
    /* Apply custom font when loaded */
    font-family: 'Bai Jamjuree', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
  }

  /* Prevent layout shift for dynamic content */
  .dynamic-content {
    /* Prevent layout shift during content changes */
    contain: layout style paint;
    /* Ensure consistent dimensions */
    min-height: 100px;
    height: auto;
    /* Optimize transitions */
    transition: opacity 0.2s ease-in-out;
  }

  /* Optimize sidebar transitions to prevent chart layout shift */
  .sidebar-transition {
    /* Prevent layout shift during sidebar transitions */
    contain: layout style paint;
    /* Optimize transitions */
    transition: width 0.3s ease-in-out, transform 0.3s ease-in-out;
    /* Ensure consistent dimensions */
    will-change: width, transform;
  }

  /* Prevent layout shift for responsive elements */
  .responsive-element {
    /* Prevent layout shift during responsive changes */
    contain: layout style paint;
    /* Ensure consistent dimensions */
    min-width: 0;
    min-height: 0;
    /* Optimize rendering */
    will-change: auto;
  }

  /* Ensure root element allows scrolling */
  #root {
    /* Allow scrolling */
    min-height: 100vh;
    /* Ensure proper layout */
    display: flex;
    flex-direction: column;
  }

  /* Print styles */
  @media print {
    * {
      background: transparent !important;
      color: black !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }
  }
`;

export default GlobalStyles;
