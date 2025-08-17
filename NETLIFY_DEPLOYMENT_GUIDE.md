# Netlify Deployment Guide

## 🚀 Overview

This guide will help you deploy your Chemical Safety Dashboard to Netlify smoothly. The app is configured to work with API calls and includes all necessary configuration files for production deployment.

## 📋 Prerequisites

- [Netlify account](https://netlify.com) (free tier available)
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- Node.js 18+ (configured in netlify.toml)

## 🔧 Configuration Files Created

### **1. Environment Variables**
- `.env` - Local environment variables (not committed to Git)
- `env.example` - Example environment file for reference

### **2. Netlify Configuration**
- `netlify.toml` - Main Netlify configuration
- `public/_redirects` - SPA routing redirects
- `public/_headers` - Security and performance headers

### **3. Build Configuration**
- `vite.config.js` - Vite build configuration
- `package.json` - Build scripts and dependencies

## 🌐 Environment Variables

### **Required Variables**
```bash
VITE_API_ENDPOINT=https://api.jsonbin.io/v3/b/68918782f7e7a370d1f4029d
VITE_APP_NAME=Chemical Safety Dashboard
VITE_APP_VERSION=1.0.0
NODE_ENV=production
```

### **How They're Used**
```jsx
// In useChemicalData.js
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://api.jsonbin.io/v3/b/68918782f7e7a370d1f4029d';
```

## 📱 Deployment Steps

### **Step 1: Push to Git Repository**
```bash
# Make sure all files are committed
git add .
git commit -m "Add Netlify deployment configuration"
git push origin main
```

### **Step 2: Connect to Netlify**

1. **Login to Netlify** and click "New site from Git"
2. **Choose your Git provider** (GitHub, GitLab, or Bitbucket)
3. **Select your repository** (chemical-safety-dashboard)
4. **Configure build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: (leave empty)

### **Step 3: Set Environment Variables**

In Netlify dashboard, go to **Site settings > Environment variables**:

```bash
# Production
VITE_API_ENDPOINT = https://api.jsonbin.io/v3/b/68918782f7e7a370d1f4029d
VITE_APP_NAME = Chemical Safety Dashboard
VITE_APP_VERSION = 1.0.0
NODE_ENV = production

# Deploy Preview (optional)
VITE_API_ENDPOINT = https://api.jsonbin.io/v3/b/68918782f7e7a370d1f4029d
VITE_APP_NAME = Chemical Safety Dashboard (Preview)
VITE_APP_VERSION = 1.0.0
NODE_ENV = production

# Branch Deploy (optional)
VITE_API_ENDPOINT = https://api.jsonbin.io/v3/b/68918782f7e7a370d1f4029d
VITE_APP_NAME = Chemical Safety Dashboard (Branch)
VITE_APP_VERSION = 1.0.0
NODE_ENV = production
```

### **Step 4: Deploy**

1. **Click "Deploy site"**
2. **Wait for build** (usually 2-5 minutes)
3. **Check build logs** for any errors
4. **Visit your live site** when deployment completes

## 🔍 Build Configuration

### **Vite Configuration**
```js
// vite.config.js
export default defineConfig({
  plugins: [react()],
  // Vite automatically handles environment variables
  // All VITE_* variables are available in the browser
})
```

### **Package.json Scripts**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## 🛡️ Security & Performance

### **Headers Configured**
- **Security**: XSS protection, frame options, content type validation
- **Performance**: Cache control for static assets
- **Privacy**: Referrer policy, permissions policy

### **Redirects**
- **SPA Support**: All routes redirect to index.html
- **404 Handling**: Proper fallback for client-side routing

## 🚨 Troubleshooting

### **Common Issues**

#### **1. Build Fails**
```bash
# Check build logs in Netlify
# Common causes:
# - Missing dependencies
# - Environment variables not set
# - Node.js version mismatch
```

#### **2. API Calls Fail**
```bash
# Verify environment variables are set correctly
# Check API endpoint is accessible
# Ensure CORS is configured properly
```

#### **3. Routing Issues**
```bash
# Verify _redirects file is in public/ folder
# Check netlify.toml redirects configuration
# Ensure SPA routing is working
```

### **Debug Commands**
```bash
# Test build locally
npm run build

# Preview build
npm run preview

# Check environment variables
echo $VITE_API_ENDPOINT
```

## 🔄 Continuous Deployment

### **Automatic Deploys**
- **Main branch**: Deploys to production
- **Pull requests**: Creates deploy previews
- **Other branches**: Creates branch deploys

### **Deploy Triggers**
- **Push to main**: Automatic production deploy
- **Pull request**: Automatic preview deploy
- **Manual deploy**: Available in dashboard

## 📊 Monitoring & Analytics

### **Netlify Analytics**
- **Page views**: Track user engagement
- **Performance**: Monitor load times
- **Errors**: Catch deployment issues

### **Custom Analytics**
```jsx
// Add Google Analytics or other tracking
// Environment variables available:
console.log(import.meta.env.VITE_APP_NAME);
console.log(import.meta.env.VITE_APP_VERSION);
```

## 🎯 Post-Deployment Checklist

- [ ] **Site loads correctly** at Netlify URL
- [ ] **API calls work** (check browser console)
- [ ] **Navigation works** (test all routes)
- [ ] **Charts render** (verify data loading)
- [ ] **Responsive design** (test on mobile)
- [ ] **Environment variables** are set correctly
- **Custom domain** (optional - configure in Netlify)

## 🌟 Advanced Features

### **Branch Deploys**
- **Feature branches**: Test before merging
- **Staging environment**: Separate from production
- **A/B testing**: Deploy different versions

### **Form Handling**
```jsx
// If you add forms later, Netlify can handle them
// Just add netlify attribute to forms
<form name="contact" netlify>
  {/* form fields */}
</form>
```

### **Functions (Serverless)**
```js
// If you need backend functionality
// Create functions/ folder for Netlify Functions
exports.handler = async (event, context) => {
  // Your serverless function code
};
```

## 🎉 Success!

Once deployed, your Chemical Safety Dashboard will be:
- **Live on the web** with a Netlify URL
- **Automatically updated** on every push to main
- **Secure and performant** with configured headers
- **API-enabled** with proper environment variables
- **Mobile-responsive** and accessible worldwide

## 🔗 Useful Links

- [Netlify Documentation](https://docs.netlify.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Deployment](https://create-react-app.dev/docs/deployment/)
- [Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

## 📞 Support

If you encounter issues:
1. **Check Netlify build logs** for errors
2. **Verify environment variables** are set correctly
3. **Test locally** with `npm run build && npm run preview`
4. **Check Netlify status** at [status.netlify.com](https://status.netlify.com)

Your Chemical Safety Dashboard is now ready for production deployment! 🚀✨
