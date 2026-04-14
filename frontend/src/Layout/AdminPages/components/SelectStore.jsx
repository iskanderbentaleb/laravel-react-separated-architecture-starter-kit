import { Combobox, Input, InputBase, useCombobox, Avatar, Group, Text, Box } from '@mantine/core';
import { useState } from 'react';

const stores = [
  { id: 1, name: 'Store 1', image: 'https://ui-avatars.com/api/?background=6366f1&color=fff&name=Store+1', initial: 'S1' },
  { id: 2, name: 'Store 2', image: 'https://ui-avatars.com/api/?background=ec4899&color=fff&name=Store+2', initial: 'S2' },
  { id: 3, name: 'Store 3', image: 'https://ui-avatars.com/api/?background=14b8a6&color=fff&name=Store+3', initial: 'S3' },
  { id: 4, name: 'Store 4', image: 'https://ui-avatars.com/api/?background=f59e0b&color=fff&name=Store+4', initial: 'S4' },
  { id: 5, name: 'Store 5', image: 'https://ui-avatars.com/api/?background=ef4444&color=fff&name=Store+5', initial: 'S5' },
  { id: 6, name: 'Store 6', image: 'https://ui-avatars.com/api/?background=8b5cf6&color=fff&name=Store+6', initial: 'S6' },
];

export function SelectStore() {
  const [search, setSearch] = useState('');
  const [value, setValue] = useState(null);
  
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      setSearch('');
    },
    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  const options = filteredStores.map((store) => (
    <Combobox.Option value={store.name} key={store.id}>
      <Group gap="sm">
        {store.image ? (
          <Avatar src={store.image} size="sm" radius="xl" />
        ) : (
          <Avatar color="blue" size="sm" radius="xl">
            {store.initial}
          </Avatar>
        )}
        <div>
          <Text size="sm" fw={500}>{store.name}</Text>
          <Text size="xs" c="dimmed">Click to select</Text>
        </div>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Box mx="auto">
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          const selectedStore = stores.find(store => store.name === val);
          setValue(selectedStore || null);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            pointer
            rightSection={<Combobox.Chevron />}
            onClick={() => combobox.toggleDropdown()}
            rightSectionPointerEvents="none"
            styles={{
              input: {
                height: 'auto',
                minHeight: 48,
              }
            }}
          >
            {value ? (
              <Group gap="sm">
                {value.image ? (
                  <Avatar src={value.image} size="sm" radius="xl" />
                ) : (
                  <Avatar color="blue" size="sm" radius="xl">
                    {value.initial}
                  </Avatar>
                )}
                <Text size="sm" fw={500}>{value.name}</Text>
              </Group>
            ) : (
              <Input.Placeholder>Select a store...</Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Search stores..."
          />
          <Combobox.Options>
            {options.length > 0 ? (
              options
            ) : (
              <Combobox.Empty>
                <Text ta="center" py="md" c="dimmed">No stores found</Text>
              </Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Box>
  );
}