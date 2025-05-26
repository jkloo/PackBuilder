import { CardModel } from "@/Models/Card.model"
import { PackStats } from "@/Models/PackStats.model"
import { PieChart, PieChartCell } from "@mantine/charts"
import { Paper, Group, ColorSwatch, Divider, Text, NumberFormatter } from "@mantine/core"

const commonsData = (stats: PackStats): PieChartCell[] => {
  return [
    { value: stats.equipment, color: 'var(--mantine-color-gray-5)', name: 'Equipment' },
    { value: stats.generic, color: 'var(--mantine-color-yellow-3)', name: 'Generic' },
    { value: stats.pirate, color: 'var(--mantine-color-cyan-5)', name: 'Pirate' },
    { value: stats.ranger, color: 'var(--mantine-color-green-9)', name: 'Ranger' },
    { value: stats.mechanologist, color: 'var(--mantine-color-orange-6)', name: 'Mechanologist' },
    { value: stats.necromancer, color: 'var(--mantine-color-teal-5)', name: 'Necromancer' },
  ]
}

const breakdownData = (stats: PackStats): PieChartCell[] => {
  return [
    { value: stats.equipment, color: 'var(--mantine-color-gray-5)', name: 'Equipment' },
    { value: stats.generic + stats.pirate, color: 'var(--mantine-color-yellow-3)', name: 'Generic + Pirate' },
    { value: stats.ranger + stats.mechanologist + stats.necromancer, color: 'var(--mantine-color-cyan-5)', name: 'Classes' },
  ]
}

export function PackCommonsChart({stats}: {stats: PackStats}) {
  const data = commonsData(stats)

  return (
    <PieChart
      startAngle={0}
      endAngle={180}
      withTooltip={false}
      size={200}
      data={data.toReversed()}
      mb={-80}
    />
  )
}

export function PackCommonsTable({stats}: {stats: PackStats}) {
  const data = commonsData(stats)
  return (
    <Paper withBorder>
      {
        data.map((d) => (
          <>
          <Group p='sm' justify="space-between" w='100%'>
            <Group >
            <ColorSwatch color={d.color}>
              <Text c='black'>{d.name[0]}</Text>
            </ColorSwatch>
            <Text>{d.name}</Text>
            </Group>
            <Text size="lg" fw={600}>
              <NumberFormatter value={d.value} decimalScale={1}/>
            </Text>
          </Group>
          <Divider />
          </>
        ))
      }
    </Paper>
  )
}


export function PackBreakdownChart({stats}: {stats: PackStats}) {
  const data = breakdownData(stats)

  return (
    <PieChart data={data} />
  )
}

export function PackBreakdownTable({stats}: {stats: PackStats}) {
  const data = breakdownData(stats)

  return (
    <Paper withBorder>
    {
      data.map((d) => (
        <>
        <Group p='sm' justify="space-between" w='100%'>
          <Group >
          <ColorSwatch color={d.color}>
            <Text c='black'>{d.name[0]}</Text>
          </ColorSwatch>
          <Text>{d.name}</Text>
          </Group>
          <Text size="lg" fw={600}>
            <NumberFormatter value={d.value} decimalScale={1}/>
          </Text>
        </Group>
        <Divider />
        </>
      ))
    }
    </Paper>
  )
}