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
      title={t('admin.pages.settings.security.guide.title')}
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
              {step.completed ? t('admin.pages.settings.completed') : t('admin.pages.settings.pending')}
            </Badge>
          </Group>
        ))}

        <Text size="sm" c="dimmed">
          {t('admin.pages.settings.security.guide.footer')}
        </Text>
        <Group position="right">
          <Button variant="default" size="xs" radius="md" onClick={onClose}>
            {t('admin.pages.settings.close')}
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
      title={t('admin.pages.settings.dangerZone.deleteAccount.title')}
      centered
      size="lg"
      overlayProps={{ blur: 3 }}
      radius="lg"
      padding="xl"
    >
      <Stack>
        <Alert color="red" icon={<IconTrash size={16} />} radius="md">
          <Text fw={600}>{t('admin.pages.settings.dangerZone.deleteAccount.modal.warning')}</Text>
          <Text size="sm">{t('admin.pages.settings.dangerZone.deleteAccount.modal.undoWarning')}</Text>
        </Alert>
        <Text size="sm">
          {t('admin.pages.settings.dangerZone.deleteAccount.modal.confirmText', { strong: 'DELETE' })}
        </Text>
        <TextInput
          placeholder={t('admin.pages.settings.dangerZone.deleteAccount.modal.confirmPlaceholder')}
          radius="md"
          size="sm"
          value={deleteConfirmation}
          onChange={onChangeConfirmation}
        />
        <PasswordInput
          label={t('admin.pages.settings.dangerZone.deleteAccount.modal.enterPassword')}
          placeholder={t('admin.pages.settings.dangerZone.deleteAccount.modal.enterPassword')}
          radius="md"
          size="sm"
          value={deletePassword}
          onChange={onChangePassword}
        />
        <Text size="sm" c="dimmed">
          {t('admin.pages.settings.dangerZone.deleteAccount.modal.body')}
        </Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={onClose} radius="md">
            {t('admin.pages.settings.cancel')}
          </Button>
          <Button color="red" onClick={onDelete} radius="md" disabled={!isDeleteEnabled || deleteLoading} loading={deleteLoading}>
            {t('admin.pages.settings.dangerZone.deleteAccount.title')}
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
      title={t('admin.pages.settings.logoutAllDevicesModal.title')}
      centered
      size="lg"
      overlayProps={{ blur: 3 }}
      radius="lg"
      padding="xl"
    >
      <Stack>
        <Alert color="yellow" icon={<IconLogout size={16} />} radius="md">
          {t('admin.pages.settings.logoutAllDevicesModal.body')}
        </Alert>
        <Group justify="flex-end">
          <Button variant="default" onClick={onClose} radius="md" disabled={logoutLoading}>
            {t('admin.pages.settings.cancel')}
          </Button>
          <Button color="red" onClick={onConfirm} radius="md" loading={logoutLoading}>
            {t('admin.pages.settings.logoutAllDevicesModal.action')}
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
      title={t('admin.pages.settings.confirmTwoFactorModal.title')}
      centered
      size="lg"
      overlayProps={{ blur: 3 }}
      radius="lg"
      padding="xl"
    >
      <Stack>
        <Text size="sm" c="dimmed">
          {t('admin.pages.settings.confirmTwoFactorModal.body')}
        </Text>
        <TextInput
          label={t('admin.pages.settings.confirmTwoFactorModal.verificationCode.label')}
          placeholder={t('admin.pages.settings.confirmTwoFactorModal.verificationCode.placeholder')}
          value={twoFactorCode}
          onChange={onChangeCode}
          maxLength={6}
          size="sm"
          radius="md"
        />
        <Group justify="flex-end">
          <Button variant="default" onClick={onCancel} radius="md" disabled={twoFactorLoading}>
            {t('admin.pages.settings.cancel')}
          </Button>
          <Button
            color="blue"
            onClick={onConfirm}
            radius="md"
            disabled={twoFactorCode.trim().length !== 6}
            loading={twoFactorLoading}
          >
            {t('admin.pages.settings.confirmTwoFactorModal.verifyButton')}
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
