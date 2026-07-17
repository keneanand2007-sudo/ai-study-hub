import { FileText } from 'lucide-react'
import { useNotesStore } from '../../notes/store/notesStore.js'
import WidgetContainer from '../WidgetContainer.jsx'

function RecentNotesWidget() {
  const notes = useNotesStore(function (state) { return state.notes })
  var recent = notes.slice(-3).reverse()

  return (
    <WidgetContainer title="Recent Notes">
      {recent.length === 0 && (
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
          No notes uploaded yet.
        </p>
      )}
      {recent.map(function (note) {
        return (
          <div key={note.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) 0' }}>
            <FileText size={14} color="var(--color-primary)" />
            <span style={{ color: 'var(--color-text-primary)', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {note.title}
            </span>
          </div>
        )
      })}
    </WidgetContainer>
  )
}

export default RecentNotesWidget