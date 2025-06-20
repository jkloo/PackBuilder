import { StateCreator } from "zustand"
import { Store } from "."
import { useAppStore } from "./store"

import { CardModel } from "@/Models/Card.model"
import { generateBoxId, generatePackId, PackModel } from "@/Models/Pack.model"

export interface PackBuilderSlice {
  packBuilderCards: CardModel[]
  boxId?: string
  packId?: PackModel['id'],
  
  add(card: CardModel): void
  replace(index: number, card: CardModel): void
  remove(index: number): void
  clearBuilder(excludeBoxId: boolean): void

  setBoxId(id?: string): void
  generateBoxId(): string

  setPackId(id?: PackModel['id']): void
  generatePackId(): PackModel['id']

  editPack(id: PackModel['id']): void
}

export const useCardAlternatives = (card: CardModel, set: string): CardModel[] => {
  const mapping = useAppStore((state) => (state.datasetCardAlternatives));
  return mapping.get(card.unique_id)?.filter((card) => card.set_id == set) ?? []
}

export const usePackBuilderSlice: StateCreator<Store, [], [], PackBuilderSlice> = (set, get, store) => ({
  packBuilderCards: [],
  boxId: undefined,
  packId: undefined,
  add: (card: CardModel) => set((state) => ({ packBuilderCards: [card, ...state.packBuilderCards] })),
  replace: (index: number, card: CardModel) => set((state) => {
    const packBuilderCards = [...state.packBuilderCards]
    packBuilderCards[index] = card
    return { packBuilderCards }
  }),
  remove: (index: number) => set((state) => {
    const packBuilderCards = [...state.packBuilderCards]
    packBuilderCards.splice(index, 1)
    return { packBuilderCards }
  }),
  clearBuilder: (excludeBoxId: boolean = true) => set((state) => ({
    packBuilderCards: [],
    boxId: excludeBoxId ? state.boxId : undefined,
    packId: undefined,
  })),

  setBoxId: (id?: string) => set((state) => ({
    boxId: id
  })),
  generateBoxId: () => {
    const boxId = generateBoxId() 
    set((state) => ({ boxId }))
    return boxId
  },
  setPackId: (id?: PackModel['id']) => set((state) => ({
    packId: id
  })),
  generatePackId: () => {
    const packId = generatePackId()
    set((state) => ({ packId }))
    return packId
  },
  editPack: (id: PackModel['id']) => set((state) => {
    const pack = get().packDatabase.get(id)
    if (!pack) { return {} }
    return {
      packBuilderCards: pack.cards,
      boxId: pack.boxId,
      packId: pack.id,
    }
  }),
})