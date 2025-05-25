import { CardModel } from "@/Models/Card.model"
import { StateCreator } from "zustand"
import { Store } from "."

export interface DatasetSlice {
  datasetCards: CardModel[]
  datasetCardLookup: Map<string, CardModel>
  datasetCardAlternatives: Map<string, CardModel[]>
}

export const useDatasetSlice: StateCreator<Store, [], [], DatasetSlice> = (set) => {
  const collector = (acc: Map<string, CardModel[]>, card: CardModel) => {
    const value = acc.get(card.unique_id) ?? []
    value.push(card)
    acc.set(card.unique_id, value)
    return acc
  }
  const load = async () => {
      const datasetCards = await fetch("/card-flattened.json").then(r => r.json()) as CardModel[]
      const datasetCardLookup = datasetCards.reduce((acc, card) => acc.set(card.printing_unique_id, card), new Map())
      const datasetCardAlternatives = datasetCards.reduce(collector, new Map())
      set(() => ({
        datasetCards,
        datasetCardLookup,
        datasetCardAlternatives
      }))
    }
    load()

  return {
    datasetCards: [],
    datasetCardLookup: new Map(),
    datasetCardAlternatives: new Map(),
  }
}