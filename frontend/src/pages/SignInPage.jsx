import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignInPage.css';

const Theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: true,
    dark: {
      palette: {
        primary: { main: '#90caf9' },
        secondary: { main: '#f48fb1' },
        background: { default: '#0d1117', paper: '#0d1117' },
        text: { primary: '#ffffff', secondary: '#b0bec5' },
      },
    },
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});

export default function SignInPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username: email, // Django uses "username" for default authentication
        password,
      });

      // Store the token and redirect
      localStorage.setItem('token', response.data.access);
      setError(null);
      navigate('/dashboard'); // Redirect to reminders page
    } catch (err) {
      console.error(err);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={Theme}>
      <Box
        sx={{
          width: '100vw',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          color: 'text.primary',
          textAlign: 'center',
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        }}
      >
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '300px',
            gap: '16px',
            padding: '0 16px',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Sign In
          </Typography>
          {error && (
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: '#b0bec5' } }}
            InputProps={{ style: { color: '#ffffff' } }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: '#b0bec5' } }}
            InputProps={{ style: { color: '#ffffff' } }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          <Button
            onClick={() => navigate('/signup')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Don't have an account? Sign Up
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

SignInPage.propTypes = {
  onSignIn: PropTypes.func,
};