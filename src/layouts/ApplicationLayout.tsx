import * as React from 'react';
import {
  createTheme,
  ThemeProvider,
  PaletteMode,
  styled,
} from '@mui/material/styles';
import { SelectChangeEvent } from '@mui/material/Select';
import AppBar from '@mui/material/AppBar';
import getBlogTheme from '../theme/getBlogTheme';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  backgroundImage: 'none',
  zIndex: theme.zIndex.drawer + 1,
  flex: '0 0 auto',
}));

interface ApplicationLayoutProps {
  showCustomTheme: boolean;
  toggleCustomTheme: (theme: boolean) => void;
  mode: PaletteMode;
  toggleColorMode: () => void;
  children: React.ReactNode;
}

export default function ApplicationLayout({
  showCustomTheme,
  toggleCustomTheme,
  mode,
  toggleColorMode,
  children,
}: ApplicationLayoutProps) {
  const handleChange = (event: SelectChangeEvent) => {
    toggleCustomTheme(event.target.value === 'custom');
  };
  const blogTheme = createTheme(getBlogTheme(mode));

  return (
    <ThemeProvider theme={blogTheme}>
        {children}
    </ThemeProvider>
  );
}