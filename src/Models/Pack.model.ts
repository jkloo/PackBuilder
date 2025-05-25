import { CardModel } from "./Card.model";

import { nanoid } from 'nanoid'

export const generatePackId = (): PackModel['id'] => {
  return nanoid(16)
}

export const generateBoxId = (): PackModel['boxId'] => {
  return nanoid(10)
}

export interface PackModel {
  id: string
  setId: CardModel['set_id']
  boxId: string
  cards: CardModel[]
}