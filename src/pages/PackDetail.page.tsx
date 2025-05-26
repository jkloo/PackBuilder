import { PackModel } from "@/Models/Pack.model"
import { AppShell, Button, Container, Grid, Group, Stack, Title, Text, TextInput, Center, ColorSwatch, Paper, Divider, ScrollArea, Space } from "@mantine/core"
import { IconCards, IconEdit } from "@tabler/icons-react"

import { orderForRarity } from "@/Models/Rarity.model"
import { orderForFoiling } from "@/Models/Foiling.model"
import { useNavigate } from "react-router"
import { PieChart } from '@mantine/charts';
import { CardImage } from "@/components/CardImage/CardImage"
import { computeAverages, computeStats } from "@/Models/PackStats.model"
import { PackBreakdownChart, PackBreakdownTable, PackCommonsChart, PackCommonsTable } from "@/components/Stats/Stats"


export function PackDetail({pack}: {pack: PackModel}) {

  const navigate = useNavigate()

  const cards = pack.cards.sort((a, b) => {
    if (a.foiling != b.foiling) {
      return orderForFoiling(a.foiling) - orderForFoiling(b.foiling)
    } else if (a.rarity != b.rarity) {
      return orderForRarity(a.rarity) - orderForRarity(b.rarity)
    } else if (a.type_text != b.type_text) {
      return a.type_text < b.type_text ? -1 : 1
    } else if(a.name != b.name) {
      return  a.name < b.name ? -1 : 1
    } else {
      return a.id < b.id ? -1 : 1
    }
  })

  return (
    <>
    <AppShell.Main>
      <Container>
        <Stack justify="stretch">
          <Title>Pack Contents</Title>
          <Group justify="space-between">
            <PackInput pack={pack} />
            <Button variant="light" onClick={() => navigate(`/packs/${pack.id}/edit`)}>
              <Group>
                <IconEdit size={24} stroke={1.5}/>
                <Text>Edit</Text>
              </Group>
            </Button>
          </Group>
          <Grid columns={5}>
            { cards.map((card, index) => (
              <Grid.Col span={1} key={`${card.printing_unique_id}-${index}`}>
                <CardImage card={card}/>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      </Container>
    </AppShell.Main>
    <AppShell.Aside>
      <Paper p='md' withBorder radius={0}>
        <Title order={2}>Commons</Title>
      </Paper>
      <ScrollArea>
        <Stack p='md'>
          <PackStats pack={pack}/>
        </Stack>
      </ScrollArea>
    </AppShell.Aside>
    </>
  )
}

function PackStats({pack}: { pack: PackModel }) {
  const counts = computeStats(pack.cards)

  return (
    <Stack>
      <Title order={3}>By Class</Title>
      <Center>
        <PackCommonsChart stats={counts}/>
      </Center>
      <PackCommonsTable stats={counts} />
      <Title order={3}>Pack Structure</Title>
      <Center>
        <PackBreakdownChart stats={counts} />
      </Center>
      <PackBreakdownTable stats={counts} />

      <Space h='xl'/>
    </Stack>
  )
}

function PackInput({pack}: { pack: PackModel }) {
  return (
    <TextInput
      placeholder="Pack ID"
      value={pack.id}
      leftSection={<IconCards size={16}/>}
      leftSectionPointerEvents="none"
      size="sm"
      disabled
      />
  )
}