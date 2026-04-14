import { useState } from 'react';
import { Table, Grid, Button, Avatar, Modal, Pagination, Text, TextInput, Group, ActionIcon, rem } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import classes from '../styles/Main.module.css';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from '../../../../node_modules/react-i18next';

export default function Categories() {

  const { t } = useTranslation();

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedImage, setSelectedImage] = useState('');


  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { search: '' },
    validate: {
      search: (value) => alert(value)
    },
  });

  const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Baby Cloths' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Mens shorts' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ];

  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>

        <Group gap="lg">
          <Avatar
            style={{ cursor: 'pointer' }}
            size={50}
            onClick={() => {
              setSelectedImage('https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png');
              open();
            }}
            src={'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png'} radius={10} />

          <div>
            <Text fz="sm" fw={500}>
              {element.name}
            </Text>
          </div>
        </Group>

      </Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        <img src={selectedImage} alt="Selected" style={{ width: '100%' }} />
      </Modal>

      <div className={classes.flexcontainer}>
        <Text fw={700} ml={20}>{t('admin-AdminPages-Layout-NavbarNested-Child-Categories')}</Text>
        <Button radius="md"> {t('admin-AdminPages-Layout-main-header')} </Button>
      </div>

      <Grid className={classes.grid}>
        <form onSubmit={form.onSubmit(console.log)}>
          <div className={classes.SearchContainer}>
            <TextInput
              size="sm"
              radius="sm"
              placeholder={t('admin-AdminPages-Layout-main-search')}
              className={classes.search}
              {...form.getInputProps('search')}
            />
          </div>
        </form>

        <Grid.Col>
          <div className={classes.tableContainer}>
            <Table highlightOnHover verticalSpacing="sm">
              <Table.Thead className={classes.tableContainer}>
                <Table.Tr>
                  <Table.Th className={classes.minimizedHeader}>{t('admin-AdminPages-Layout-main-table-CATEGORY-NAME')}</Table.Th>
                  <Table.Th className={classes.minimizedHeader}>{t('admin-AdminPages-Layout-main-table-PARENT-CATEGORY')}</Table.Th>
                  <Table.Th className={classes.minimizedHeader}>{t('admin-AdminPages-Layout-main-table-STATUS')}</Table.Th>
                  <Table.Th className={classes.minimizedHeader}>{t('admin-AdminPages-Layout-main-table-INCLUDE-IN-MENU')}</Table.Th>
                  <Table.Th className={classes.minimizedHeader}></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </div>
          <div className={classes.paginationContainer}>
            <Pagination className={classes.pagination} total={10} size="sm" radius="md" />
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}
