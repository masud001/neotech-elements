# Chemical Safety Dashboard - Setup Instructions

## Project Overview
A fully responsive React.js application that displays a Chemical Safety Dashboard using data from a JSON API. The app features professional charts/graphs, interactive features, and works flawlessly across all devices and browsers.

## Prerequisites
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher
- **Modern Browser**: Chrome, Firefox, or Safari (latest versions)

## Installation Steps

### 1. Clone/Extract Project
```bash
# If using git
git clone <repository-url>
cd chemical-safety-dashboard

# If using ZIP file
# Extract the ZIP file to your desired location
cd chemical-safety-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory (optional):
```bash
# API endpoint (defaults to the provided endpoint if not set)
VITE_API_ENDPOINT=https://api.jsonbin.io/v3/b/68918782f7e7a370d1f4029d
```

### 4. Start Development Server
```bash
npm run dev
```

The application will start on `http://localhost:5173` (or the next available port).

### 5. Build for Production
```bash
npm run build
```

The production build will be created in the `dist/` folder.

## Project Structure
```
chemical-safety-dashboard/
├── src/
│   ├── components/          # React components
│   │   ├── Charts/         # Chart components (Chart.js)
│   │   ├── ChemicalsList/  # Chemical inventory table
│   │   ├── DashboardMetrics/ # Dashboard metrics cards
│   │   ├── ReportModal/    # Report generation modal
│   │   └── UI/            # Reusable UI components
│   ├── context/            # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── layout/             # Layout components
│   ├── theme/              # Styled-components theme
│   └── utils/              # Utility functions
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
└── vite.config.js         # Vite configuration
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:netlify` | Build optimized for Netlify |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint for code quality |

## Dependencies

### Core Dependencies
- **React 19.1.1** - Modern React with latest features
- **Chart.js 4.5.0** - Professional charting library
- **react-chartjs-2 5.3.0** - React wrapper for Chart.js
- **styled-components 6.1.19** - CSS-in-JS styling solution

### Development Dependencies
- **Vite 5.4.19** - Fast build tool and dev server
- **ESLint 9.33.0** - Code quality and consistency

## Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full Support |
| Firefox | 88+ | ✅ Full Support |
| Safari | 14+ | ✅ Full Support |
| Edge | 90+ | ✅ Full Support |

## Features

### ✅ Implemented Features
- **Dashboard Metrics**: Key performance indicators
- **Chemical Inventory**: Searchable chemical list with hazard information
- **Monthly Usage Charts**: Line/Bar chart toggle with incident tracking
- **Hazard Distribution**: Pie/Donut chart visualization
- **Compliance Tracking**: Regional compliance with progress bars
- **Report Generation**: Comprehensive modal with all data
- **Responsive Design**: Mobile-first approach
- **Sidebar Navigation**: Collapsible navigation menu

### 🎯 Mandatory Requirements Met
- ✅ List of Chemicals with required fields
- ✅ Summary Dashboard Metrics
- ✅ Monthly Chemical Usage Chart
- ✅ Hazard Classification Distribution Chart
- ✅ Compliance Tracking Across Regions
- ✅ Generate Report Modal
- ✅ Responsive Design
- ✅ Cross-browser Compatibility

## Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# If port 5173 is busy, Vite will automatically use the next available port
# Check the terminal output for the actual URL
```

#### 2. API Connection Issues
- The app includes fallback to local data if the API is unavailable
- Check your internet connection
- Verify the API endpoint is accessible

#### 3. Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 4. Chart Rendering Issues
- Ensure the browser supports modern JavaScript features
- Check browser console for any JavaScript errors
- Verify that all dependencies are properly installed

### Performance Tips
- Use the production build (`npm run build`) for testing performance
- The app includes lazy loading for optimal performance
- Charts are optimized with resize observers and memoization

## Testing the Application

### 1. Basic Functionality
- ✅ Dashboard loads with metrics
- ✅ Charts render correctly
- ✅ Chemical list displays data
- ✅ Report modal opens and displays data

### 2. Responsive Testing
- ✅ Desktop layout (1200px+)
- ✅ Tablet layout (768px - 1199px)
- ✅ Mobile layout (< 768px)

### 3. Interactive Features
- ✅ Sidebar toggle
- ✅ Chart type switching
- ✅ Report generation
- ✅ Search functionality

## Deployment

### Netlify (Recommended)
```bash
npm run build:netlify
# Upload dist/ folder to Netlify
```

### Other Platforms
```bash
npm run build
# Upload dist/ folder to your hosting platform
```

## Support

If you encounter any issues during setup or testing:
1. Check the browser console for error messages
2. Verify all dependencies are installed correctly
3. Ensure you're using the required Node.js version
4. Check that the API endpoint is accessible

## Final Notes

This application demonstrates:
- **Modern React Development**: Using latest React 19 features
- **Professional UI/UX**: Clean, intuitive interface
- **Performance Optimization**: Lazy loading, memoization, optimized charts
- **Cross-browser Compatibility**: Works on all major browsers
- **Responsive Design**: Mobile-first approach
- **Code Quality**: Clean, maintainable, well-structured code

The application is production-ready and meets all specified requirements for the Chemical Safety Dashboard project.
