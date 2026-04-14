import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const isDark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="default"
      size={36}
      radius={'md'}
      onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
    </ActionIcon>
  );
}