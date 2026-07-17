import { useState } from 'react'
import { useNotesStore } from '../store/notesStore.js'
import { FileText, Trash2 } from 'lucide-react'
import UploadButton from './UploadButton.jsx'
import PdfViewerModal from './PdfViewerModal.jsx'

function NotesGrid() {
  const notes = useNotesStore(function (state) { return state.notes })
  const selectedSubjectId = useNotesStore(function (state) { return state.selectedSubjectId })
  const deleteNote = useNotesStore(function (state) { return state.deleteNote })
  const [activeNote, setActiveNote] = useState(null)

  var filteredNotes = notes.filter(function (note) { return note.subjectId === selectedSubjectId })

  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)', fontSize: '16px', margin: 0 }}>
          NOTES
        </h2>
        <UploadButton />
      </div>

      {filteredNotes.length === 0 && (
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', textAlign: 'center', marginTop: 'var(--space-8)' }}>
          No notes yet in this subject. Upload your first PDF.
        </p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--space-4)' }}>
        {filteredNotes.map(function (note) {
          return (
            <div
              key={note.id}
              style={{
                position: 'relative',
                background: 'rgba(13, 15, 24, 0.7)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-5)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all var(--motion-fast) ease',
              }}
              onClick={function () { setActiveNote(note) }}
              onMouseEnter={function (e) {
                e.currentTarget.style.borderColor = 'var(--color-primary)'
                e.currentTarget.style.boxShadow = '0 0 12px var(--color-primary-glow)'
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <Trash2
                size={14}
                color="var(--color-text-secondary)"
                style={{ position: 'absolute', top: 8, right: 8 }}
                onClick={function (e) {
                  e.stopPropagation()
                  deleteNote(note.id)
                }}
              />
              <FileText size={32} color="var(--color-primary)" style={{ marginBottom: 'var(--space-3)' }} />
              <p style={{ color: 'var(--color-text-primary)', fontSize: '13px', margin: 0, wordBreak: 'break-word' }}>
                {note.title}
              </p>
            </div>
          )
        })}
      </div>

      <PdfViewerModal note={activeNote} onClose={function () { setActiveNote(null) }} />
    </div>
  )
}

export default NotesGrid
