import PropTypes from 'prop-types';
import { Alert, Badge, Button, Group, Modal, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { IconLogout, IconTrash } from '@tabler/icons-react';
import { useTranslation } from '../../../../../../node_modules/react-i18next';

export function SecurityDetailsModal({ opened, onClose, securitySteps }) {
  const { t } = useTranslation();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t('admin-AdminPages-UserSettings-security-guide-title', { defaultValue: 'Account security guide' })}
      centered
      size="md"
      overlayProps={{ blur: 3 }}
      radius="lg"
      padding="xl"
    >
      <Stack spacing="sm">
        {securitySteps.map((step) => (
          <Group key={step.key} position="apart" align="flex-start" noWrap>
            <div style={{ flex: 1 }}>
              <Text fw={700} size="sm">
                {step.title}
              </Text>
              <Text size="xs" c="dimmed">
                {step.description}
              </Text>
            </div>
            <Badge color={step.completed ? 'green' : 'yellow'} variant="light" size="xs">
              {step.completed ? t('admin-AdminPages-UserSettings-completed') : t('admin-AdminPages-UserSettings-pending')}
            </Badge>
          </Group>
        ))}

        <Text size="sm" c="dimmed">
          {t('admin-AdminPages-UserSettings-security-guide-footer', { defaultValue: 'Complete these steps to secure your account faster.' })}
        </Text>
        <Group position="right">
          <Button variant="default" size="xs" radius="md" onClick={onClose}>
            {t('admin-AdminPages-UserSettings-close')}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

export function DeleteAccountModal({
  opened,
  onClose,
  deleteConfirmation,
  deletePassword,
  onChangeConfirmation,
  onChangePassword,
  onDelete,
  deleteLoading,
}) {
  const { t } = useTranslation();
  const isDeleteEnabled = deleteConfirmation.trim().toUpperCase() === 'DELETE' && deletePassword.trim().length > 0;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t('admin-AdminPages-UserSettings-delete-account-modal-title')}
      centered
      size="lg"
      overlayProps={{ blur: 3 }}
      radius="lg"
      padding="xl"
    >
      <Stack>
        <Alert color="red" icon={<IconTrash size={16} />} radius="md">
          <Text fw={600}>{t('admin-AdminPages-UserSettings-delete-account-modal-warning')}</Text>
          <Text size="sm">{t('admin-AdminPages-UserSettings-delete-account-modal-undo-warning')}</Text>
        </Alert>
        <Text size="sm">
          {t('admin-AdminPages-UserSettings-delete-account-modal-confirm-text', { strong: 'DELETE' })}
        </Text>
        <TextInput
          placeholder={t('admin-AdminPages-UserSettings-delete-account-modal-confirm-placeholder')}
          radius="md"
          size="sm"
          value={deleteConfirmation}
          onChange={onChangeConfirmation}
        />
        <PasswordInput
          label={t('admin-AdminPages-UserSettings-current-password')}
          placeholder={t('admin-AdminPages-UserSettings-enter-your-password')}
          radius="md"
          size="sm"
          value={deletePassword}
          onChange={onChangePassword}
        />
        <Text size="sm" c="dimmed">
          {t('admin-AdminPages-UserSettings-delete-account-modal-body')}
        </Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={onClose} radius="md">
            {t('admin-AdminPages-UserSettings-cancel')}
          </Button>
          <Button color="red" onClick={onDelete} radius="md" disabled={!isDeleteEnabled || deleteLoading} loading={deleteLoading}>
            {t('admin-AdminPages-UserSettings-delete-account')}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

export function LogoutAllDevicesModal({ opened, onClose, onConfirm, logoutLoading }) {
  const { t } = useTranslation();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t('admin-AdminPages-UserSettings-logout-all-devices-modal-title')}
      centered
      size="lg"
      overlayProps={{ blur: 3 }}
      radius="lg"
      padding="xl"
    >
      <Stack>
        <Alert color="yellow" icon={<IconLogout size={16} />} radius="md">
          {t('admin-AdminPages-UserSettings-logout-all-devices-modal-body')}
        </Alert>
        <Group justify="flex-end">
          <Button variant="default" onClick={onClose} radius="md" disabled={logoutLoading}>
            {t('admin-AdminPages-UserSettings-cancel')}
          </Button>
          <Button color="red" onClick={onConfirm} radius="md" loading={logoutLoading}>
            {t('admin-AdminPages-UserSettings-logout-all-devices-action')}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

export function TwoFactorModal({
  opened,
  onConfirm,
  onCancel,
  twoFactorCode,
  onChangeCode,
  twoFactorLoading,
}) {
  const { t } = useTranslation();

  return (
    <Modal
      opened={opened}
      onClose={onCancel}
      title={t('admin-AdminPages-UserSettings-confirm-2fa-modal-title')}
      centered
      size="lg"
      overlayProps={{ blur: 3 }}
      radius="lg"
      padding="xl"
    >
      <Stack>
        <Text size="sm" c="dimmed">
          {t('admin-AdminPages-UserSettings-confirm-2fa-modal-body')}
        </Text>
        <TextInput
          label={t('admin-AdminPages-UserSettings-verification-code')}
          placeholder={t('admin-AdminPages-UserSettings-verification-code-placeholder')}
          value={twoFactorCode}
          onChange={onChangeCode}
          maxLength={6}
          size="sm"
          radius="md"
        />
        <Group justify="flex-end">
          <Button variant="default" onClick={onCancel} radius="md" disabled={twoFactorLoading}>
            {t('admin-AdminPages-UserSettings-cancel')}
          </Button>
          <Button
            color="blue"
            onClick={onConfirm}
            radius="md"
            disabled={twoFactorCode.trim().length !== 6}
            loading={twoFactorLoading}
          >
            {t('admin-AdminPages-UserSettings-verify-code')}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

SecurityDetailsModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  securitySteps: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

DeleteAccountModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteConfirmation: PropTypes.string.isRequired,
  deletePassword: PropTypes.string.isRequired,
  onChangeConfirmation: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  deleteLoading: PropTypes.bool.isRequired,
};

LogoutAllDevicesModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  logoutLoading: PropTypes.bool.isRequired,
};

TwoFactorModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  twoFactorCode: PropTypes.string.isRequired,
  onChangeCode: PropTypes.func.isRequired,
  twoFactorLoading: PropTypes.bool.isRequired,
};
