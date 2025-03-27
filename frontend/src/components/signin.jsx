'use client';
import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { SignInPage } from '@toolpad/core/signInPage';
import { Navigate, useNavigate } from 'react-router';
import { useSession } from '../SessionContext';
import { signInWithGithub } from '../firebase/auth';


export default function SignIn() {
  const { session, setSession, loading } = useSession();
  const navigate = useNavigate();

  if (loading) {
    return <LinearProgress />;
  }

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <SignInPage
      providers={[{ id: 'github', name: 'GitHub' }]}
      signIn={async (provider, _, callbackUrl) => {
        let result;
        try {
          
          if (provider.id === 'github') {
            result = await signInWithGithub();
          }
          

          if (result?.success && result?.user) {
            const userSession = {
              user: {
                name: result.user.displayName || '',
                email: result.user.email || '',
                image: result.user.photoURL || '',
              },
            };
            setSession(userSession);
            navigate(callbackUrl || '/', { replace: true });
            return {};
          }
          return { error: result?.error || 'Failed to sign in' };
        } catch (error) {
          return { error: error instanceof Error ? error.message : 'An error occurred' };
        }
      }}
        
    />
  );
}