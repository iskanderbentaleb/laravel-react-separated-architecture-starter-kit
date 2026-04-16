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
          ? t('guest.pages.resetPassword.validation.password-error') : null,
      password_confirmation: (value, values) =>
        value !== values.password
          ? t('guest.pages.resetPassword.validation.confirm-password-error') : null,
    },
  });

  const handleSubmit = async ({ password, password_confirmation }) => {
    setIsLoading(true);
    try {
      // reset password API call 
      await resetPassword({ token, email, password , password_confirmation });
      
      // Show success notification
      notifications.show({ 
        message: t('guest.pages.resetPassword.messages.password-reset-success') , 
        color: 'green' 
      });
      
      // Navigate back to login page after successful submission
      setTimeout(() => {
        navigate(LOGIN_ROUTE);
      }, 2000);
      
    } catch (reason) {
      notifications.show({ 
        message: reason.response?.data?.message || t('guest.pages.resetPassword.messages.password-reset-error') , 
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
        {t('guest.pages.resetPassword.title')}
      </Title>
      
      <Text ta="center" c="dimmed" size="sm" mt="md">
        {t('guest.pages.resetPassword.description')}
      </Text>
      
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>

          <Stack>
            <PasswordInput
              withAsterisk
              label={t('guest.pages.resetPassword.new-password')}
              placeholder={t('guest.pages.resetPassword.new-password-placeholder')}
              {...form.getInputProps('password')}
              size="sm"
            />

            <PasswordInput
              withAsterisk
              label={t('guest.pages.resetPassword.confirm-password')}
              placeholder={t('guest.pages.resetPassword.confirm-password-placeholder')}
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
              {t('guest.pages.resetPassword.reset-button')}
            </Button>
          }

          <Group justify="center" mt="lg">
            <Anchor
              onClick={() => navigate(LOGIN_ROUTE)}
              variant="gradient"
              gradient={{ from: 'themeColor.4', to: 'themeColor.4' }}
              size="sm"
            >
              {t('guest.pages.resetPassword.back-login-button') || 'Back to Login'}
            </Anchor>
          </Group>

        </form>
      </Paper>
    </Container>
  );
}