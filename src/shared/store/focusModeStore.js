import { create } from 'zustand'

export const useFocusModeStore = create(function (set) {
  return {
    isFocusMode: false,
    toggleFocusMode: function () {
      set(function (state) {
        return { isFocusMode: !state.isFocusMode }
      })
    },
  }
})
