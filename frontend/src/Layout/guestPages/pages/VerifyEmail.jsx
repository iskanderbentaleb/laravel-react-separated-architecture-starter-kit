import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Paper, Title, Text, Stack, Loader, Group, ThemeIcon, Card, Divider, Badge } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { adminApi } from '../../../Services/Api/admin/adminApi';
import { LOGIN_ROUTE, ADMIN_DASHBOARD_ROUTE, SELLER_DASHBOARD_ROUTE } from '../../../Router';
import { IconMail, IconMailCheck, IconRefresh, IconSend, IconCheck, IconMailOpened, IconAt } from '@tabler/icons-react';
import { useSearchParams } from "react-router-dom";


// language translation
import { useTranslation } from '../../../../node_modules/react-i18next';
import { sellerApi } from '../../../Services/Api/seller/sellerApi';
// language translation

export default function VerifyEmail() {
  // language translation
  const { t } = useTranslation();
  // language translation

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [sending, setSending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  // const params = new URLSearchParams(window.location.search);
  // const UserRoleUrl = params.get('role');

  const [searchParams] = useSearchParams();
  const UserRoleUrl = searchParams.get("role");


  const loadUser = useCallback(async () => {
    setRefreshing(true);
    try {
        if (UserRoleUrl == 'admin') {
          const { data } = await adminApi.getCurrentAdmin();
          setUser(data.user);
        } else if (UserRoleUrl == 'seller') {
          const { data } = await sellerApi.getCurrentSeller();
          setUser(data.user);
        }
    } catch (error) {
      if (error?.response?.status === 401) {
        notifications.show({
          message: t('guest.pages.verifyEmail.signin-error'),
          color: 'yellow',
        });
        navigate(LOGIN_ROUTE);
        return;
      }
      notifications.show({
        message: error?.response?.data?.message || t('guest.pages.verifyEmail.load-error'),
        color: 'red',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [navigate, t]);

  useEffect(() => {
    loadUser();
    console.log('Role from URL:', UserRoleUrl); 
  }, [loadUser]);

  const handleSendLink = async () => {
    setSending(true);
    try {
      if (UserRoleUrl == 'admin') {
        await adminApi.sendEmailVerification();
      } else if (UserRoleUrl == 'seller') {
        await sellerApi.sendEmailVerification();
      }

      notifications.show({
        message: t('guest.pages.verifyEmail.send-success'),
        color: 'green',
      });

    } catch (error) {
      notifications.show({
        message: error?.response?.data?.message || t('guest.pages.verifyEmail.send-error'),
        color: 'red',
      });
    } finally {
      setSending(false);
    }
  };

  const handleCheckVerification = async () => {
    setRefreshing(true);
    try {
      if (UserRoleUrl == 'admin') {
        const { data } = await adminApi.getCurrentAdmin();
        setUser(data.user);
      } else if (UserRoleUrl == 'seller') {
        const { data } = await sellerApi.getCurrentSeller();
        setUser(data.user);
      }

      if (data.user.email_verified_at) {
        notifications.show({
          message: t('guest.pages.verifyEmail.verify-success'),
          color: 'green',
        });
        navigate(ADMIN_DASHBOARD_ROUTE);
      } else {
        notifications.show({
          message: t('guest.pages.verifyEmail.not-verified'),
          color: 'yellow',
        });
      }
    } catch (error) {
      notifications.show({
        message: error?.response?.data?.message || t('guest.pages.verifyEmail.check-error'),
        color: 'red',
      });
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <Container size={600} my={100}>
        <Group justify="center" style={{ minHeight: '50vh' }}>
          <Loader size="lg" color="themeColor.9" />
        </Group>
      </Container>
    );
  }

  const isVerified = user?.email_verified_at;

  return (
    <Container size={600} my={80}>
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

      <Title ta="center" mt={'70px'} size="h3"> 
        {t('guest.pages.verifyEmail.title')}
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Stack spacing="xl">
          {/* Email Information Card */}
          <Card withBorder radius="md" p="lg">
            <Group justify="space-between" align="center" wrap="nowrap">
              <Group gap="md">
                <ThemeIcon size="xl" radius="xl" color="themeColor.4" variant="light">
                  <IconAt size={24} />
                </ThemeIcon>
                <div>
                  <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                    {t('guest.pages.verifyEmail.email-address')}
                  </Text>
                  <Text size="lg" fw={600}>
                    {user?.email || t('guest.pages.verifyEmail.unknown')}
                  </Text>
                </div>
              </Group>
              <Badge 
                size="lg" 
                radius="md"
                color={isVerified ? 'green' : 'yellow'}
                variant="filled"
                leftSection={isVerified ? <IconCheck size={14} /> : <IconMail size={14} />}
              >
                {isVerified 
                  ? t('guest.pages.verifyEmail.verified')
                  : t('guest.pages.verifyEmail.not-verified-status')}
              </Badge>
            </Group>
          </Card>

          {/* Main Illustration and Message */}
          <Group justify="center" mt="md">
            <ThemeIcon 
              size={120} 
              radius="xl" 
              color={isVerified ? 'green' : 'themeColor.4'} 
              variant="light"
              style={{ margin: '0 auto' }}
            >
              {isVerified ? <IconMailCheck size={64} /> : <IconMailOpened size={64} />}
            </ThemeIcon>
          </Group>

          <div style={{ textAlign: 'center' }}>
            <Title order={3} mb="sm">
              {isVerified 
                ? t('guest.pages.verifyEmail.already-verified-title')
                : t('guest.pages.verifyEmail.verify-title')}
            </Title>
            <Text c="dimmed" size="sm" maw={400} style={{ margin: '0 auto' }}>
              {isVerified 
                ? t('guest.pages.verifyEmail.already-verified-message')
                : t('guest.pages.verifyEmail.instruction')}
            </Text>
          </div>

          {/* Action Buttons */}
          {!isVerified && (
            <>
              <Divider label={t('guest.pages.verifyEmail.havent-received')} labelPosition="center" />
              
              <Group justify="center" gap="md">
                <Button 
                  variant="outline"
                  color="themeColor.4"
                  onClick={handleSendLink} 
                  loading={sending} 
                  disabled={sending}
                  leftSection={<IconSend size={18} />}
                >
                  {t('guest.pages.verifyEmail.resend')}
                </Button>
                
                <Button 
                  color="themeColor.9"
                  onClick={handleCheckVerification} 
                  loading={refreshing} 
                  disabled={refreshing}
                  leftSection={<IconRefresh size={18} />}
                >
                  {t('guest.pages.verifyEmail.check-status')}
                </Button>
              </Group>
            </>
          )}

          {isVerified && (
            <Button 
              color="themeColor.9"
              onClick={() => navigate(UserRoleUrl === 'admin' ? ADMIN_DASHBOARD_ROUTE : SELLER_DASHBOARD_ROUTE)} 
              fullWidth
              mt="md"
              leftSection={<IconCheck size={18} />}
            >
              {t('guest.pages.verifyEmail.go-dashboard')}
            </Button>
          )}

        </Stack>
      </Paper>
    </Container>
  );
}