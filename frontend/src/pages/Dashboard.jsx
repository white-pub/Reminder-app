import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListIcon from '@mui/icons-material/List';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core';
import { DashboardLayout } from '@toolpad/core';
import CalendarPage from '../components/CalendarPage';
import RemindersPage from '../components/RemindersPage';
import HeaderMain from '../components/HeaderMain';

const NAVIGATION = [
  {
    segment: 'calendar',
    title: 'Calendar',
    icon: <CalendarMonthIcon />,
  },
  {
    segment: 'list',
    title: 'List of Reminders',
    icon: <ListIcon />,
  },
];

const Theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: true,
    dark: {
      palette: {
        primary: {
          main: '#90caf9',
        },
        secondary: {
          main: '#f48fb1',
        },
        background: {
          default: '#0d1117',
          paper: '#0d1117',
        },
        text: {
          primary: '#ffffff',
          secondary: '#b0bec5',
        },
      },
    },
  },
});

function PageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <HeaderMain />
      {pathname === '/calendar' ? (
        <CalendarPage />
      ) : pathname === '/list' ? (
        <RemindersPage />
      ) : (
        <Typography sx={{ paddingTop: '20px' }}>Dashboard content for {pathname}</Typography>
      )}
    </Box>
  );
}

PageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardNavigation({ setPathname }) {
  return (
    <MenuList>
      {NAVIGATION.map((item) => (
        <MenuItem
          key={item.segment}
          onClick={() => setPathname(`/${item.segment}`)}
          selected={window.location.pathname.endsWith(item.segment)} // Highlight the active menu
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText>{item.title}</ListItemText>
        </MenuItem>
      ))}
    </MenuList>
  );
}

DashboardNavigation.propTypes = {
  setPathname: PropTypes.func.isRequired,
};

export default function DashboardLayoutAccountSidebar(props) {
  const { window } = props;
  const [pathname, setPathname] = React.useState('/calendar'); // Set default to '/calendar'

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const Window = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={Theme}
      window={Window}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: () => null,
          sidebarFooter: () => <DashboardNavigation setPathname={setPathname} />,
        }}
      >
        <PageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}