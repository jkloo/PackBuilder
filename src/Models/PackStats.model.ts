import { CardModel } from "./Card.model"

export interface PackStats {
    equipment: number
    generic: number
    mechanologist: number
    ranger: number
    necromancer: number
    pirate: number
}

const empty = (): PackStats => ({
  equipment: 0,
  generic: 0,
  mechanologist: 0,
  ranger: 0,
  necromancer: 0,
  pirate: 0,
})

export const computeAverages = (packs: CardModel[][]): PackStats => {
  const statses = packs.map((pack) => computeStats(pack))
  const sum = statses.reduce((acc: any, stats: any) => {
    return {
      equipment: acc.equipment + stats.equipment,
      generic: acc.generic + stats.generic,
      mechanologist: acc.mechanologist + stats.mechanologist,
      ranger: acc.ranger + stats.ranger,
      necromancer: acc.necromancer + stats.necromancer,
      pirate: acc.pirate + stats.pirate,
    }
  }, empty())

  return {
    equipment: sum.equipment / packs.length,
    generic: sum.generic / packs.length,
    mechanologist: sum.mechanologist / packs.length,
    ranger: sum.ranger / packs.length,
    necromancer: sum.necromancer / packs.length,
    pirate: sum.pirate / packs.length,
  }
}

export const computeStats = (cards: CardModel[]): PackStats => {
  return cards.reduce((acc, card) => {
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
  }, empty())
}