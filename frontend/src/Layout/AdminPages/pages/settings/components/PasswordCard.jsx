import { Button, Group, PasswordInput, Stack } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useTranslation } from '../../../../../../node_modules/react-i18next';

export function PasswordCard({ passwordForm, passwordLoading, passwordFormValid, onSubmit }) {
  const { t } = useTranslation();

  return (
    <form onSubmit={passwordForm.onSubmit(onSubmit)}>
      <Stack gap="md">
        <PasswordInput
          label={t('admin-AdminPages-UserSettings-current-password')}
          placeholder={t('admin-AdminPages-UserSettings-enter-current-password')}
          required
          size="sm"
          radius="md"
          {...passwordForm.getInputProps('currentPassword')}
        />
        <PasswordInput
          label={t('admin-AdminPages-UserSettings-new-password')}
          placeholder={t('admin-AdminPages-UserSettings-enter-new-password')}
          required
          size="sm"
          radius="md"
          {...passwordForm.getInputProps('newPassword')}
        />
        <PasswordInput
          label={t('admin-AdminPages-UserSettings-confirm-new-password')}
          placeholder={t('admin-AdminPages-UserSettings-confirm-new-password-placeholder')}
          required
          size="sm"
          radius="md"
          {...passwordForm.getInputProps('confirmPassword')}
        />
        <Group justify="flex-end">
          <Button type="submit" color="blue" radius="md" loading={passwordLoading} disabled={!passwordFormValid || passwordLoading}>
            {t('admin-AdminPages-UserSettings-update-password')}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
