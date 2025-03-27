import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { createTheme } from '@mui/material/styles';

const DEMO_THEME = createTheme({
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function HeaderMain() {
  return (
    <Box sx={{ paddingTop: '0px', width: '100%', bgcolor: 'background.paper' }}>
      <Stack sx={{ paddingTop: '0px', paddingBottom: '30px'}} direction="row" spacing={2} alignItems="center" p={2}>
        <Avatar sx={{ paddingTop: '0px'}} alt="Bharat Kashyap" src="https://avatars.githubusercontent.com/u/19550456" />
        <Typography sx={{ paddingTop: '0px'}} variant="h6">Bharat Kashyap</Typography>
      </Stack>
      <Divider />
    </Box>
  );
}

export default HeaderMain;