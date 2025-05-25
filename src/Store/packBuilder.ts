import { CardModel } from "@/Models/Card.model"
import { StateCreator } from "zustand"
import { Store } from "."
import { useAppStore } from "./store"

export interface PackBuilderSlice {
  packBuilderCards: CardModel[]
  add(card: CardModel): void
  replace(index: number, card: CardModel): void
  remove(index: number): void
}

export const useCardAlternatives = (card: CardModel, set: string): CardModel[] => {
  const mapping = useAppStore((state) => (state.datasetCardAlternatives));
  return mapping.get(card.unique_id)?.filter((card) => card.set_id == set) ?? []
}

export const usePackBuilderSlice: StateCreator<Store, [], [], PackBuilderSlice> = (set, get, store) => ({
  packBuilderCards: [],
  add: (card: CardModel) => set((state) => ({ packBuilderCards: [card, ...state.packBuilderCards] })),
  replace: (index: number, card: CardModel) => set((state) => {
    const packBuilderCards = [...state.packBuilderCards]
    packBuilderCards[index] = card
    console.log(card.foiling, index)
    return { packBuilderCards }
  }),
  remove: (index: number) => set((state) => {
    const packBuilderCards = [...state.packBuilderCards]
    packBuilderCards.splice(index, 1)
    return { packBuilderCards }
  })
})