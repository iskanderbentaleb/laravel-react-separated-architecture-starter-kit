import {
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
  Loader,
  Text,
  Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate, useLocation } from "react-router-dom";

import { LOGIN_ROUTE } from '../../../Router';
import { useState, useEffect } from 'react';




// language traslation
import { useTranslation } from '../../../../node_modules/react-i18next';
import { useUserContext } from '../../../context/userContext';
// language traslation



export default function ResetPassword() {


  const { resetPassword } = useUserContext();

  // language traslation
  const { t } = useTranslation();
  // language traslation

  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Extract token from URL path and email from query params
    const pathParts = location.pathname.split('/');
    const tokenFromUrl = pathParts[pathParts.length - 1];
    setToken(tokenFromUrl);
    
    const queryParams = new URLSearchParams(location.search);
    const emailFromUrl = queryParams.get('email');
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [location]);

  const form = useForm({
    initialValues: {
      password: '',
      password_confirmation: '',
    },
    validate: {
      password: (value) => 
        value.length < 8 
          ? t('guest-guestPages-Authentication-password-error') || 'Password must be at least 8 characters' 
          : null,
      password_confirmation: (value, values) =>
        value !== values.password
          ? t('guest-guestPages-Authentication-password-match-error') || 'Passwords do not match'
          : null,
    },
  });

  const handleSubmit = async ({ password, password_confirmation }) => {
    setIsLoading(true);
    try {
      // reset password API call 
      await resetPassword({ token, email, password , password_confirmation });
      
      // Show success notification
      notifications.show({ 
        message: t('guest-guestPages-Authentication-password-reset-success') || 'Password reset successfully!', 
        color: 'green' 
      });
      
      // Navigate back to login page after successful submission
      setTimeout(() => {
        navigate(LOGIN_ROUTE);
      }, 2000);
      
    } catch (reason) {
      notifications.show({ 
        message: reason.response?.data?.message || t('guest-guestPages-Authentication-password-reset-error') || 'Something went wrong. Please try again.', 
        color: 'red' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size={600} my={100}>

      <img 
        src="/logo.png" 
        style={{ width: '100px', height: '100px', borderRadius: '50%', display: 'block', margin: '0 auto' }} 
        alt="Logo" 
      />

      <Title ta="center" mt={'70px'} size="h3">
        {t('guest-guestPages-Authentication-reset-password-title') || 'Reset Password'}
      </Title>
      
      <Text ta="center" c="dimmed" size="sm" mt="md">
        {t('guest-guestPages-Authentication-reset-password-description') || 'Enter your new password below'}
      </Text>
      
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>

          <Stack>
            <PasswordInput
              withAsterisk
              label={t('guest-guestPages-Authentication-new-password') || 'New Password'}
              placeholder={t('guest-guestPages-Authentication-new-password') || 'Enter new password'}
              {...form.getInputProps('password')}
              size="sm"
            />

            <PasswordInput
              withAsterisk
              label={t('guest-guestPages-Authentication-confirm-password') || 'Confirm Password'}
              placeholder={t('guest-guestPages-Authentication-confirm-password') || 'Confirm your new password'}
              {...form.getInputProps('password_confirmation')}
              size="sm"
            />
          </Stack>

          {isLoading ?
            <Button color="themeColor.4" disabled type="submit" mt="xl" fullWidth>
              <Loader color="themeColor.9" type="dots" />
            </Button>
            :
            <Button color="themeColor.9" type="submit" mt="xl" fullWidth>
              {t('guest-guestPages-Authentication-reset-password-button') || 'Reset Password'}
            </Button>
          }

          <Group justify="center" mt="lg">
            <Anchor
              onClick={() => navigate(LOGIN_ROUTE)}
              variant="gradient"
              gradient={{ from: 'themeColor.4', to: 'themeColor.4' }}
              size="sm"
            >
              {t('guest-guestPages-Authentication-back-to-login') || 'Back to Login'}
            </Anchor>
          </Group>

        </form>
      </Paper>
    </Container>
  );
}