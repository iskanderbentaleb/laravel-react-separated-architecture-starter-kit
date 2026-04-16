import { Menu, Group, ActionIcon, rem, useDirection } from '@mantine/core';
import {
  IconLanguage,
  IconCheck,
} from '@tabler/icons-react';

import English from '../assets/lang/English';
import French from '../assets/lang/French';
import Arabic from '../assets/lang/Arabic';

import { useUserContext } from '../context/userContext';

// language traslation
import { useTranslation } from '../../node_modules/react-i18next';
// language traslation

export default function LanguagePicker() {

  // language traslation
  const { setLocale } = useUserContext();
  const { i18n , t } = useTranslation();
  const currentLang = i18n.language || 'en';
  
  const { setDirection } = useDirection();

  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLocale(lng);
    if (lng === 'ar') {
      setDirection('rtl');
    }else{
      setDirection('ltr');
    }
  };
  // language traslation

  return (
    <Group>
      <Menu
        withArrow
        width={250}
        position="bottom"
        transitionProps={{ transition: 'pop' }}
        zIndex={1000000}
        withinPortal
      >
        <Menu.Target>
          <ActionIcon variant="default" size={36} radius="md" sx={{ minWidth: rem(112), height: rem(38) }}>
            <IconLanguage style={{ width: rem(20), height: rem(20) }} stroke={1} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>

          <Menu.Item
            size={'sm'}
            leftSection={<English />}
            rightSection={currentLang === 'en' ? <IconCheck size={16} style={{ color: 'var(--m-color-blue-6)' }} /> : null}
            onClick={() => changeLanguage('en')}
            active={currentLang === 'en'}
          >
            {/* English */}
            {t('sharedWithAllUsersRoles.components.topbar.languagePicker.english')}
          </Menu.Item>

          <Menu.Item
            size={'sm'}
            leftSection={<French />}
            rightSection={currentLang === 'fr' ? <IconCheck size={16} style={{ color: 'var(--m-color-blue-6)' }} /> : null}
            onClick={() => changeLanguage('fr')}
            active={currentLang === 'fr'}
          >
            {/* Francais */}
            {t('sharedWithAllUsersRoles.components.topbar.languagePicker.french')}
          </Menu.Item>

          <Menu.Item
            size={'sm'}
            leftSection={<Arabic />}
            rightSection={currentLang === 'ar' ? <IconCheck size={16} style={{ color: 'var(--m-color-blue-6)' }} /> : null}
            onClick={() => changeLanguage('ar')}
            active={currentLang === 'ar'}
          >
            {/* Arabic */}
            {t('sharedWithAllUsersRoles.components.topbar.languagePicker.arabic')}
          </Menu.Item>


        </Menu.Dropdown>
      </Menu>


    </Group>
  );
}