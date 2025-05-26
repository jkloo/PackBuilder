export type RarityModel = 'C'|'R'|'S'|'M'|'L'|'F'|'T'|'B'|'V'|'P'

export const nameForRarity = (rarity: RarityModel): string => {
  switch(rarity) {
    case 'C': return 'Common'
    case 'R': return 'Rare'
    case 'S': return 'Super Rare'
    case 'M': return 'Majestic'
    case 'L': return 'Legendary'
    case 'F': return 'Fabled'
    case 'T': return 'Token'
    case 'B': return 'Basic'
    case 'V': return 'Marvel'
    case 'P': return 'Promo'
    default: return ''
  }
}

export const orderForRarity = (rarity: RarityModel): number => {
  switch(rarity) {
    case 'C': return 0
    case 'R': return 1
    case 'S': return 2
    case 'M': return 2
    case 'L': return 3
    case 'F': return 10
    case 'T': return 5
    case 'B': return 5
    case 'V': return 6
    case 'P': return 12
    default: return -1
  }
}