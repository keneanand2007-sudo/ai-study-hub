import { useNotesStore } from '../store/notesStore.js'
import { Folder } from 'lucide-react'

function SubjectList() {
  const subjects = useNotesStore((state) => state.subjects)
  const selectedSubjectId = useNotesStore((state) => state.selectedSubjectId)
  const selectSubject = useNotesStore((state) => state.selectSubject)

  return (
    <div
      style={{
        width: '220px',
        borderRight: '1px solid var(--color-border)',
        padding: 'var(--space-5)',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-4)',
        }}
      >
        Subjects
      </h3>

      {subjects.map((subject) => {
        const active = subject.id === selectedSubjectId
        return (
          <div
            key={subject.id}
            onClick={() => selectSubject(subject.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-3)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              marginBottom: 'var(--space-1)',
              color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              background: active ? 'rgba(0, 229, 255, 0.08)' : 'transparent',
              border: active ? '1px solid var(--color-border-glow)' : '1px solid transparent',
              fontSize: '14px',
              transition: 'all var(--motion-fast) ease',
            }}
          >
            <Folder size={16} />
            {subject.name}
          </div>
        )
      })}
    </div>
  )
}

export default SubjectList