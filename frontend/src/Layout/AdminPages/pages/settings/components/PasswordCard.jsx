import { Button, Group, PasswordInput, Stack } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useTranslation } from '../../../../../../node_modules/react-i18next';

export function PasswordCard({ passwordForm, passwordLoading, passwordFormValid, onSubmit }) {
  const { t } = useTranslation();

  return (
    <form onSubmit={passwordForm.onSubmit(onSubmit)}>
      <Stack gap="md">
        <PasswordInput
          label={t('admin.pages.settings.changePassword.currentPassword.label')}
          placeholder={t('admin.pages.settings.changePassword.currentPassword.placeholder')}
          required
          size="sm"
          radius="md"
          {...passwordForm.getInputProps('currentPassword')}
        />
        <PasswordInput
          label={t('admin.pages.settings.changePassword.newPassword.label')}
          placeholder={t('admin.pages.settings.changePassword.newPassword.placeholder')}
          required
          size="sm"
          radius="md"
          {...passwordForm.getInputProps('newPassword')}
        />
        <PasswordInput
          label={t('admin.pages.settings.changePassword.confirmNewPassword.label')}
          placeholder={t('admin.pages.settings.changePassword.confirmNewPassword.placeholder')}
          required
          size="sm"
          radius="md"
          {...passwordForm.getInputProps('confirmPassword')}
        />
        <Group justify="flex-end">
          <Button type="submit" color="blue" radius="md" loading={passwordLoading} disabled={!passwordFormValid || passwordLoading}>
            {t('admin.pages.settings.changePassword.updateButton')}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
