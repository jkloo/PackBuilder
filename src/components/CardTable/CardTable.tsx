import { useState } from 'react';
import cx from 'clsx';
import { Checkbox, Group, Image, ScrollArea, Stack, Table, Text } from '@mantine/core';
import classes from './CardTable.module.css';
import { CardModel } from '@/Models/Card.model';
import { PitchIndicator } from '@/components/PitchIndicator/PitchIndicator';
import { FoilingIndicator } from '../FoilingIndicator/FoilingIndicator';


export function CardTable({cards}: {cards:CardModel[]}) {
  const [selection, setSelection] = useState([] as string[]);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) => (current.length === cards.length ? [] : cards.map((item) => item.printing_unique_id)));

  const keyForCard = (card: CardModel, index: number) => (`${index}-${card.printing_unique_id}`)

  const rows = cards.map((item, index) => {
    const selected = selection.includes(keyForCard(item, index));
    return (
      <Table.Tr key={keyForCard(item, index)} className={cx({ [classes.rowSelected]: selected })}>
        <Table.Td>
          <Checkbox checked={selection.includes(keyForCard(item, index))} onChange={() => toggleRow(keyForCard(item, index))} />
        </Table.Td>
        <Table.Td>
            <Image src={item.image_url} w={48} h="auto" fit="contain"/>
        </Table.Td>
        <Table.Td><PitchIndicator pitch={item.pitch}/></Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Stack gap='0'>
                <Text size="md" fw={700}>{item.name}</Text>
                <Text size="sm">{item.id}</Text>
            </Stack>
          </Group>
        </Table.Td>
        <Table.Td>
            <FoilingIndicator foiling={item.foiling}/>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={640} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={40}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === cards.length}
                indeterminate={selection.length > 0 && selection.length !== cards.length}
              />
            </Table.Th>
            <Table.Th>Image</Table.Th>
            <Table.Th>Pitch</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Foiling</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}