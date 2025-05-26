export type FoilingModel = ''|'S'|'R'|'C'|'G'

export const orderForFoiling = (foiling: FoilingModel): number => {
  switch (foiling) {
    case 'S': return 0
    case 'R': return 1
    case 'C': return 3
    case 'R': return 10
    default: return -1
  }
}