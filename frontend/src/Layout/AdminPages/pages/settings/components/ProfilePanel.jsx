import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import {
  Avatar,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Tooltip,
  Divider,
  Card,
} from '@mantine/core';
import { IconCheck, IconCircleCheck, IconCircleX, IconPhotoEdit, IconTrash, IconMailForward } from '@tabler/icons-react';
import { useTranslation } from '../../../../../../node_modules/react-i18next';

export function ProfilePanel({
  userData,
  avatarSrc,
  avatarFile,
  profileForm,
  profileHasChanges,
  profileLoading,
  handleUpdateProfile,
  handleAvatarChange,
  onRemoveAvatar,
  canSendVerification,
  emailVerificationLoading,
  handleSendVerificationEmail,
}) {
  const { t } = useTranslation();
  const [avatarHover, setAvatarHover] = useState(false);
  const avatarInputRef = useRef(null);
  const isLargeScreen = useMediaQuery('(min-width: 992px)');
  const isMediumScreen = useMediaQuery('(min-width: 768px)');
  const avatarSize = isLargeScreen ? 160 : isMediumScreen ? 140 : 120;

  const openAvatarDialog = () => {
    avatarInputRef.current?.click();
  };

  return (
    <Paper
      withBorder
      radius="md"
      style={{
        backgroundColor: 'white',
        overflow: 'hidden',
      }}
    >
      <form onSubmit={profileForm.onSubmit(handleUpdateProfile)}>
        <Stack gap={0}>
          {/* Header */}
          <Card style={{ padding: '24px 32px' }} radius={'none'}>
            <Text fw={600} size="lg">
              {t('admin.pages.settings.profileSettings')}
            </Text>
            <Text size="sm" c="dimmed" style={{ marginTop: 4 }}>
              {t('admin.pages.settings.manageProfileInfo')}
            </Text>
          </Card>

          {/* Content */}
          <Card style={{ padding: '10px' }} radius={'none'}>
            <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="sm">
              {/* Avatar Section */}
              <Paper withBorder radius="md" p="xl" >
                <Stack align="center" gap="lg" style={{ width: '100%' }}>
                  <Text fw={500} size="sm" c="dimmed" tt="uppercase" ta="center" letterSpacing={0.5}>
                    {t('admin.pages.settings.profilePicture.title')}
                  </Text>

                  <div
                    style={{
                      position: 'relative',
                      display: 'inline-flex',
                      width: avatarSize,
                      height: avatarSize,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setAvatarHover(true)}
                    onMouseLeave={() => setAvatarHover(false)}
                    onClick={openAvatarDialog}
                  >
                    <Avatar
                      size="100%"
                      src={avatarSrc}
                      color="blue"
                      style={{
                        width: avatarSize,
                        height: avatarSize,
                        borderRadius: '50%',
                        border: '3px solid white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      {!avatarSrc && (
                        <Text size={avatarSize / 2.5} fw={600}>
                          {userData.name?.charAt(0).toUpperCase()}
                        </Text>
                      )}
                    </Avatar>
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: avatarHover ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
                        transition: 'background 150ms ease',
                      }}
                    >
                      {avatarHover && <IconPhotoEdit size={32} style={{ color: 'white' }} />}
                    </div>
                  </div>

                  <Stack gap="sm" style={{ width: '100%', maxWidth: 260 }}>
                    <Text size="xs" c="dimmed" ta="center">
                      {t('admin.pages.settings.profilePicture.description')}
                    </Text>
                    <Button
                      fullWidth
                      variant="default"
                      onClick={openAvatarDialog}
                      radius="md"
                      leftSection={<IconPhotoEdit size={16} />}
                    >
                      {t('admin.pages.settings.profilePicture.changePhoto')}
                    </Button>
                    {avatarFile && (
                      <Button
                        fullWidth
                        variant="default"
                        color="red"
                        onClick={onRemoveAvatar}
                        radius="md"
                        leftSection={<IconTrash size={16} />}
                      >
                        {t('admin.pages.settings.profilePicture.removeButton')}
                      </Button>
                    )}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      ref={avatarInputRef}
                      style={{ display: 'none' }}
                      onChange={(event) => handleAvatarChange(event.currentTarget.files?.[0] ?? null)}
                    />
                  </Stack>
                </Stack>
              </Paper>

              {/* Personal Information Section */}
              <Paper withBorder radius="md" p="xl">
                <Stack gap="lg" style={{ width: '100%' }}>
                  <Text fw={500} size="sm" c="dimmed" tt="uppercase" letterSpacing={0.5}>
                    {t('admin.pages.settings.personalInformation')}
                  </Text>

                  <Divider />

                  <Stack gap="md">
                    {/* Name Field */}
                    <div>
                      <Text size="sm" fw={500} mb={6}>
                        {t('admin.pages.settings.fullName.label')} <span style={{ color: '#fa5252' }}>*</span>
                      </Text>
                      <TextInput
                        placeholder={t('admin.pages.settings.fullName.placeholder')}
                        size="sm"
                        radius="md"
                        {...profileForm.getInputProps('name')}
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <Text size="sm" fw={500} mb={6}>
                        {t('admin.pages.settings.email.label')} <span style={{ color: '#fa5252' }}>*</span>
                      </Text>
                      <TextInput
                        placeholder={t('admin.pages.settings.email.placeholder')}
                        size="sm"
                        radius="md"
                        {...profileForm.getInputProps('email')}
                        rightSection={
                          userData.email_verified_at ? (
                            <Tooltip label={t('admin.pages.settings.email.verified')} position="top-end" withArrow>
                              <IconCircleCheck size={18} color="#40c057" />
                            </Tooltip>
                          ) : (
                            <Tooltip label={t('admin.pages.settings.email.notVerified')} position="top-end" withArrow>
                              <IconCircleX size={18} color="#fa5252" />
                            </Tooltip>
                          )
                        }
                      />
                    </div>

                    {/* Email Verification Notice */}
                    {!userData.email_verified_at && (
                      <Paper withBorder p="sm" radius="md" >
                        <Group justify="space-between" align="center" wrap="wrap" gap="sm">
                          <Text size="xs" c="red">
                            {t('admin.pages.settings.email.notVerifiedMessage')}
                          </Text>
                          <Button
                            variant="light"
                            color="red"
                            size="xs"
                            radius="md"
                            leftSection={<IconMailForward size={14} />}
                            loading={emailVerificationLoading}
                            onClick={handleSendVerificationEmail}
                            disabled={!canSendVerification}
                          >
                            {t('admin.pages.settings.email.sendVerification')}
                          </Button>
                        </Group>
                      </Paper>
                    )}

                    {/* Phone Field */}
                    <div>
                      <Text size="sm" fw={500} mb={6}>
                        {t('admin.pages.settings.phone.label')}
                      </Text>
                      <TextInput
                        placeholder={t('admin.pages.settings.phone.placeholder')}
                        size="sm"
                        radius="md"
                        {...profileForm.getInputProps('phone')}
                      />
                    </div>
                  </Stack>
                </Stack>
              </Paper>
            </SimpleGrid>

            {/* Action Buttons */}
            <Group justify="flex-end" mt="sm">
              <Button
                type="submit"
                size="sm"
                radius="md"
                leftSection={<IconCheck size={18} />}
                loading={profileLoading}
                disabled={!profileHasChanges || profileLoading}
              >
                {t('admin.pages.settings.saveChanges')}
              </Button>
            </Group>
          </Card>
        </Stack>
      </form>
    </Paper>
  );
}

ProfilePanel.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    email_verified_at: PropTypes.string,
  }).isRequired,
  avatarSrc: PropTypes.string,
  avatarFile: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(File)]),
  profileForm: PropTypes.object.isRequired,
  profileHasChanges: PropTypes.bool.isRequired,
  profileLoading: PropTypes.bool.isRequired,
  handleUpdateProfile: PropTypes.func.isRequired,
  handleAvatarChange: PropTypes.func.isRequired,
  onRemoveAvatar: PropTypes.func.isRequired,
  canSendVerification: PropTypes.bool.isRequired,
  emailVerificationLoading: PropTypes.bool.isRequired,
  handleSendVerificationEmail: PropTypes.func.isRequired,
};