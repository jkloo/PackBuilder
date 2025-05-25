import { StateCreator } from "zustand";
import { Store } from ".";
import { generateBoxId, generatePackId, PackModel } from "@/Models/Pack.model";
import { CardModel } from "@/Models/Card.model";

export interface PackDatabaseSlice {
  packDatabase: Map<PackModel['id'], PackModel>,
  upsert(cards: CardModel[], props: { packId?: PackModel['id'], boxId?: string }): void
  delete(pack: PackModel): void
  clearDatabase(): void
}

export const usePackDatabaseSlice: StateCreator<Store, [], [], PackDatabaseSlice> = (set, get, store) => ({
  packDatabase: new Map(),
  upsert: (cards: CardModel[], props: { packId?: PackModel['id'], boxId?: string } ) => set((state)=>{
    let { boxId, packId } = props
    if (!boxId) {
      boxId = generateBoxId()
      get().setBoxId(boxId)
      console.log(boxId)
    }
    if (!packId) {
      packId = generatePackId()
      get().setPackId(packId)
    }

    const pack: PackModel = {
      id: packId,
      cards,
      boxId,
      setId: cards[0].set_id
    }

    return {
      packDatabase: new Map(state.packDatabase).set(pack.id, pack)
    }
  }),
  delete: (pack: PackModel) => set((state) => {
    const packDatabase = new Map(state.packDatabase)
    packDatabase.delete(pack.id)
    return {
      packDatabase
    }
  }),
  clearDatabase: () => set((state) => ({ packDatabase: new Map() })),
})