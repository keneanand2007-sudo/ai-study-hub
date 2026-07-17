import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSettingsStore = create(
  persist(
    function (set) {
      return {
        theme: 'dark',
        setTheme: function (theme) {
          set({ theme: theme })
        },
      }
    },
    { name: 'ash-settings-storage' }
  )
)
