import PropTypes from 'prop-types';
import { Paper, Group, ThemeIcon, Text, Badge, Button, Progress } from '@mantine/core';
import { IconShield } from '@tabler/icons-react';
import { useTranslation } from '../../../../../../node_modules/react-i18next';

export function SecuritySummary({ completion, fraction, color, onOpenDetails }) {
  const { t } = useTranslation();

  return (
    <Paper
      withBorder={true}
      p="md"
      radius="md"
      style={{
        boxShadow: '0 1px 2px rgba(34, 90, 122, 0.08)',
        marginBottom: '16px',
      }}
    >
      <Group position="apart" align="flex-start" noWrap>
        <Group spacing="sm" noWrap align="flex-start" style={{ flex: 1 }}>
          <ThemeIcon size="md" color={color} variant="light" radius="md">
            <IconShield size={16} />
          </ThemeIcon>
          <div>
            <Text fw={700} size="sm">
              {t('admin-AdminPages-UserSettings-security-progress-title')}
            </Text>
            <Text size="xs" c="dimmed" lineClamp={2}>
              {t('admin-AdminPages-UserSettings-security-progress-description')}
            </Text>
          </div>
        </Group>

        <Group spacing="xs" noWrap>
          {completion !== 100 && (
            <Button size="xs" variant="outline" radius="md" onClick={onOpenDetails}>
              {t('admin-AdminPages-UserSettings-security-details-button', { defaultValue: 'What to do ?' })}
            </Button>
          )}
          <Badge color={color} variant="light" size="sm">
            {fraction}
          </Badge>
        </Group>
      </Group>

      <Progress value={completion} color={color} mt="xs" radius="xl" size="xs" />
    </Paper>
  );
}

SecuritySummary.propTypes = {
  completion: PropTypes.number.isRequired,
  fraction: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onOpenDetails: PropTypes.func.isRequired,
};
