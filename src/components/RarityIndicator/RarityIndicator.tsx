import { RarityModel } from "@/Models/Rarity.model";
import { ColorSwatch, Text } from "@mantine/core";


const colorForRarity = (rarity: RarityModel): string => {
    switch(rarity) {
    case 'C': return '#929292'
    case 'R': return '#3E8AC6'
    case 'S': return '#6F4B8F'
    case 'M': return '#AB261C'
    case 'L': return '#DB9E55'
    case 'F': return '#DB9E55'
    case 'T': return '#8E9092'
    case 'B': return '#8E9092'
    case 'V': return '#774A91'
    case 'P': return '#4EA143'
    default: return '#000'
  }
}

export function RarityIndicator({rarity}:{rarity: RarityModel}) {
  return (
    <ColorSwatch
      color={colorForRarity(rarity)}
      style={{ color: 'white' }}
    >
      <Text fw="700">{rarity}</Text>
    </ColorSwatch>
  )
}