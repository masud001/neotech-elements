import Sidebar from './layout/Sidebar/Sidebar';
import Content from './layout/Content/Content';
import { ThemeProvider, GlobalStyles } from './theme';
import SidebarProvider from './context/SidebarProvider';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <SidebarProvider>
        <div className='app'>
          <Sidebar />
          <Content />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
