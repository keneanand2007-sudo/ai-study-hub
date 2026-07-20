import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export var PRESET_SHORTCUTS = [
  { title: 'ChatGPT', url: 'https://chat.openai.com', category: 'AI Tools' },
  { title: 'Claude', url: 'https://claude.ai', category: 'AI Tools' },
  { title: 'Google', url: 'https://google.com', category: 'Search' },
  { title: 'YouTube', url: 'https://youtube.com', category: 'Learning' },
  { title: 'GitHub', url: 'https://github.com', category: 'Dev Tools' },
  { title: 'Stack Overflow', url: 'https://stackoverflow.com', category: 'Dev Tools' },
  { title: 'LeetCode', url: 'https://leetcode.com', category: 'Dev Tools' },
  { title: 'W3Schools', url: 'https://w3schools.com', category: 'Learning' },
  { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', category: 'Dev Tools' },
  { title: 'Notion', url: 'https://notion.so', category: 'Productivity' },
  { title: 'Google Drive', url: 'https://drive.google.com', category: 'Productivity' },
  { title: 'Gmail', url: 'https://mail.google.com', category: 'Productivity' },
  { title: 'Canva', url: 'https://canva.com', category: 'Design' },
  { title: 'Figma', url: 'https://figma.com', category: 'Design' },
  { title: 'LinkedIn', url: 'https://linkedin.com', category: 'Career' },
  { title: 'Coursera', url: 'https://coursera.org', category: 'Learning' },
  { title: 'GeeksforGeeks', url: 'https://geeksforgeeks.org', category: 'Learning' },
  { title: 'Codeforces', url: 'https://codeforces.com', category: 'Dev Tools' },
]

export const useShortcutsStore = create(
  persist(
    function (set) {
      return {
        shortcuts: [
          { id: 'sc1', title: 'ChatGPT', url: 'https://chat.openai.com', category: 'AI Tools' },
          { id: 'sc2', title: 'GitHub', url: 'https://github.com', category: 'Dev Tools' },
          { id: 'sc3', title: 'YouTube', url: 'https://youtube.com', category: 'Learning' },
        ],

        addShortcut: function (title, url, category) {
          set(function (state) {
            var newItem = {
              id: 'sc' + Date.now(),
              title: title,
              url: url,
              category: category || 'Other',
            }
            return { shortcuts: state.shortcuts.concat([newItem]) }
          })
        },

        deleteShortcut: function (id) {
          set(function (state) {
            return { shortcuts: state.shortcuts.filter(function (s) { return s.id !== id }) }
          })
        },
      }
    },
    { name: 'ash-shortcuts-storage-v2' }
  )
)
