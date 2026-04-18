import { Container, Paper, Title, Loader, Center, Stack, Alert } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { IconCheck, IconAlertCircle } from '@tabler/icons-react';

import { useUserContext } from "../../../context/userContext";
import { ADMIN_DASHBOARD_ROUTE, SELLER_DASHBOARD_ROUTE, LOGIN_ROUTE } from '../../../Router';

// language translation
import { useTranslation } from '../../../../node_modules/react-i18next';
import { GoogleIcon } from '../../../assets/google';

export default function OAuthSuccess() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthenticated, setToken, setUserRole } = useUserContext();
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState(null);


    const processOAuthData = async () => {
        try {
            // Get query parameters from URL
            const params = new URLSearchParams(location.search);
            const token = params.get('token');
            const role = params.get('role');

            // Validate token and role
            if (!token || !role) {
            throw new Error('Missing authentication data');
            }

            // Store authentication data
            setToken(token);
            setAuthenticated(true);
            setUserRole(role);

            // Show success notification
            notifications.show({
            title: t('guest.pages.authentication.oauth-success-title') ,
            message: t('guest.pages.authentication.oauth-success-message') ,
            color: 'green',
            icon: <IconCheck size={16} />,
            });

            // Redirect based on user role
            if (role === 'admin') {
            navigate(ADMIN_DASHBOARD_ROUTE);
            } else if (role === 'seller') {
            navigate(SELLER_DASHBOARD_ROUTE);
            } else {
            // Default redirect if role is unknown
            navigate(LOGIN_ROUTE);
            }

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
            setError(errorMessage);
            
            notifications.show({
            title: t('guest.pages.authentication.oauth-error-title') || 'Authentication Failed',
            message: t('guest.pages.authentication.oauth-error-message') || 'Failed to complete Google sign-in. Please try again.',
            color: 'red',
            icon: <IconAlertCircle size={16} />,
            });

            // Redirect to login page after 3 seconds on error
            setTimeout(() => {
            navigate(LOGIN_ROUTE);
            }, 3000);
        } finally {
            setProcessing(false);
        }
    };

    useEffect(() => {
        processOAuthData();
    }, [location, navigate, setAuthenticated, setToken, setUserRole]);

    // If already authenticated, redirect to appropriate dashboard
    useEffect(() => {
        if (!processing && !error) {
        // Already handled in the main useEffect
        return;
        }
    }, [processing, error]);

  return (
    <Container size={600} my={100}>
      <img 
        src="/logo.png" 
        style={{ 
          width: '100px', 
          height: '100px', 
          borderRadius: '50%', 
          display: 'block', 
          margin: '0 auto' 
        }} 
        alt="Logo" 
      />

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {processing ? (
          <Stack align="center" gap="md">
            <Loader size="lg" color="themeColor.9" />
            <Title order={3} ta="center">
              {t('guest.pages.authentication.oauth-processing') }
            </Title>
            <Center>
              <GoogleIcon size={24} />
            </Center>
            <Center>
              <small style={{ color: 'gray' }}>
                {t('guest.pages.authentication.oauth-redirecting') }
              </small>
            </Center>
          </Stack>
        ) : error ? (
          <Stack align="center" gap="md">
            <IconAlertCircle size={48} color="red" />
            <Title order={3} ta="center" c="red">
              {t('guest.pages.authentication.oauth-failed')}
            </Title>
            <Alert color="red" variant="light">
              {error}
            </Alert>
            <Center>
              <small>
                {t('guest.pages.authentication.oauth-redirecting-login')}
              </small>
            </Center>
          </Stack>
        ) : null}
      </Paper>
    </Container>
  );
}