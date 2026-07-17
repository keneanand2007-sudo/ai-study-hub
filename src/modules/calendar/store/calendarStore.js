import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCalendarStore = create(
  persist(
    function (set, get) {
      return {
        selectedDate: null,
        tasksByDate: {
          '2026-07-15': {
            study: [{ id: 't1', text: 'Read DBMS chapter', done: true }],
            social: [{ id: 't2', text: 'Call friend', done: true }],
            physical: [{ id: 't3', text: 'Gym', done: false }],
          },
        },

        selectDate: function (dateKey) {
          set({ selectedDate: dateKey })
        },

        addTask: function (dateKey, category, text) {
          set(function (state) {
            var dayTasks = state.tasksByDate[dateKey] || { study: [], social: [], physical: [] }
            var newTask = { id: 't' + Date.now(), text: text, done: false }
            var updatedDay = Object.assign({}, dayTasks)
            updatedDay[category] = dayTasks[category].concat([newTask])
            var updatedTasks = Object.assign({}, state.tasksByDate)
            updatedTasks[dateKey] = updatedDay
            return { tasksByDate: updatedTasks }
          })
        },

        toggleTask: function (dateKey, category, taskId) {
          set(function (state) {
            var dayTasks = state.tasksByDate[dateKey]
            if (!dayTasks) return state
            var updatedCategory = dayTasks[category].map(function (t) {
              return t.id === taskId ? Object.assign({}, t, { done: !t.done }) : t
            })
            var updatedDay = Object.assign({}, dayTasks)
            updatedDay[category] = updatedCategory
            var updatedTasks = Object.assign({}, state.tasksByDate)
            updatedTasks[dateKey] = updatedDay
            return { tasksByDate: updatedTasks }
          })
        },

        getCompletionForDate: function (dateKey) {
          var dayTasks = get().tasksByDate[dateKey]
          if (!dayTasks) return null
          var all = dayTasks.study.concat(dayTasks.social, dayTasks.physical)
          if (all.length === 0) return null
          var doneCount = all.filter(function (t) { return t.done }).length
          return doneCount / all.length
        },
      }
    },
    { name: 'ash-calendar-storage' }
  )
)
