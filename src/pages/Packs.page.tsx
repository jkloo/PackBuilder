import { CardTable } from "@/components/CardTable/CardTable";
import { FoilingIndicator } from "@/components/FoilingIndicator/FoilingIndicator";
import { PitchIndicator } from "@/components/PitchIndicator/PitchIndicator";
import { CardModel } from "@/Models/Card.model";
import { AppShell, Container, Space, Stack, Title, Text, Combobox, InputBase, useCombobox, Group } from "@mantine/core";
import { useEffect, useState } from "react";

export function Packs() { 
  const [packCards, setPackCards] = useState([] as CardModel[])

  return (
    <AppShell.Main>
      <Container>
        <Stack>
        <Title>Pack Builder</Title>

        <CardSearch set="SEA" onSelect={(selected)=>{setPackCards([selected, ...packCards])}}/>
        <CardTable cards={packCards}/>
        </Stack>
      </Container>
    </AppShell.Main>
  );
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

interface CardSearchProps {
  set?: string
  includeExpansionSlot?: boolean
  onSelect(card: CardModel): void
}

export function CardSearch({set, includeExpansionSlot=false, onSelect}: CardSearchProps) {
 const [cards, setCards] = useState([] as CardModel[]);
 const [cardsInSet, setCardsInSet] = useState([] as CardModel[]);
 const [cardLookup, setCardLookUp] = useState(new Map<string, CardModel>());

 useEffect(() => {
    const load = async () => {
      const json = await fetch("/card-flattened.json").then(r => r.json())
      setCards(json)
    }
    load()

    return () => {
      setCards([])
    };
  }, []);

  useEffect(() => {
    const map = cards.reduce((acc, card) => acc.set(card.printing_unique_id, card), new Map());
    setCardLookUp(map)
  }, [cards])

  useEffect(() => {
    const filtered = cards.filter((card) => {
      return [
        set ? card.set_id == set : true,
        includeExpansionSlot ? true : !card.expansion_slot
      ].every(Boolean)
    })
    setCardsInSet(filtered)
  }, [cards, set, includeExpansionSlot])

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
          placeholder="Search value"
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
