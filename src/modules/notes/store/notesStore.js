import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { savePdfFile, deletePdfFile } from '../../../shared/utils/pdfStorage.js'

export const useNotesStore = create(
  persist(
    function (set) {
      return {
        subjects: [
          { id: 's1', name: 'C Programming' },
          { id: 's2', name: 'Web Technology' },
          { id: 's3', name: 'Networking' },
        ],
        selectedSubjectId: 's1',
        notes: [],

        selectSubject: function (id) {
          set({ selectedSubjectId: id })
        },

        addNote: function (subjectId, file) {
          var noteId = 'n' + Date.now()
          savePdfFile(noteId, file)
          set(function (state) {
            var newNote = { id: noteId, subjectId: subjectId, title: file.name }
            return { notes: state.notes.concat([newNote]) }
          })
        },

        deleteNote: function (id) {
          deletePdfFile(id)
          set(function (state) {
            return { notes: state.notes.filter(function (n) { return n.id !== id }) }
          })
        },
      }
    },
    { name: 'ash-notes-storage' }
  )
)
