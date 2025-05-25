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