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
  Divider,
  Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../../context/userContext";
import { ADMIN_DASHBOARD_ROUTE, SELLER_DASHBOARD_ROUTE, REGISTER_ROUTE, FORGET_PASSWORD_ROUTE, TWO_FACTOR_CHALLENGE_ROUTE, OAUTH_BACKEND_ROUTE } from '../../../Router';
import { useEffect, useState } from 'react';

// language traslation
import { useTranslation } from '../../../../node_modules/react-i18next';
import { IconBrandGoogle } from '@tabler/icons-react';
import { GoogleIcon } from '../../../assets/google';
// language traslation

export default function AuthenticationPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, authenticated, setAuthenticated, setToken, UserRole, setUserRole } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm({
    initialValues: { email: 'iskanderboss1999@gmail.com', password: 'iskanderboss1999@gmail.com' },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t('guest.pages.authentication.email-error')),
      password: (value) => (value.length < 8 ? t('guest.pages.authentication.password-error') : null),
    },
  });

  const handleError = (errors) => {
    if (errors.email) {
      notifications.show({ message: t('guest.pages.authentication.email-error-toast'), color: 'red' });
    } else if (errors.password) {
      notifications.show({ message: t('guest.pages.authentication.password-error-toast'), color: 'red' });
    }
  };

  const handleSubmit = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const { status, data } = await login(email, password);
      if (status === 200) {
        if (data.two_factor_required) {
          notifications.show({
            message: t('guest.pages.authentication.two-factor-sent-toast') || 'Two-factor code sent to your email.',
            color: 'blue',
          });
          navigate(TWO_FACTOR_CHALLENGE_ROUTE, { state: { email: data.user?.email, role: data.user?.role } });
          return;
        }

        const { role } = data.user;
        setAuthenticated(true);
        setToken(data.token);
        setUserRole(role);

        notifications.show({
          message: t('guest.pages.authentication.login-success-toast'),
          color: 'green',
        });

        if (role === 'admin') {
          navigate(ADMIN_DASHBOARD_ROUTE);
        } else if (role === 'seller') {
          navigate(SELLER_DASHBOARD_ROUTE);
        }
      }
    } catch (reason) {
      notifications.show({ message: reason.response.data.message, color: 'red' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    // Add small delay to show loading state
    setTimeout(() => {
      window.location.href = OAUTH_BACKEND_ROUTE;
    }, 100);
  };

  useEffect(() => {
    if (authenticated) {
      if (UserRole === 'admin') {
        navigate(ADMIN_DASHBOARD_ROUTE);
      } else if (UserRole === 'seller') {
        navigate(SELLER_DASHBOARD_ROUTE);
      }
    }
  }, []);

  return (
    <Container size={600} my={100}>
      <img 
        src="/logo.png" 
        style={{ width: '100px', height: '100px', borderRadius: '50%', display: 'block', margin: '0 auto' }} 
        alt="Logo" 
      />

      <Title ta="center" mt={'70px'} size="h3">
        {t('guest.pages.authentication.welcome')}
      </Title>
      
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
          <TextInput
            withAsterisk
            mt="sm"
            label={t('guest.pages.authentication.email')}
            placeholder={t('guest.pages.authentication.email')}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            withAsterisk
            label={t('guest.pages.authentication.password')}
            placeholder={t('guest.pages.authentication.password')}
            {...form.getInputProps('password')}
            mt="md"
          />

          <Group justify="space-between" mt="lg">
            <Anchor
              onClick={() => navigate(FORGET_PASSWORD_ROUTE)}
              variant="gradient"
              gradient={{ from: 'themeColor.4', to: 'themeColor.4' }}
              size="sm"
            >
              {t('guest.pages.authentication.password-forgot')}
            </Anchor>
          </Group>

          {isLoading ? (
            <Button 
              color="themeColor.4" 
              disabled 
              type="submit" 
              mt="xl" 
              fullWidth
            >
              <Loader color="themeColor.9" type="dots" />
            </Button>
          ) : (
            <Stack gap="md" mt="xl">
              {/* Sign In Button */}
              <Button 
                color="themeColor.9" 
                type="submit" 
                fullWidth
                size="sm"
              >
                {t('guest.pages.authentication.submit')}
              </Button>

              {/* Divider */}
              <Divider 
                label={t('guest.pages.authentication.or') || "OR"} 
                labelPosition="center" 
                my="md"
              />

              {/* Google Sign In Button */}
              <Button
                onClick={handleGoogleLogin}
                loading={isGoogleLoading}
                leftSection={<GoogleIcon size={20} />}
                variant="default"
                fullWidth
                size="sm"
                styles={(theme) => ({
                  root: {
                    backgroundColor: theme.white,
                    color: theme.colors.dark[9],
                    border: `1px solid ${theme.colors.gray[3]}`,
                    transition: 'background-color 0.2s ease',
                    '&:hover': {
                      backgroundColor: theme.colors.gray[0],
                    },
                  },
                })}
              >
                {t('guest.pages.authentication.google-signin')}
              </Button>
            </Stack>
          )}

          <Group justify="center" mt="lg">
            <Anchor
              onClick={() => navigate(REGISTER_ROUTE)}
              variant="gradient"
              gradient={{ from: 'themeColor.4', to: 'themeColor.4' }}
              size="sm"
            >
              {t('guest.pages.authentication.register')}
            </Anchor>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}