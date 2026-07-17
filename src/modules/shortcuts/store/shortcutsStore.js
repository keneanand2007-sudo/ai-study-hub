import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useShortcutsStore = create(
  persist(
    function (set) {
      return {
        shortcuts: [
          { id: 'sc1', title: 'ChatGPT', url: 'https://chat.openai.com' },
          { id: 'sc2', title: 'GitHub', url: 'https://github.com' },
          { id: 'sc3', title: 'YouTube', url: 'https://youtube.com' },
        ],

        addShortcut: function (title, url) {
          set(function (state) {
            return { shortcuts: state.shortcuts.concat([{ id: 'sc' + Date.now(), title: title, url: url }]) }
          })
        },

        deleteShortcut: function (id) {
          set(function (state) {
            return { shortcuts: state.shortcuts.filter(function (s) { return s.id !== id }) }
          })
        },
      }
    },
    { name: 'ash-shortcuts-storage' }
  )
)
