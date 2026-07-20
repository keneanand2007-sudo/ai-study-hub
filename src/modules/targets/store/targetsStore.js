import { create } from 'zustand'
import { persist } from 'zustand/middleware'

function getTodayKey() {
  var d = new Date()
  var y = d.getFullYear()
  var m = String(d.getMonth() + 1).padStart(2, '0')
  var day = String(d.getDate()).padStart(2, '0')
  return y + '-' + m + '-' + day
}

var TEMPLATES = {
  study: [
    { id: 'study-1', text: 'Attend all college lectures' },
    { id: 'study-2', text: "Revise previous day's topic (30 min)" },
    { id: 'study-3', text: 'Solve 5 DSA/coding problems' },
    { id: 'study-4', text: 'Read 1 chapter from current subject' },
    { id: 'study-5', text: 'Watch 1 educational/tech video' },
    { id: 'study-6', text: 'Make short notes of what you studied' },
    { id: 'study-7', text: 'Practice 1 previous year question paper section' },
    { id: 'study-8', text: 'Work on personal project (React/coding)' },
    { id: 'study-9', text: 'Learn 1 new concept/tech term' },
    { id: 'study-10', text: 'Revise for upcoming test/exam (if any)' },
  ],
  social: [
    { id: 'social-1', text: 'Call/message family' },
    { id: 'social-2', text: 'Talk to a friend (in-person or call)' },
    { id: 'social-3', text: 'Help a classmate with doubt' },
    { id: 'social-4', text: 'Attend any group study/discussion' },
    { id: 'social-5', text: 'Spend quality time with someone' },
    { id: 'social-6', text: 'Reply to pending messages' },
    { id: 'social-7', text: 'Connect with 1 new person (LinkedIn/college)' },
    { id: 'social-8', text: 'Share something useful with a friend' },
    { id: 'social-9', text: 'Participate in a group activity/club' },
    { id: 'social-10', text: 'Give someone a compliment/encouragement' },
  ],
  physical: [
    { id: 'physical-1', text: 'Morning exercise/workout (20-30 min)' },
    { id: 'physical-2', text: 'Drink enough water (2-3 litres)' },
    { id: 'physical-3', text: 'Sleep 7-8 hours' },
    { id: 'physical-4', text: 'Take a walk (15-20 min)' },
    { id: 'physical-5', text: 'Eat a healthy breakfast' },
    { id: 'physical-6', text: 'Stretching/yoga (10 min)' },
    { id: 'physical-7', text: 'Avoid junk food today' },
    { id: 'physical-8', text: 'Limit screen time before sleep' },
    { id: 'physical-9', text: 'Maintain good posture while studying' },
    { id: 'physical-10', text: 'Take short breaks every 1 hour (Pomodoro style)' },
  ],
}

function emptyCompletion() {
  var result = { study: {}, social: {}, physical: {} }
  Object.keys(TEMPLATES).forEach(function (cat) {
    TEMPLATES[cat].forEach(function (item) {
      result[cat][item.id] = false
    })
  })
  return result
}

export const useTargetsStore = create(
  persist(
    function (set, get) {
      return {
        templates: TEMPLATES,
        currentDateKey: getTodayKey(),
        completed: emptyCompletion(),
        submittedDates: [],

        checkAndResetForNewDay: function () {
          var today = getTodayKey()
          if (get().currentDateKey !== today) {
            set({ currentDateKey: today, completed: emptyCompletion() })
          }
        },

        toggleTask: function (category, id) {
          set(function (state) {
            var updatedCat = Object.assign({}, state.completed[category])
            updatedCat[id] = !updatedCat[id]
            var updatedCompleted = Object.assign({}, state.completed)
            updatedCompleted[category] = updatedCat
            return { completed: updatedCompleted }
          })
        },

        submitDay: function () {
          set(function (state) {
            var newSubmitted = state.submittedDates.indexOf(state.currentDateKey) === -1
              ? state.submittedDates.concat([state.currentDateKey])
              : state.submittedDates
            return { submittedDates: newSubmitted }
          })
        },

        resetForNextDay: function () {
          set({ currentDateKey: getTodayKey(), completed: emptyCompletion() })
        },

        getCompletionRatio: function () {
          var completed = get().completed
          var all = []
          Object.keys(completed).forEach(function (cat) {
            Object.keys(completed[cat]).forEach(function (id) {
              all.push(completed[cat][id])
            })
          })
          if (all.length === 0) return 0
          var doneCount = all.filter(function (v) { return v }).length
          return doneCount / all.length
        },
      }
    },
    { name: 'ash-targets-storage-v2' }
  )
)
