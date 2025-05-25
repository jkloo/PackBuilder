import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { useDatasetSlice } from './dataset'
import { usePackBuilderSlice } from './packBuilder'
import { Store } from '.'

export const useAppStore = create<Store>()(
  devtools(
    persist((...a) => ({
      ...useDatasetSlice(...a),
      ...usePackBuilderSlice(...a),
    }), {
      name: 'app-store',
      partialize: ({ packBuilderCards }) => ({ packBuilderCards })
    })
  )
)