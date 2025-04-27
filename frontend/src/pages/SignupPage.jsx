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

export default function SignUpPage() {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      // Redirect to the sign-in page after successful registration
      console.log(response.data);
      setError(null);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to create an account. Please try again.');
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
            Sign Up
          </Typography>
          {error && (
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <TextField
            label="First Name"
            name="firstName"
            variant="outlined"
            fullWidth
            value={formData.firstName}
            onChange={handleChange}
            InputLabelProps={{ style: { color: '#b0bec5' } }}
            InputProps={{ style: { color: '#ffffff' } }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            variant="outlined"
            fullWidth
            value={formData.lastName}
            onChange={handleChange}
            InputLabelProps={{ style: { color: '#b0bec5' } }}
            InputProps={{ style: { color: '#ffffff' } }}
          />
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            InputLabelProps={{ style: { color: '#b0bec5' } }}
            InputProps={{ style: { color: '#ffffff' } }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            InputLabelProps={{ style: { color: '#b0bec5' } }}
            InputProps={{ style: { color: '#ffffff' } }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

SignUpPage.propTypes = {
  onSignUp: PropTypes.func,
};