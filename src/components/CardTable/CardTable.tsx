import { Button, Group, Image, Menu, Popover, ScrollArea, Stack, Table, Text } from '@mantine/core';
import { CardModel } from '@/Models/Card.model';
import { PitchIndicator } from '@/components/PitchIndicator/PitchIndicator';
import { FoilingIndicator } from '../FoilingIndicator/FoilingIndicator';
import { useCardAlternatives } from '@/Store/packBuilder';
import { useAppStore } from '@/Store/store';
import { RarityIndicator } from '../RarityIndicator/RarityIndicator';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconTrash } from '@tabler/icons-react';

const keyForCard = (card: CardModel, index: number) => (`${index}-${card.printing_unique_id}`)

interface Props {
  card: CardModel
  onSelect(card: CardModel): void
}

export function CardAlternativesSelector({card, onSelect}: Props) {

  const alternatives = useCardAlternatives(card, 'SEA')

  return (
    <Menu>
      <Menu.Target>
        <Button variant='default' p="xs">
          <Group gap="sm">
            <FoilingIndicator foiling={card.foiling}/>
            <IconChevronDown stroke={1.5}/>
          </Group>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {
          alternatives.map((alt) => (
            <Menu.Item key={alt.printing_unique_id} onClick={() => onSelect(alt)}>
              <FoilingIndicator foiling={alt.foiling}/>
            </Menu.Item>
          ))
        }
      </Menu.Dropdown>
    </Menu>
  )
}

export function CardTable({cards}: {cards:CardModel[]}) {
  // const [selection, setSelection] = useState([] as string[]);
  // const toggleRow = (id: string) => setSelection((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id] );
  // const toggleAll = () => setSelection((current) => (current.length === cards.length ? [] : cards.map((item) => item.printing_unique_id)));

  const replace = useAppStore((state) => state.replace)
  const remove = useAppStore((state) => state.remove)

  const handleDelete = (card: CardModel, index: number) => {
    remove(index)
  }

  const rows = cards.map((item, index) => {
    // const selected = selection.includes(keyForCard(item, index));
    return (
      <Table.Tr
        key={keyForCard(item, index)}
        // className={cx({ [classes.rowSelected]: selected })}
      >
        <Table.Td>
          <Text>{index + 1}</Text>
        </Table.Td>
        <Table.Td>
          <ImagePopover card={item}/>          
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
          <RarityIndicator rarity={item.rarity} />
        </Table.Td>
        <Table.Td>
          <CardAlternativesSelector card={item} onSelect={(alt) => replace(index, alt)}/>
        </Table.Td>
        <Table.Td>
          <Group justify='right'>
            <Button color='red' onClick={() => handleDelete(item, index)} variant="light">
              <IconTrash color='#CE423A'/>
            </Button>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={640} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Image</Table.Th>
            <Table.Th>Pitch</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Rarity</Table.Th>
            <Table.Th>Foiling</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}


function ImagePopover({card}: {card: CardModel}) {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Popover width={480} position="right" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Image src={card.image_url} w={50} h={70} fit="contain" onMouseEnter={open} onMouseLeave={close}/>
      </Popover.Target>
      <Popover.Dropdown p={0} style={{ pointerEvents: 'none' }}>
        <Image src={card.image_url} fit="contain"/>
      </Popover.Dropdown>
    </Popover>
  )
}