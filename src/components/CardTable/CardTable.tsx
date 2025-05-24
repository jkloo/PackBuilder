import { useState } from 'react';
import cx from 'clsx';
import { Avatar, Checkbox, Group, Image, ScrollArea, Table, Text } from '@mantine/core';
import classes from './CardTable.module.css';
import { CardModel } from '@/Models/Card.model';


export function CardTable({cards}: {cards:CardModel[]}) {
  const [selection, setSelection] = useState(['1']);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) => (current.length === cards.length ? [] : cards.map((item) => item.printing_unique_id)));

  const rows = cards.map((item) => {
    const selected = selection.includes(item.printing_unique_id);
    return (
      <Table.Tr key={item.printing_unique_id} className={cx({ [classes.rowSelected]: selected })}>
        <Table.Td>
          <Checkbox checked={selection.includes(item.printing_unique_id)} onChange={() => toggleRow(item.printing_unique_id)} />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Image src={item.image_url} />
            <Text size="sm" fw={500}>
              {item.name}
            </Text>
            <Text size="xs" fw={500}>
              {item.id}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.name}</Table.Td>
        <Table.Td>{item.pitch}</Table.Td>
        <Table.Td>{item.foiling}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={40}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === cards.length}
                indeterminate={selection.length > 0 && selection.length !== cards.length}
              />
            </Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Pitch</Table.Th>
            <Table.Th>Foiling</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}