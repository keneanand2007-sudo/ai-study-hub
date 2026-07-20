import { create } from 'zustand'
import { persist } from 'zustand/middleware'

function pad(n) {
  return String(n).padStart(2, '0')
}

function toDateKey(year, month, day) {
  return year + '-' + pad(month + 1) + '-' + pad(day)
}

export const useCalendarStore = create(
  persist(
    function (set, get) {
      var today = new Date()
      return {
        selectedDate: null,
        tasksByDate: {},
        viewYear: today.getFullYear(),
        viewMonth: today.getMonth(),

        selectDate: function (dateKey) {
          set({ selectedDate: dateKey })
        },

        goToPrevMonth: function () {
          set(function (state) {
            var m = state.viewMonth - 1
            var y = state.viewYear
            if (m < 0) { m = 11; y = y - 1 }
            return { viewMonth: m, viewYear: y }
          })
        },

        goToNextMonth: function () {
          set(function (state) {
            var m = state.viewMonth + 1
            var y = state.viewYear
            if (m > 11) { m = 0; y = y + 1 }
            return { viewMonth: m, viewYear: y }
          })
        },

        goToToday: function () {
          var t = new Date()
          set({ viewYear: t.getFullYear(), viewMonth: t.getMonth() })
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

        syncDailyTargets: function (dateKey, templates, completed) {
          set(function (state) {
            var buildCategory = function (cat) {
              return templates[cat].map(function (item) {
                return { id: item.id, text: item.text, done: !!completed[cat][item.id] }
              })
            }
            var dayData = {
              study: buildCategory('study'),
              social: buildCategory('social'),
              physical: buildCategory('physical'),
            }
            var updatedTasks = Object.assign({}, state.tasksByDate)
            updatedTasks[dateKey] = dayData
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

        getMonthStats: function (year, month) {
          var tasksByDate = get().tasksByDate
          var daysInMonth = new Date(year, month + 1, 0).getDate()
          var perfectDays = 0
          var trackedDays = 0
          for (var d = 1; d <= daysInMonth; d++) {
            var key = toDateKey(year, month, d)
            var dayTasks = tasksByDate[key]
            if (!dayTasks) continue
            var all = dayTasks.study.concat(dayTasks.social, dayTasks.physical)
            if (all.length === 0) continue
            trackedDays++
            var doneCount = all.filter(function (t) { return t.done }).length
            if (doneCount === all.length) perfectDays++
          }
          return { perfectDays: perfectDays, trackedDays: trackedDays }
        },

        getStreak: function () {
          var tasksByDate = get().tasksByDate
          var streak = 0
          var cursor = new Date()
          while (true) {
            var key = toDateKey(cursor.getFullYear(), cursor.getMonth(), cursor.getDate())
            var dayTasks = tasksByDate[key]
            if (!dayTasks) break
            var all = dayTasks.study.concat(dayTasks.social, dayTasks.physical)
            if (all.length === 0) break
            var doneCount = all.filter(function (t) { return t.done }).length
            var ratio = doneCount / all.length
            if (ratio < 1) break
            streak++
            cursor.setDate(cursor.getDate() - 1)
          }
          return streak
        },
      }
    },
    { name: 'ash-calendar-storage-v3' }
  )
)
