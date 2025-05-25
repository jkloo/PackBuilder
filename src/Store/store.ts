import { create } from 'zustand'
import { persist, devtools, StorageValue } from 'zustand/middleware'

import { Store } from '.'
import { useDatasetSlice } from './dataset'
import { usePackBuilderSlice } from './packBuilder'
import { usePackDatabaseSlice } from './packDatabase'

export const useAppStore = create<Store>()(
  devtools(
    persist((...a) => ({
      ...useDatasetSlice(...a),
      ...usePackBuilderSlice(...a),
      ...usePackDatabaseSlice(...a),
    }), {
      name: 'app-store',
      partialize: ({ packBuilderCards, packDatabase }) => ({
        packBuilderCards,
        packDatabase,
      }),
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const existingValue = JSON.parse(str);
          return {
            ...existingValue,
            state: {
              ...existingValue.state,
              packDatabase: new Map(existingValue.state.packDatabase),
            }
          }
        },
        setItem: (name, newValue: StorageValue<any>) => {
          // functions cannot be JSON encoded
          const str = JSON.stringify({
            ...newValue,
            state: {
              ...newValue.state,
              packDatabase: Array.from(newValue.state.packDatabase.entries()),
            },
          })
          localStorage.setItem(name, str)
        },
        removeItem: (name) => localStorage.removeItem(name),
      }
    }
  )
))