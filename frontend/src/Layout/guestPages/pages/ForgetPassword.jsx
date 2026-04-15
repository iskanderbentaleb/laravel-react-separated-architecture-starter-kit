import {
  TextInput,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
  Loader,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate } from "react-router-dom";

import { LOGIN_ROUTE } from '../../../Router';
import { useState } from 'react';

// language traslation
import { useTranslation } from '../../../../node_modules/react-i18next';
import { useUserContext } from '../../../context/userContext';
// language traslation

export default function ForgetPassword() {

  // language traslation
  const { t } = useTranslation();
  // language traslation

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { forgotPassword } = useUserContext();

  const form = useForm({
    initialValues: { email: '' },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t('guest.pages.forgot-password.email-error')),
    },
  });

  const handleSubmit = async ({ email }) => {
    setIsLoading(true);
    try {
      // TODO: forgot password API call
      await forgotPassword(email);
      
      // success notification
      notifications.show({ 
        message: t('guest.pages.forgot-password.success'), 
        color: 'green' 
      });
      
      // Navigate back to login page after successful submission
      setTimeout(() => {
        navigate(LOGIN_ROUTE);
      }, 2000);
      
    } catch (reason) {
      notifications.show({ 
        message: reason.response?.data?.message || t('guest.pages.forgot-password.error') || 'Something went wrong', 
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
        {t('guest.pages.forgot-password.title') || 'Forgot Password'}
      </Title>
      
      <Text ta="center" c="dimmed" size="sm" mt="md">
        {t('guest.pages.forgot-password.description') || 'Enter your email address and we\'ll send you a link to reset your password'}
      </Text>
      
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>

          <TextInput
            withAsterisk
            label={t('guest.pages.forgot-password.email')}
            placeholder={t('guest.pages.forgot-password.email')}
            {...form.getInputProps('email')}
            size="sm"
          />

          {isLoading ?
            <Button color="themeColor.4" disabled type="submit" mt="xl" fullWidth>
              <Loader color="themeColor.9" type="dots" />
            </Button>
            :
            <Button color="themeColor.9" type="submit" mt="xl" fullWidth>
              {t('guest.pages.forgot-password.send-reset-link') || 'Send Reset Link'}
            </Button>
          }

          <Group justify="center" mt="lg">
            <Anchor
              onClick={() => navigate(LOGIN_ROUTE)}
              variant="gradient"
              gradient={{ from: 'themeColor.4', to: 'themeColor.4' }}
              size="sm"
            >
              {t('guest.pages.forgot-password.back-to-login') || 'Back to Login'}
            </Anchor>
          </Group>

        </form>
      </Paper>
    </Container>
  );
}