import { FoilingModel } from "@/Models/Foiling.model"
import { ColorSwatch, Group, Text } from "@mantine/core"


interface FoilingIndicatorProps {
  foiling: FoilingModel
}

const textColorForFoiling = (foiling: FoilingModel): [string,string] => {
  switch (foiling) {
    case 'S': return ['#aaa', '#aaa']
    case 'R': return ['rgb(255, 143, 0)', 'rgb(140, 10, 180)']
    case 'C': return ['rgb(164, 191, 239)','rgb(7, 82, 197)']
    case 'G': return ['rgb(255, 143, 0)', 'rgb(229, 213, 63)']
    default: return ['', '']
  }
}

const labelForFoiling = (foiling: FoilingModel): string => {
  switch (foiling) {
    case 'S': return 'NF'
    case 'R': return 'RF'
    case 'C': return 'CF'
    case 'G': return 'Gold'
    default: return ''
  }
}

export function FoilingIndicator({foiling}: FoilingIndicatorProps) {
  const [from, to] = textColorForFoiling(foiling)

  return (
    <Group>
      <Text
        fw="900"
        fs="italic"
        variant="gradient"
        gradient={{ from, to, deg: 45 }}
      >
      {labelForFoiling(foiling)}
      </Text>
    </Group>
  )
}
