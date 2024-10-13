import * as React from 'react';
import { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, PaletteMode } from '@mui/material/styles';
import ApplicationTopBar from '../partials/ApplicationTopBar';
import Footer from '../partials/Footer';
import getBlogTheme from '../theme/getBlogTheme';

interface PageLayoutProps {
  children: React.ReactNode;
}

// Helper to get cookie value
const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

// Helper to set a cookie
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {

  useEffect(() => {
    if(!document.title){
      document.title = `Easha Sahar`;
    }
  }, []);

  const [mode, setMode] = React.useState<PaletteMode>('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);

  const blogTheme = createTheme(getBlogTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  React.useEffect(() => {
    // const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
    // if (savedMode) {
    //   setMode(savedMode);
    // } else {
    //   const savedModeFromCookie = getCookie('themeMode') as PaletteMode | null;
      
    //   if (savedModeFromCookie) {
    //     setMode(savedModeFromCookie);
    //   } else {
    //     const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //     setMode(systemPrefersDark ? 'dark' : 'light');
    //   }
    // }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  // const toggleCustomTheme = () => {
  //   setShowCustomTheme((prev) => !prev);
  // };

  return (
    <ThemeProvider theme={showCustomTheme ? blogTheme : defaultTheme}>
      <CssBaseline enableColorScheme />
      <ApplicationTopBar mode={mode} toggleColorMode={toggleColorMode} />
      <Container maxWidth="lg" component="main" sx={{ my: 10, gap: 4 }}>
        {children}
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default PageLayout;
