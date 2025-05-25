import { CardSearch } from "@/components/CardSearch/CardSearch";
import { CardTable } from "@/components/CardTable/CardTable";
import { useAppStore } from "@/Store/store";
import { AppShell, Button, Container, Group, Stack, Title, Tooltip } from "@mantine/core";
import { useEffect, useState } from "react";

export function Packs() { 
  const packCards = useAppStore((state) => state.packBuilderCards)
  const addCard = useAppStore((state) => state.add)
  const clear = useAppStore((state) => state.clear)

  const [saveDisabled, setSaveDisabled] = useState(false)

  useEffect(() => {
    const valid = [
      packCards.length == 14,
      packCards.filter((c) => c.foiling == 'R').length == 1
    ].every(Boolean)
    setSaveDisabled(!valid)
  }, [packCards])

  const handleSave = () => {

  }

  const handleCancel = () => {
    clear()
  }

  return (
    <AppShell.Main>
      <Container>
        <Stack>
          <Group justify='space-between'>
            <Title>Pack Builder</Title>
            <Group>
              <Tooltip color="gray"
                label='A pack requires 14 cards and one rainbow foil.'
                disabled={!saveDisabled}
                multiline
                w={220}
              >
                <Button disabled={saveDisabled} onClick={handleSave}>Save</Button>
              </Tooltip>
              <Button variant="default" color="red" onClick={handleCancel}>Cancel</Button>
            </Group>
          </Group>
          <CardSearch set="SEA" onSelect={addCard}/>
          <CardTable cards={packCards}/>
        </Stack>
      </Container>
    </AppShell.Main>
  )
}
