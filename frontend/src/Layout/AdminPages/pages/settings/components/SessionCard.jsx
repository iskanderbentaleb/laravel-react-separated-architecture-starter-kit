import { Badge, Card, Group, Text, ThemeIcon } from '@mantine/core';
import { IconDeviceLaptop } from '@tabler/icons-react';
import { useTranslation } from '../../../../../../node_modules/react-i18next';
import { themeColor } from '../../../../../App';

export function SessionCard({ session, simplifyUserAgent, formatSessionLastActive }) {
  const { t } = useTranslation();

  return (
    <Card
      withBorder
      p="md"
      radius="md"
    >
      <Group justify="space-between" align="flex-start">
        <Group align="flex-start">
          <ThemeIcon color={session.current ? themeColor[10] : 'gray'} variant="light" size="lg" radius="md">
            <IconDeviceLaptop size={18} />
          </ThemeIcon>
          <div>
            <Text fw={500} size="sm">
              {session.user_agent_readable || simplifyUserAgent(session.user_agent)}
            </Text>
            <Text size="xs" c="dimmed">
              {t('admin-AdminPages-UserSettings-ip-address')}: {session.ip_address || t('admin-AdminPages-UserSettings-session-unknown')}
            </Text>
            <Text size="xs" c="dimmed">
              {t('admin-AdminPages-UserSettings-last-activity')}: {formatSessionLastActive(session.last_active)}
            </Text>
          </div>
        </Group>
        {session.current && (
          <Badge color="blue" variant="light" radius="md">
            {t('admin-AdminPages-UserSettings-current-session')}
          </Badge>
        )}
      </Group>
    </Card>
  );
}
