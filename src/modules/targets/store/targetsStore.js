import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useTargetsStore = create(
  persist(
    function (set) {
      return {
        targets: {
          study: [{ id: 'g1', text: 'Complete DBMS assignment', done: false }],
          social: [{ id: 'g2', text: 'Meet college friends', done: false }],
          physical: [{ id: 'g3', text: 'Morning workout', done: true }],
        },

        addTarget: function (category, text) {
          set(function (state) {
            var updated = {}
            updated[category] = state.targets[category].concat([{ id: 'g' + Date.now(), text: text, done: false }])
            return { targets: Object.assign({}, state.targets, updated) }
          })
        },

        toggleTarget: function (category, id) {
          set(function (state) {
            var updated = {}
            updated[category] = state.targets[category].map(function (t) {
              return t.id === id ? Object.assign({}, t, { done: !t.done }) : t
            })
            return { targets: Object.assign({}, state.targets, updated) }
          })
        },

        deleteTarget: function (category, id) {
          set(function (state) {
            var updated = {}
            updated[category] = state.targets[category].filter(function (t) { return t.id !== id })
            return { targets: Object.assign({}, state.targets, updated) }
          })
        },
      }
    },
    { name: 'ash-targets-storage' }
  )
)
