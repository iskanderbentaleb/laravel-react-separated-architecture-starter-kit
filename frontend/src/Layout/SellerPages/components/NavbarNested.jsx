import { Divider, ScrollArea } from '@mantine/core';
import {
  IconBolt,
  IconCategory,
} from '@tabler/icons-react';
// import { UserButton } from '../UserButton/UserButton';
import { ADMIN_CATEGORIES_ROUTE, ADMIN_DASHBOARD_ROUTE, SELLER_DASHBOARD_ROUTE } from '../../../Router';
import { LinksGroup } from './NavbarLinksGroup/NavbarLinksGroup';
import classes from '../styles/NavbarNested.module.css';

import { useTranslation } from '../../../../node_modules/react-i18next';
import { SelectStore } from './SelectStore';

export default function NavbarNested() {

  const { t } = useTranslation();

  const mockdata = [
    {
      label: t('admin-AdminPages-Layout-NavbarNested-Parent-Quick-Link'),
      icon: IconBolt,
      initiallyOpened: true,
      links: [
        { label: t('admin-AdminPages-Layout-NavbarNested-Child-Dashboard'), link: SELLER_DASHBOARD_ROUTE },
        { label: t('admin-AdminPages-Layout-NavbarNested-Child-NEW-PRODUCTS'), link: '/' },
        { label: t('admin-AdminPages-Layout-NavbarNested-Child-NEW-COUPON'), link: '/' },
      ],
    },
    {
      label: t('admin-AdminPages-Layout-NavbarNested-Parent-CATALOG'),
      icon: IconCategory,
      links: [
        { label: t('admin-AdminPages-Layout-NavbarNested-Child-Products'), link: SELLER_DASHBOARD_ROUTE },
      ],
    },
  ];


  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
            <SelectStore />
      </div>

      {/* line */}
      <Divider size='xs' mt={18} />

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

    </nav>
  );
}