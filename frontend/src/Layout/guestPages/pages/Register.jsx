import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
  Loader,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../../context/userContext";
import { ADMIN_DASHBOARD_ROUTE, SELLER_DASHBOARD_ROUTE, LOGIN_ROUTE } from '../../../Router';
import { useEffect, useState } from 'react';

// language translation
import { useTranslation } from '../../../../node_modules/react-i18next';
// language translation


export default function RegisterPage() {

  // language translation
  const { t } = useTranslation();
  // language translation

  const navigate = useNavigate();

  const { register, authenticated, setAuthenticated, setToken } = useUserContext();
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state


  const form = useForm({
    initialValues: { 
      name: '', 
      email: '', 
      password: '',
      password_confirmation: '' 
    },
    validate: {
      name: (value) => (value.length < 2 ? t('guest.pages.register.name-error') : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t('guest.pages.register.email-error')),
      password: (value) => (value.length < 8 ? t('guest.pages.register.password-error') : null),
      password_confirmation: (value, values) => 
        value !== values.password ? t('guest.pages.register.password-confirmation-error') : null,
    },
  });



  const handleError = (errors) => {
    if (errors.name) {
      notifications.show({ message: t('guest.pages.register.name-error-toast'), color: 'red' });
    } else if (errors.email) {
      notifications.show({ message: t('guest.pages.register.email-error-toast'), color: 'red' });
    } else if (errors.password) {
      notifications.show({ message: t('guest.pages.register.password-error-toast'), color: 'red' });
    } else if (errors.password_confirmation) {
      notifications.show({ message: t('guest.pages.register.password-confirmation-error-toast'), color: 'red' });
    }
  };



  // Submit handler - now includes password_confirmation
  const handleSubmit = async ({ name, email, password, password_confirmation }) => {
    setIsLoading(true); // Set loading state to true
    try {
      // Send all four fields: name, email, password, and password_confirmation
      const { status, data } = await register(name, email, password, password_confirmation);
      if (status === 200 || status === 201) {
        const { role } = data.user;
        setAuthenticated(true);
        setToken(data.token);

        // Show success notification
        notifications.show({ 
          message: t('guest.pages.register.success-toast'), 
          color: 'green' 
        });

        if (role === 'admin') {
          navigate(ADMIN_DASHBOARD_ROUTE);
        } else if (role === 'seller') {
          navigate(SELLER_DASHBOARD_ROUTE);
        }
      }
    } catch (reason) {
      // Handle validation errors from backend
      if (reason.response?.data?.errors) {
        const errors = reason.response.data.errors;
        if (errors.email) {
          notifications.show({ message: errors.email[0], color: 'red' });
        } else if (errors.name) {
          notifications.show({ message: errors.name[0], color: 'red' });
        } else if (errors.password) {
          notifications.show({ message: errors.password[0], color: 'red' });
        } else if (errors.password_confirmation) {
          notifications.show({ message: errors.password_confirmation[0], color: 'red' });
        } else {
          notifications.show({ message: reason.response.data.message || t('guest.pages.register.error-toast'), color: 'red' });
        }
      } else {
        notifications.show({ message: reason.response?.data?.message || t('guest.pages.register.error-toast'), color: 'red' });
      }
    } finally {
      setIsLoading(false); // Reset loading state after request completes
    }
  };



  // Send to dashboard if auth = true if user wants to play with urls 
  useEffect(() => {
    if (authenticated) {
      navigate(SELLER_DASHBOARD_ROUTE);
    }
  }, []);




  return (
    <Container size={600} my={100}>


      <img src="/logo.png" style={{ width: '100px', height: '100px', borderRadius: '50%', display: 'block', margin: '0 auto' }} alt="Logo" />


      <Title ta="center" mt={'70px'} size="h3">
        {t('guest.pages.register.welcome')}
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit, handleError)}>

          <TextInput
            withAsterisk
            label={t('guest.pages.register.name')}
            placeholder={t('guest.pages.register.name')}
            {...form.getInputProps('name')}
          />

          <TextInput
            withAsterisk
            mt="sm"
            label={t('guest.pages.register.email')}
            placeholder={t('guest.pages.register.email')}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            withAsterisk
            label={t('guest.pages.register.password')}
            placeholder={t('guest.pages.register.password')}
            {...form.getInputProps('password')}
            mt="md"
          />

          <PasswordInput
            withAsterisk
            label={t('guest.pages.register.password-confirmation')}
            placeholder={t('guest.pages.register.password-confirmation')}
            {...form.getInputProps('password_confirmation')}
            mt="md"
          />

          {isLoading ?
            <Button color="themeColor.4" disabled type="submit" mt="xl" fullWidth>
              <Loader color="themeColor.9" type="dots" />
            </Button>
            :
            <Button color="themeColor.9" type="submit" mt="xl" fullWidth>
              {t('guest.pages.register.submit')}
            </Button>
          }

          <Group justify="center" mt="lg">
            <Anchor
              onClick={() => navigate(LOGIN_ROUTE)}
              variant="gradient"
              gradient={{ from: 'themeColor.4', to: 'themeColor.4' }}
              size="sm">{t('guest.pages.register.login')}
            </Anchor>
          </Group>

        </form>
      </Paper>
    </Container>
  );
}