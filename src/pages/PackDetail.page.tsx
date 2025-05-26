import { PackModel } from "@/Models/Pack.model"
import { AppShell, Button, Container, Grid, Group, Image, Input, Stack, Title, Text, Textarea, TextInput, Center, ColorSwatch, Paper, Divider } from "@mantine/core"
import { IconCards, IconEdit } from "@tabler/icons-react"

import classes from './PackDetail.module.css'
import { orderForRarity } from "@/Models/Rarity.model"
import { orderForFoiling } from "@/Models/Foiling.model"
import { useNavigate } from "react-router"
import { CardModel } from "@/Models/Card.model"
import { DonutChart, PieChart } from '@mantine/charts';

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
              <Grid.Col span={1}>
                <Image
                  fit='contain'
                  key={`${card.printing_unique_id}-${index}`} src={card.image_url}
                  className={card.foiling == 'R' ? classes.rainbowBox : undefined}
                /> 
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      </Container>
    </AppShell.Main>
    <AppShell.Aside p='md'>
      <Stack>

      <Title order={2}>Stats</Title>
      
      <PackStats pack={pack}/>
      {/* <Title order={2}>About</Title>
      <Textarea label="Notes" placeholder="Record anything here."></Textarea>
      <Textarea label="Source" placeholder="Where this pack came from."></Textarea> */}
      </Stack>
    </AppShell.Aside>
    </>
  )
}

function PackStats({pack}: { pack: PackModel }) {
  const counts = pack.cards.reduce((acc, card) => {
    const Common = (c: CardModel) => (c.rarity == 'C' && c.foiling == 'S')
    const Equipment = (c: CardModel) => (c.types.includes('Equipment'))
    const NonEquipment = (c: CardModel) => (!Equipment(c))
    const Generic = (c: CardModel) => (c.types.includes('Generic'))
    const Mechanologist = (c: CardModel) => (c.types.includes('Mechanologist'))
    const Ranger = (c: CardModel) => (c.types.includes('Ranger'))
    const Necromancer = (c: CardModel) => (c.types.includes('Necromancer'))
    const Pirate = (c: CardModel) => ([
      !Mechanologist(c),
      !Ranger(c),
      !Necromancer(c),
      c.types.includes('Pirate')
    ].every(Boolean))

    return {
      equipment: acc.equipment + ((Common(card) && Equipment(card)) ? 1 : 0),
      generic: acc.generic + ((Common(card) && Generic(card) && NonEquipment(card)) ? 1 : 0),
      mechanologist: acc.mechanologist + ((Common(card) && Mechanologist(card) && NonEquipment(card)) ? 1 : 0),
      ranger: acc.ranger + ((Common(card) && Ranger(card) && NonEquipment(card)) ? 1 : 0),
      necromancer: acc.necromancer + ((Common(card) && Necromancer(card) && NonEquipment(card)) ? 1 : 0),
      pirate: acc.pirate + ((Common(card) && Pirate(card) && NonEquipment(card)) ? 1 : 0),
    }
  }, {
    equipment: 0,
    generic: 0,
    mechanologist: 0,
    ranger: 0,
    necromancer: 0,
    pirate: 0,
  })

  const data = [
    { value: counts.equipment, color: 'var(--mantine-color-gray-5)', name: 'Equipment' },
    { value: counts.generic, color: 'var(--mantine-color-yellow-3)', name: 'Generic' },
    { value: counts.pirate, color: 'var(--mantine-color-cyan-5)', name: 'Pirate' },
    { value: counts.ranger, color: 'var(--mantine-color-green-9)', name: 'Ranger' },
    { value: counts.mechanologist, color: 'var(--mantine-color-orange-6)', name: 'Mechanologist' },
    { value: counts.necromancer, color: 'var(--mantine-color-teal-5)', name: 'Necromancer' },
  ]

  return (
      <Stack>
        <Center>
      <DonutChart
        chartLabel="Commons"
        withTooltip={false}
        size={160}
        data={data}
      />
      </Center>
      <Paper withBorder>
        {
          data.map((d) => (
            <>
            <Group p='sm' justify="space-between" w='100%'>
              <Group >
              <ColorSwatch color={d.color}/>
              <Text>{d.name}</Text>
              </Group>
              <Text size="lg" fw={600}>{d.value}</Text>
            </Group>
            <Divider />
            </>
          ))
        }
      </Paper>
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