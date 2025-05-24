import { CardTable } from "@/components/CardTable/CardTable";
import { CardModel } from "@/Models/Card.model";
import { AppShell, Autocomplete, AutocompleteProps, Container, Group, Space, Stack, Title, Text, ComboboxItem, Flex, Avatar, ComboboxStringItem, Combobox, InputBase, useCombobox } from "@mantine/core";
import { useEffect, useState } from "react";

const toSelectOption = (card: CardModel): ComboboxStringItem => (
  {
    value: card.printing_unique_id,
  }
)

export function Packs() {
  const [cards, setCards] = useState([] as CardModel[]);
  const [cardLookUp, setCardLookUp] = useState(new Map<string, CardModel>());
  const [options, setOptions] = useState([] as ComboboxStringItem[]);

  const [packCards, setPackCards] = useState([] as CardModel[])

  const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => (
    <Group gap="sm">
      <Flex>
        <Avatar src={cardLookUp.get(option.value)?.image_url}/>
        <Stack>
          <Text size="sm">{cardLookUp.get(option.value)?.name}</Text>
          <Text size="sm">{cardLookUp.get(option.value)?.pitch}</Text>
          <Text size="xs">{cardLookUp.get(option.value)?.foiling}</Text>
        </Stack>
      </Flex>
    </Group>
  );

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
    const options = cards.map(toSelectOption)
    setOptions(options)
  }, [cards])

  useEffect(() => {
    const map = cards.reduce((acc, card) => acc.set(card.printing_unique_id, card), new Map());
    setCardLookUp(map)
  }, [cards])

  const [value, setValue] = useState('');

  return (
    <AppShell.Main>
      <Container>
        <Stack>
        <Title>Packs</Title>
        <Space/>

        <Autocomplete
          value={value}
          onChange={(value)=>{ console.log(value); setPackCards([cardLookUp.get(value)!, ...packCards]) }}
          label="Card search"
          placeholder="Use limit to optimize performance"
          limit={5}
          data={options}
          renderOption={renderAutocompleteOption}
        />

        </Stack>
      </Container>
    </AppShell.Main>
  );
}


function getFilteredOptions(data: string[], searchQuery: string, limit: number) {
  const result: string[] = [];

  for (let i = 0; i < data.length; i += 1) {
    if (result.length === limit) {
      break;
    }

    if (data[i].toLowerCase().includes(searchQuery.trim().toLowerCase())) {
      result.push(data[i]);
    }
  }

  return result;
}

export function SelectLimit() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filteredOptions = getFilteredOptions(MOCKDATA, search, 7);

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(val);
        setSearch(val);
        combobox.closeDropdown();
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
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || '');
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
