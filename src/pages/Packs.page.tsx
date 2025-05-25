import { CardSearch } from "@/components/CardSearch/CardSearch";
import { CardTable } from "@/components/CardTable/CardTable";
import { useAppStore } from "@/Store/store";
import { AppShell, Container, Stack, Title } from "@mantine/core";

export function Packs() { 
  const packCards = useAppStore((state) => state.packBuilderCards)
  const addCard = useAppStore((state) => state.add)

  return (
    <AppShell.Main>
      <Container>
        <Stack>
        <Title>Pack Builder</Title>
        <CardSearch set="SEA" onSelect={addCard}/>
        <CardTable cards={packCards}/>
        </Stack>
      </Container>
    </AppShell.Main>
  )
}
