import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from '../../../../../node_modules/react-i18next';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Container, Paper, Title, Text, Stack, Tabs, Skeleton } from '@mantine/core';
import { IconCheck, IconShield, IconTrash, IconUser } from '@tabler/icons-react';
import { useUserContext } from '../../../../context/userContext';
import { sellerApi } from '../../../../Services/Api/seller/sellerApi';
import { ProfilePanel } from './components/ProfilePanel';
import { SecuritySummary } from './components/SecuritySummary';
import { SecurityPanel } from './components/SecurityPanel';
import {
  DeleteAccountModal,
  LogoutAllDevicesModal,
  SecurityDetailsModal,
  TwoFactorModal,
} from './components/SettingsModals';
import { themeColor } from '../../../../App';

export default function UserSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [logoutModalOpened, setLogoutModalOpened] = useState(false);
  const [securityDetailsOpened, setSecurityDetailsOpened] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [userData, setUserData] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [twoFactorLoading, setTwoFactorLoading] = useState(false);
  const [emailVerificationLoading, setEmailVerificationLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorModalOpened, setTwoFactorModalOpened] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { t } = useTranslation();
  const tRef = useRef(t);
  useEffect(() => {
    tRef.current = t;
  }, [t]);

  const { setUser } = useUserContext();

  const profileForm = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : t('seller.pages.settings.validation.emailError')),
    },
  });

  const profileFormRef = useRef(profileForm);
  useEffect(() => {
    profileFormRef.current = profileForm;
  }, [profileForm]);

  const passwordForm = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      newPassword: (value) => (value.length < 8 ? t('seller.pages.settings.validation.passwordError') : null),
      confirmPassword: (value, values) =>
        value !== values.newPassword ? t('seller.pages.settings.validation.confirmPasswordError') : null,
    },
  });

  const LOCAL_STORAGE_TAB_KEY = 'sellerUserSettingsActiveTab';

  useEffect(() => {
    const savedTab = localStorage.getItem(LOCAL_STORAGE_TAB_KEY);
    if (savedTab) {
      setActiveTab(savedTab);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }
    localStorage.setItem(LOCAL_STORAGE_TAB_KEY, activeTab);
  }, [activeTab, isMounted]);

  useEffect(() => {
    const loadAdminProfile = async () => {
      setLoading(true);

      try {
        const [{ data: profile }, { data: sessionData }] = await Promise.all([
          sellerApi.getCurrentSeller(),
          sellerApi.getSessions(),
        ]);

        const user = profile.user;
        setUser(user);
        setUserData(user);
        profileFormRef.current?.setValues({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
        });

        setSessions(sessionData.sessions || []);
      } catch (error) {
        notifications.show({
          title: tRef.current('seller.pages.settings.unableLoadProfile.title'),
          message: error?.response?.data?.message || tRef.current('seller.pages.settings.unableLoadProfile.message'),
          color: 'red',
          radius: 'md',
        });
      } finally {
        setLoading(false);
      }
    };

    loadAdminProfile();
  }, [setUser]);

  const handleAvatarChange = (file) => {
    setAvatarFile(file);

    if (!file) {
      setAvatarPreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const formatSessionLastActive = (value) => {
    if (!value) {
      return t('seller.pages.settings.activeSessions.unknown');
    }

    const date = typeof value === 'number' ? new Date(value * 1000) : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const simplifyUserAgent = (userAgent) => {
    if (!userAgent) {
      return t('seller.pages.settings.activeSessions.unknownDevice');
    }

    const normalized = userAgent.replace(/\s+/g, ' ');
    const browserMatches = [
      ['Opera', /OPR\//i],
      ['Edge', /Edg(e|A|iOS)?\//i],
      ['Chrome', /Chrome\//i],
      ['Firefox', /Firefox\//i],
      ['Safari', /Safari\//i],
    ];
    const osMatches = [
      ['macOS', /Macintosh/i],
      ['Windows', /Windows NT/i],
      ['Android', /Android/i],
      ['iOS', /iPhone|iPad|iPod/i],
      ['Linux', /Linux/i],
    ];

    const browser = browserMatches.reduce((match, [name, regex]) => match || (regex.test(normalized) ? name : null), null) || 'Browser';
    const os = osMatches.reduce((match, [name, regex]) => match || (regex.test(normalized) ? name : null), null) || 'OS';

    return `${browser} on ${os}`;
  };

  const profileHasChanges = useMemo(() => {
    if (!userData) {
      return false;
    }

    return (
      profileForm.values.name !== (userData.name || '') ||
      profileForm.values.email !== (userData.email || '') ||
      profileForm.values.phone !== (userData.phone || '') ||
      Boolean(avatarFile)
    );
  }, [profileForm.values, avatarFile, userData]);

  const passwordFormValid = useMemo(() => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm.values;
    return (
      currentPassword.trim().length > 0 &&
      newPassword.trim().length >= 8 &&
      confirmPassword === newPassword &&
      !passwordForm.errors.newPassword &&
      !passwordForm.errors.confirmPassword
    );
  }, [passwordForm.values, passwordForm.errors]);

  const canSendVerification = Boolean(userData && !userData.email_verified_at && !emailVerificationLoading);
  const canLogoutAllDevices = sessions.length > 0 && !logoutLoading;

  const handleUpdateProfile = async (values) => {
    if (!profileHasChanges) {
      notifications.show({
        title: t('seller.pages.settings.messages.noChanges.title'),
        message: t('seller.pages.settings.messages.noChanges.message'),
        color: 'blue',
        radius: 'md',
      });
      return;
    }

    setProfileLoading(true);
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', values.phone || '');
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    try {
      const { data } = await sellerApi.updateProfile(formData);
      setUser(data.user);
      setUserData(data.user);
      profileForm.setValues({
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone || '',
      });

      if (data.user.profile_photo_url) {
        setAvatarPreview(`${data.user.profile_photo_url}?v=${Date.now()}`);
      } else {
        setAvatarPreview(null);
      }
      setAvatarFile(null);

      notifications.show({
        title: t('seller.pages.settings.messages.profileUpdated.title'),
        message: t('seller.pages.settings.messages.profileUpdated.message'),
        color: 'green',
        icon: <IconCheck size={16} />,
        radius: 'md',
      });
    } catch (error) {
      notifications.show({
        title: t('seller.pages.settings.messages.unableUpdateProfile.title'),
        message: error?.response?.data?.message || t('seller.pages.settings.messages.unableUpdateProfile.message'),
        color: 'red',
        radius: 'md',
      });
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordLoading(true);

    try {
      await sellerApi.changePassword(passwordForm.values);
      notifications.show({
        title: t('seller.pages.settings.messages.passwordChanged.title'),
        message: t('seller.pages.settings.messages.passwordChanged.message'),
        color: 'green',
        icon: <IconCheck size={16} />,
        radius: 'md',
      });
      passwordForm.reset();
    } catch (error) {
      notifications.show({
        title: t('seller.pages.settings.messages.unableChangePassword.title'),
        message: error?.response?.data?.message || t('seller.pages.settings.messages.unableChangePassword.message'),
        color: 'red',
        radius: 'md',
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleToggleTwoFactor = useCallback(
    async (enabled) => {
      setTwoFactorLoading(true);

      try {
        const { data } = await sellerApi.toggleTwoFactor(enabled);
        setUser(data.user);
        setUserData(data.user);

        if (enabled) {
          setTwoFactorModalOpened(true);
          notifications.show({
            title: t('seller.pages.settings.messages.twoFactorVerificationSent.title'),
            message: t('seller.pages.settings.messages.twoFactorVerificationSent.message'),
            color: 'green',
            icon: <IconCheck size={16} />,
            radius: 'md',
          });
        } else {
          setTwoFactorModalOpened(false);
          setTwoFactorCode('');
          notifications.show({
            title: data.message,
            color: 'green',
            icon: <IconCheck size={16} />,
            radius: 'md',
          });
        }
      } catch (error) {
        notifications.show({
          title: t('seller.pages.settings.messages.unableUpdateTwoFactor.title'),
          message: error?.response?.data?.message || t('seller.pages.settings.messages.unableUpdateTwoFactor.message'),
          color: 'red',
          radius: 'md',
        });
      } finally {
        setTwoFactorLoading(false);
      }
    },
    [setUser, t],
  );

  const handleConfirmTwoFactor = async () => {
    setTwoFactorLoading(true);

    try {
      const { data } = await sellerApi.verifyTwoFactor({
        email: userData.email,
        code: twoFactorCode,
      });

      setUser(data.user);
      setUserData(data.user);
      setTwoFactorModalOpened(false);
      setTwoFactorCode('');

      notifications.show({
        title: t('seller.pages.settings.messages.twoFactorEnabled.title'),
        message: t('seller.pages.settings.messages.twoFactorEnabled.message'),
        color: 'green',
        icon: <IconCheck size={16} />,
        radius: 'md',
      });
    } catch (error) {
      notifications.show({
        title: t('seller.pages.settings.messages.invalidCode.title'),
        message: error?.response?.data?.message || t('seller.pages.settings.messages.invalidCode.message'),
        color: 'red',
        radius: 'md',
      });
    } finally {
      setTwoFactorLoading(false);
    }
  };

  const handleCancelTwoFactorSetup = async () => {
    setTwoFactorLoading(true);

    try {
      const { data } = await sellerApi.toggleTwoFactor(false);
      setUser(data.user);
      setUserData(data.user);
      setTwoFactorModalOpened(false);
      setTwoFactorCode('');
      notifications.show({
        title: t('seller.pages.settings.messages.twoFactorCancelled.title'),
        message: t('seller.pages.settings.messages.twoFactorCancelled.message'),
        color: 'gray',
        radius: 'md',
      });
    } catch (error) {
      notifications.show({
        title: t('seller.pages.settings.messages.unableCancelTwoFactor.title'),
        message: error?.response?.data?.message || t('seller.pages.settings.messages.unableCancelTwoFactor.message'),
        color: 'red',
        radius: 'md',
      });
    } finally {
      setTwoFactorLoading(false);
    }
  };

  const handleLogoutAllDevices = async () => {
    setLogoutLoading(true);

    try {
      await sellerApi.logoutOtherDevices();
      const { data } = await sellerApi.getSessions();
      setSessions(data.sessions || []);
      notifications.show({
        title: t('seller.pages.settings.messages.loggedOut.title'),
        message: t('seller.pages.settings.messages.loggedOut.message'),
        color: 'green',
        icon: <IconCheck size={16} />,
        radius: 'md',
      });
      setLogoutModalOpened(false);
    } catch (error) {
      notifications.show({
        title: t('seller.pages.settings.messages.unableLogout.title'),
        message: error?.response?.data?.message || t('seller.pages.settings.messages.unableLogout.message'),
        color: 'red',
        radius: 'md',
      });
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleSendVerificationEmail = useCallback(async () => {
    setEmailVerificationLoading(true);

    try {
      await sellerApi.sendEmailVerification();
      notifications.show({
        title: t('seller.pages.settings.messages.verificationSent.title'),
        message: t('seller.pages.settings.messages.verificationSent.message'),
        color: 'green',
        icon: <IconCheck size={16} />,
        radius: 'md',
      });
    } catch (error) {
      notifications.show({
        title: t('seller.pages.settings.messages.unableSendVerification.title'),
        message: error?.response?.data?.message || t('seller.pages.settings.messages.unableSendVerification.message'),
        color: 'red',
        radius: 'md',
      });
    } finally {
      setEmailVerificationLoading(false);
    }
  }, [t]);

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);

    try {
      await sellerApi.deleteAccount({ password: deletePassword });
      notifications.show({
        title: t('seller.pages.settings.messages.accountDeleted.title'),
        message: t('seller.pages.settings.messages.accountDeleted.message'),
        color: 'red',
        icon: <IconTrash size={16} />,
        radius: 'md',
      });
      setDeleteModalOpened(false);
      window.setTimeout(() => {
        window.location.href = '/';
      }, 1200);
    } catch (error) {
      notifications.show({
        title: t('seller.pages.settings.messages.unableDeleteAccount.title'),
        message: error?.response?.data?.message || t('seller.pages.settings.messages.unableDeleteAccount.message'),
        color: 'red',
        radius: 'md',
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const securitySteps = useMemo(() => {
    return [
      {
        key: 'verify-email',
        title: t('seller.pages.settings.security.steps.verifyEmail.title'),
        description: t('seller.pages.settings.security.steps.verifyEmail.description'),
        completed: Boolean(userData?.email_verified_at),
      },
      {
        key: 'enable-2fa',
        title: t('seller.pages.settings.security.steps.twoFactor.title'),
        description: t('seller.pages.settings.security.steps.twoFactor.description'),
        completed: Boolean(userData?.two_factor_enabled),
      },
      {
        key: 'complete-profile',
        title: t('seller.pages.settings.security.steps.completeProfile.title'),
        description: t('seller.pages.settings.security.steps.completeProfile.description'),
        completed: Boolean(userData?.name && userData?.email),
      },
    ];
  }, [t, userData]);

  const securityCompletion = useMemo(() => {
    const completedSteps = securitySteps.filter((step) => step.completed).length;
    return Math.round((completedSteps / securitySteps.length) * 100);
  }, [securitySteps]);

  const securityFraction = useMemo(() => {
    const completedSteps = securitySteps.filter((step) => step.completed).length;
    return `${completedSteps}/${securitySteps.length}`;
  }, [securitySteps]);

  const securityColor = useMemo(() => {
    const completedSteps = securitySteps.filter((step) => step.completed).length;
    if (completedSteps === securitySteps.length) {
      return 'green';
    }
    if (completedSteps === securitySteps.length - 1) {
      return 'yellow';
    }
    return 'red';
  }, [securitySteps]);

  const twoFactorPending = userData?.two_factor_setup_pending;
  const twoFactorActive = userData?.two_factor_enabled || twoFactorPending;
  const avatarSrc = avatarPreview ?? userData?.profile_photo_url;

  if (loading) {
    return (
      <Container fluid >
        <Stack spacing="xs" >
          <Skeleton height={44} width="35%" radius="lg" />
          <Skeleton height={18} width="55%" radius="lg" />
          <Paper withBorder p="xl" radius="md" style={{ }}>
            <Skeleton height={24} width="80%" radius="lg" mb="md" />
            <Stack spacing="lg">
              <Skeleton height={220} radius="md" />
              <Skeleton height={220} radius="md" />
            </Stack>
          </Paper>
          <Paper withBorder p="xl" radius="md">
            <Skeleton height={24} width="70%" radius="lg" mb="md" />
            <Skeleton height={180} radius="md" />
          </Paper>
        </Stack>
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container fluid h="100%">
        <Text c="dimmed">{t('seller.pages.settings.errors.unableLoadSettings')}</Text>
      </Container>
    );
  }

  return (
    <Container fluid  >
      <div style={{ marginBottom: '32px' }}>
        <Title
          order={2}
          style={{
            fontWeight: 700,
            WebkitBackgroundClip: 'text',
            marginBottom: '8px',
          }}
        >
          {t('seller.pages.settings.title')}
        </Title>
        <Text c="dimmed" size="sm">
          {t('seller.pages.settings.description')}
        </Text>
      </div>

      <SecuritySummary
        completion={securityCompletion}
        fraction={securityFraction}
        color={securityColor}
        onOpenDetails={() => setSecurityDetailsOpened(true)}
      />

      <SecurityDetailsModal
        opened={securityDetailsOpened}
        onClose={() => setSecurityDetailsOpened(false)}
        securitySteps={securitySteps}
      />

      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        variant="default"
        radius="md"
        styles={{
          tab: {
            fontWeight: 500,
            fontSize: '14px',
            transition: 'all 0.2s ease',
            '&[data-active]': {
              color: themeColor[6],
            },
          },
          list: {
            marginBottom: '24px',
          },
        }}
      >
        <Tabs.List
          style={{
            overflowX: 'auto',
            overflowY: 'hidden',
            flexWrap: 'nowrap',
            whiteSpace: 'nowrap',
            scrollbarWidth: 'thin',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <Tabs.Tab value="profile" leftSection={<IconUser size={18} />}>
            {t('seller.pages.settings.tabs.profile')}
          </Tabs.Tab>
          <Tabs.Tab value="security" leftSection={<IconShield size={18} />}>
            {t('seller.pages.settings.tabs.security')}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="profile">
          <ProfilePanel
            userData={userData}
            avatarSrc={avatarSrc}
            avatarFile={avatarFile}
            profileForm={profileForm}
            profileHasChanges={profileHasChanges}
            profileLoading={profileLoading}
            handleUpdateProfile={handleUpdateProfile}
            handleAvatarChange={handleAvatarChange}
            onRemoveAvatar={() => {
              setAvatarFile(null);
              setAvatarPreview(null);
            }}
            canSendVerification={canSendVerification}
            emailVerificationLoading={emailVerificationLoading}
            handleSendVerificationEmail={handleSendVerificationEmail}
          />
        </Tabs.Panel>

        <Tabs.Panel value="security">
          <SecurityPanel
            userData={userData}
            twoFactorActive={twoFactorActive}
            twoFactorPending={twoFactorPending}
            twoFactorLoading={twoFactorLoading}
            logoutLoading={logoutLoading}
            sessions={sessions}
            canLogoutAllDevices={canLogoutAllDevices}
            passwordForm={passwordForm}
            passwordLoading={passwordLoading}
            passwordFormValid={passwordFormValid}
            handleChangePassword={handleChangePassword}
            handleToggleTwoFactor={handleToggleTwoFactor}
            setLogoutModalOpened={setLogoutModalOpened}
            setDeleteModalOpened={setDeleteModalOpened}
            simplifyUserAgent={simplifyUserAgent}
            formatSessionLastActive={formatSessionLastActive}
          />
        </Tabs.Panel>
      </Tabs>

      <DeleteAccountModal
        opened={deleteModalOpened}
        onClose={() => {
          setDeleteModalOpened(false);
          setDeleteConfirmation('');
          setDeletePassword('');
        }}
        deleteConfirmation={deleteConfirmation}
        deletePassword={deletePassword}
        onChangeConfirmation={(event) => setDeleteConfirmation(event.currentTarget.value)}
        onChangePassword={(event) => setDeletePassword(event.currentTarget.value)}
        onDelete={handleDeleteAccount}
        deleteLoading={deleteLoading}
      />

      <LogoutAllDevicesModal
        opened={logoutModalOpened}
        onClose={() => setLogoutModalOpened(false)}
        onConfirm={handleLogoutAllDevices}
        logoutLoading={logoutLoading}
      />

      <TwoFactorModal
        opened={twoFactorModalOpened}
        onConfirm={handleConfirmTwoFactor}
        onCancel={handleCancelTwoFactorSetup}
        twoFactorCode={twoFactorCode}
        onChangeCode={(event) => setTwoFactorCode(event.currentTarget.value)}
        twoFactorLoading={twoFactorLoading}
      />
    </Container>
  );
}
