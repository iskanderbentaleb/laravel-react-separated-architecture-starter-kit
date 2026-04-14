import { Menu, Group, ActionIcon, rem, Text, Avatar, Divider, Box } from '@mantine/core';
import {
  IconLogout,
  IconSettings,
} from '@tabler/icons-react';
import { useUserContext } from '../../../context/userContext';
import { guestApi } from '../../../Services/Api/guest/guestApi';
import { useNavigate } from 'react-router-dom';
import { ADMIN_SETTINGS_ROUTE, LOGIN_ROUTE } from '../../../Router';
import { useTranslation } from '../../../../node_modules/react-i18next';
import { themeColor } from '../../../App';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';

export default function UserMenu() {
  const { t } = useTranslation();
  const { logout, User } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await guestApi.logout()
      .then(() => {
        logout();
        navigate(LOGIN_ROUTE);
        // Show success notification
        notifications.show({message: t('guest-guestPages-Authentication-logout-success-toast'),color: 'green'});
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  const userName = User?.name || 'username';
  const userEmail = User?.email || 'user@example.com';

    useEffect(()=>{
      console.log('UserMenu rendered with user:', User);  
    })

  return (
    <Group>
      <Menu
        withArrow
        width={280}
        position="bottom-end"
        transitionProps={{ transition: 'pop' }}
        withinPortal
        shadow="md"
      >
        <Menu.Target>
          <ActionIcon 
            variant="filled" 
            color={themeColor[6]}
            size={36} 
            radius="md"
            style={{ 
              border: '1px solid var(--mantine-color-blue-9)',
              transition: 'all 0.2s ease',
            }}
            className="hover:bg-gray-50"
          >
          <Avatar 
            size={36} 
            radius="sm" 
            style={{ cursor: 'pointer' }}
            color={'white'} 
            src={User?.profile_photo_url}
          >
            {!User?.profile_photo_url &&
              userName
              .split(' ')
              .map(word => word.charAt(0).toUpperCase())
              .join('')
              .slice(0, 3)}
          </Avatar>
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown style={{ borderRadius: rem(12) }}>
          {/* User Info Section */}
          <Box style={{ padding: `${rem(12)} ${rem(12)}` }}>
            <Text fw={600} size="sm" lineClamp={1}>
              {userName}
            </Text>
            <Text size="xs" c="dimmed" mt={4} lineClamp={1}>
              {userEmail}
            </Text>
          </Box>
          
          <Divider />

          {/* Menu Items */}
          <Menu.Item
            leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            onClick={() => { navigate(ADMIN_SETTINGS_ROUTE);}}
          >
            {t('admin-AdminPages-Layout-NavbarNested-settings')}
          </Menu.Item>

          <Divider />

          <Menu.Item
            onClick={handleLogout}
            leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            style={{ color: 'var(--mantine-color-red-6)' }}
          >
            {t('admin-AdminPages-Layout-NavbarNested-logout')}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}