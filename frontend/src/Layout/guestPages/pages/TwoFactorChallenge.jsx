import { TextInput, Paper, Title, Container, Group, Button, Loader, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useUserContext } from '../../../context/userContext';
import { ADMIN_DASHBOARD_ROUTE, LOGIN_ROUTE, SELLER_DASHBOARD_ROUTE } from '../../../Router';
import { adminApi } from '../../../Services/Api/admin/adminApi';

// language translation
import { useTranslation } from '../../../../node_modules/react-i18next';
import { sellerApi } from '../../../Services/Api/seller/sellerApi';
// language translation

export default function TwoFactorChallenge() {
  // language translation
  const { t } = useTranslation();
  // language translation

  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(location.state?.email || '');

  const UserRoleUrl = location.state?.role || 'admin'; 

  const { setAuthenticated, setToken, setUserRole } = useUserContext();

  const form = useForm({
    initialValues: {
      email: email,
      code: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : t('guest.pages.twoFactor.email-error') ),
      code: (value) => (value.length !== 6 ? t('guest.pages.twoFactor.code-error') : null),
    },
  });

  useEffect(() => {
    if (!email) {
      setEmail('');
    }
  }, [email]);

  const handleError = (errors) => {
    if (errors.email) {
      notifications.show({ 
        message: t('guest.pages.twoFactor.email-error-toast') , 
        color: 'red' 
      });
    } else if (errors.code) {
      notifications.show({ 
        message: t('guest.pages.twoFactor.code-error-toast') , 
        color: 'red' 
      });
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      if (UserRoleUrl === 'admin') {
        const { data } = await adminApi.verifyTwoFactor(values);
        notifications.show({
          message: t('guest.pages.twoFactor.verify-success') ,
          color: 'green',
        });

        if (data.token) {
          setAuthenticated(true);
          setToken(data.token);
          setUserRole(data.user?.role || 'admin');
        }
        navigate(ADMIN_DASHBOARD_ROUTE);

      } else if (UserRoleUrl === 'seller') {
          const { data } = await sellerApi.verifyTwoFactor(values);
          notifications.show({
            message: t('guest.pages.twoFactor.verify-success') ,
            color: 'green',
          });

          if (data.token) {
            setAuthenticated(true);
            setToken(data.token);
            setUserRole(data.user?.role || 'seller');
          }
          navigate(SELLER_DASHBOARD_ROUTE);
      }
    } catch (error) {
      notifications.show({
        message: error?.response?.data?.message || t('guest.pages.twoFactor.invalid-code') ,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

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

      <Title size="h3" ta="center" mt={'70px'}>
        { t('guest.pages.twoFactor.title') }
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
          <Stack spacing="md">
            <TextInput
              withAsterisk
              label={t('guest.pages.twoFactor.email')}
              placeholder={t('guest.pages.twoFactor.email-placeholder')}
              {...form.getInputProps('email')}
            />

            <TextInput
              withAsterisk
              label={t('guest.pages.twoFactor.code')}
              placeholder={t('guest.pages.twoFactor.code-placeholder')}
              maxLength={6}
              {...form.getInputProps('code')}
            />

            <Text size="sm" c="dimmed" mt="sm">
              {t('guest.pages.twoFactor.instruction')}
            </Text>

            {loading ? (
              <Button color="themeColor.9" disabled type="submit" mt="xl" fullWidth>
                <Loader color="themeColor.9" type="dots" />
              </Button>
            ) : (
              <Button color="themeColor.9" type="submit" mt="xl" fullWidth>
                {t('guest.pages.twoFactor.verify')}
              </Button>
            )}

            <Group justify="center" mt="lg">
              <Button 
                variant="subtle" 
                onClick={() => navigate(LOGIN_ROUTE)}
                c="themeColor.4"
              >
                {t('guest.pages.twoFactor.back-login')}
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}