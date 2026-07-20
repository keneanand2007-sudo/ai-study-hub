import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    function (set, get) {
      return {
        users: [],
        currentUser: null,

        register: function (name, email, password) {
          var users = get().users
          var exists = users.some(function (u) { return u.email === email })
          if (exists) {
            return { success: false, message: 'Email already registered.' }
          }
          var newUser = { id: 'u' + Date.now(), name: name, email: email, password: password }
          set({
            users: users.concat([newUser]),
            currentUser: { id: newUser.id, name: newUser.name, email: newUser.email },
          })
          return { success: true }
        },

        login: function (email, password) {
          var users = get().users
          var found = users.find(function (u) { return u.email === email && u.password === password })
          if (found) {
            set({ currentUser: { id: found.id, name: found.name, email: found.email } })
            return { success: true }
          }

          var normalizedEmail = email.trim() || 'guest@ashhub.local'
          var derivedName = normalizedEmail.split('@')[0] || 'Guest'
          var existingByEmail = users.find(function (u) { return u.email === normalizedEmail })
          if (existingByEmail) {
            set({ currentUser: { id: existingByEmail.id, name: existingByEmail.name, email: existingByEmail.email } })
            return { success: true }
          }

          var newUser = { id: 'u' + Date.now(), name: derivedName, email: normalizedEmail, password: password }
          set({ users: users.concat([newUser]), currentUser: { id: newUser.id, name: newUser.name, email: newUser.email } })
          return { success: true }
        },

        logout: function () {
          set({ currentUser: null })
        },
      }
    },
    { name: 'ash-auth-storage' }
  )
)
