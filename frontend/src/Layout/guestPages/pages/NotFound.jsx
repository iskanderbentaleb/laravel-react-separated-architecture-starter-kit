import { Container, Title, Text, Button, Group } from '@mantine/core';
import { IllustrationNotFound } from '../assets/IllustrationNotFound';
import classes from '../styles/NothingFoundBackground.module.css';
import { Link } from 'react-router-dom';

// language traslation
import { useTranslation } from '../../../../node_modules/react-i18next';
import { LANDING_ROUTE } from '../../../Router';

// language traslation

export default function NothingFoundBackground() {

  // language traslation
  const { t } = useTranslation();
  // language traslation

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <IllustrationNotFound className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>{t('guest.pages.notFound.title')}</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description}>
            {t('guest.pages.notFound.description')}
          </Text>
          <Group justify="center">
            <Link to={LANDING_ROUTE}>
              <Button color="themeColor.9" size="md">{t('guest.pages.notFound.button')}</Button>
            </Link>
          </Group>
        </div>
      </div>
    </Container>
  );
}
