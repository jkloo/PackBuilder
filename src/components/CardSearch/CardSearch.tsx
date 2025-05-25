import { CardModel } from "@/Models/Card.model";
import { useCombobox, Combobox, Group, Stack, InputBase, Text, Flex, Select, Switch, Paper, Button, HoverCard, ActionIcon } from "@mantine/core";
import { useState, useEffect } from "react";
import { useAppStore } from "@/Store/store";
import { FoilingIndicator } from "../FoilingIndicator/FoilingIndicator";
import { PitchIndicator } from "../PitchIndicator/PitchIndicator";
import { IconAdjustments } from "@tabler/icons-react";

interface CardSearchProps {
  set?: string
  includeExpansionSlot?: boolean
  onSelect(card: CardModel): void
}

function getFilteredOptions(data: CardModel[], searchQuery: string, limit: number) {
  const result: CardModel[] = [];

  for (let i = 0; i < data.length; i += 1) {
    if (result.length === limit) {
      break;
    }

    if (data[i].name.toLowerCase().includes(searchQuery.trim().toLowerCase())) {
      result.push(data[i]);
    }
  }

  return result;
}

export function CardSearch({set, includeExpansionSlot=false, onSelect}: CardSearchProps) {
 const [includeFoils, setIncludeFoils] = useState(false);
 const [cardsInSet, setCardsInSet] = useState([] as CardModel[]);

 const cards = useAppStore((state) => state.datasetCards)
 const cardLookup = useAppStore((state) => state.datasetCardLookup)

  useEffect(() => {
    const filtered = cards.filter((card) => {
      return [
        set ? card.set_id == set : true,
        includeExpansionSlot ? true : !card.expansion_slot,
        includeFoils || card.foiling == 'S',
      ].every(Boolean)
    })
    setCardsInSet(filtered)
  }, [cards, set, includeExpansionSlot, includeFoils])

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filteredOptions = getFilteredOptions(cardsInSet, search, 7);

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item.printing_unique_id} key={item.printing_unique_id}>
      <Group>
        <PitchIndicator pitch={item.pitch}/>
        <Stack gap='0'>
          <Text size="md">{item.name}</Text>
          <Text size="xs">{item.id} - {item.foiling}</Text>
        </Stack>
        <FoilingIndicator foiling={item.foiling}/>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Group align="flex-end">
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val, props) => {
          setValue('');
          setSearch('');
          combobox.closeDropdown();
          combobox.resetSelectedOption();

          const card = cardLookup.get(val)
          if(card) { onSelect(card) }
        }}
      >
        <Combobox.Target>
          <InputBase
            flex={1}
            rightSection={<Combobox.Chevron />}
            value={search}
            onChange={(event) => {
              combobox.openDropdown();
              combobox.updateSelectedOptionIndex();
              setSearch(event.currentTarget.value);
            }}
            // onClick={() => combobox.openDropdown()}
            // onFocus={() => combobox.openDropdown()}
            onBlur={() => {
              combobox.closeDropdown();
            }}
            label="Search"
            placeholder="Search for a card"
            rightSectionPointerEvents="none"
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    
      <HoverCard>
        <HoverCard.Target>
            <ActionIcon variant="filled" aria-label="Settings" size='lg'>
               <IconAdjustments stroke={1.5} />
            </ActionIcon>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Stack justify="flex-start">
            <Select
              label="Set"
              placeholder="Pick value"
              data={['SEA']}
              value={'SEA'}
              readOnly
            />

            <Group justify="space-between">
              <Text>Include foils</Text>
              <Switch
                size="lg"
                checked={includeFoils}
                onChange={(event) => setIncludeFoils(event.currentTarget.checked)}
              />
            </Group>
          </Stack>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}
