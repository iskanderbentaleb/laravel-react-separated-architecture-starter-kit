import PropTypes from 'prop-types';
import {
  Alert,
  Button,
  Card,
  Group,
  Paper,
  Stack,
  Switch,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconDeviceLaptop, IconLock, IconLogout, IconRefresh, IconShield, IconTrash } from '@tabler/icons-react';
import { useTranslation } from '../../../../../../node_modules/react-i18next';
import { PasswordCard } from './PasswordCard';
import { SessionCard } from './SessionCard';

export function SecurityPanel({
  userData,
  twoFactorActive,
  twoFactorPending,
  twoFactorLoading,
  logoutLoading,
  sessions,
  canLogoutAllDevices,
  passwordForm,
  passwordLoading,
  passwordFormValid,
  handleChangePassword,
  handleToggleTwoFactor,
  setLogoutModalOpened,
  setDeleteModalOpened,
  simplifyUserAgent,
  formatSessionLastActive,
}) {
  const { t } = useTranslation();

  return (
    <Stack gap="lg">
      <Paper
        withBorder={true}
        p="xl"
        radius="md"
        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
      >
        <Group mb="md">
          <ThemeIcon color="blue" variant="light" size="lg" radius="md">
            <IconLock size={20} />
          </ThemeIcon>
          <Title order={3} size="h4">
            {t('admin.pages.settings.changePassword.title')}
          </Title>
        </Group>
        <PasswordCard
          passwordForm={passwordForm}
          passwordLoading={passwordLoading}
          passwordFormValid={passwordFormValid}
          onSubmit={handleChangePassword}
        />
      </Paper>

      <Paper
        withBorder={true}
        p="xl"
        radius="md"
        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
      >
        <Group justify="space-between" mb="md">
          <Group>
            <ThemeIcon color="green" variant="light" size="lg" radius="md">
              <IconRefresh size={20} />
            </ThemeIcon>
            <div>
              <Title order={3} size="h4">
                {t('admin.pages.settings.twoFactor.title')}
              </Title>
              <Text size="sm" c="dimmed">
                {t('admin.pages.settings.twoFactor.description')}
              </Text>
            </div>
          </Group>
          <Switch
            size="lg"
            checked={twoFactorActive}
            disabled={!userData.email_verified_at || twoFactorLoading}
            onChange={(event) => handleToggleTwoFactor(event.currentTarget.checked)}
            loading={twoFactorLoading}
          />
        </Group>

        {twoFactorPending && (
          <Alert color="yellow" icon={<IconRefresh size={16} />} radius="md" mt="md">
            {t('admin.pages.settings.twoFactor.pendingMessage')}
          </Alert>
        )}

        {!userData.email_verified_at && (
          <Alert color="blue" icon={<IconShield size={16} />} radius="md" mt="md">
            {t('admin.pages.settings.twoFactor.verifyEmailBefore')}
          </Alert>
        )}
      </Paper>

      <Paper
        withBorder={true}
        p="xl"
        radius="md"
        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
      >
        <Group justify="space-between" mb="md">
          <Group>
            <ThemeIcon color="orange" variant="light" size="lg" radius="md">
              <IconDeviceLaptop size={20} />
            </ThemeIcon>
            <Title order={3} size="h4">
              {t('admin.pages.settings.activeSessions.title')}
            </Title>
          </Group>
          <Button
            variant="default"
            color="red"
            onClick={() => setLogoutModalOpened(true)}
            leftSection={<IconLogout size={16} />}
            radius="md"
            loading={logoutLoading}
            disabled={!canLogoutAllDevices}
          >
            {t('admin.pages.settings.activeSessions.logoutAll')}
          </Button>
        </Group>

        <Stack gap="md">
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                simplifyUserAgent={simplifyUserAgent}
                formatSessionLastActive={formatSessionLastActive}
              />
            ))
          ) : (
            <Text c="dimmed" size="sm">
              {t('admin.pages.settings.activeSessions.noActiveSessions')}
            </Text>
          )}
        </Stack>
      </Paper>

      <Paper
        withBorder
        p="xl"
        radius="md"
        style={{
          borderColor: '#fa5252',
          borderWidth: '1px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <Group mb="md">
          <ThemeIcon color="red" variant="light" size="lg" radius="md">
            <IconTrash size={20} />
          </ThemeIcon>
          <Title order={3} size="h4" c="red">
            {t('admin.pages.settings.dangerZone.title')}
          </Title>
        </Group>
        <Card withBorder p="md" radius="md">
          <Group justify="space-between">
            <div>
              <Text fw={600} size="sm">
                {t('admin.pages.settings.dangerZone.deleteAccount.title')}
              </Text>
              <Text size="sm" c="dimmed">
                {t('admin.pages.settings.dangerZone.deleteAccount.description')}
              </Text>
            </div>
            <Button color="red" onClick={() => setDeleteModalOpened(true)} variant="light" radius="md">
              {t('admin.pages.settings.dangerZone.deleteAccount.title')}
            </Button>
          </Group>
        </Card>
      </Paper>
    </Stack>
  );
}

SecurityPanel.propTypes = {
  userData: PropTypes.shape({
    email_verified_at: PropTypes.string,
    two_factor_enabled: PropTypes.bool,
    two_factor_setup_pending: PropTypes.bool,
    profile_photo_url: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  twoFactorActive: PropTypes.bool.isRequired,
  twoFactorPending: PropTypes.bool,
  twoFactorLoading: PropTypes.bool.isRequired,
  logoutLoading: PropTypes.bool.isRequired,
  sessions: PropTypes.arrayOf(PropTypes.object).isRequired,
  canLogoutAllDevices: PropTypes.bool.isRequired,
  passwordForm: PropTypes.object.isRequired,
  passwordLoading: PropTypes.bool.isRequired,
  passwordFormValid: PropTypes.bool.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
  handleToggleTwoFactor: PropTypes.func.isRequired,
  setLogoutModalOpened: PropTypes.func.isRequired,
  setDeleteModalOpened: PropTypes.func.isRequired,
  simplifyUserAgent: PropTypes.func.isRequired,
  formatSessionLastActive: PropTypes.func.isRequired,
};
