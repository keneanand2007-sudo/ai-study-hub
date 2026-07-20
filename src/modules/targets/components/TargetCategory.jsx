import { useTargetsStore } from '../store/targetsStore.js'
import Card from '../../../shared/components/Card.jsx'

function TargetCategory({ categoryKey, label, accentColor }) {
  const templates = useTargetsStore(function (state) { return state.templates[categoryKey] })
  const completed = useTargetsStore(function (state) { return state.completed[categoryKey] })
  const toggleTask = useTargetsStore(function (state) { return state.toggleTask })

  var doneCount = Object.values(completed).filter(function (v) { return v }).length

  return (
    <Card style={{ flex: '1 1 300px', minWidth: '280px', padding: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
        <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', color: accentColor, margin: 0 }}>
          {label}
        </h3>
        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
          {doneCount}/{templates.length}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {templates.map(function (task) {
          var isDone = completed[task.id]
          return (
            <div
              key={task.id}
              onClick={function () { toggleTask(categoryKey, task.id) }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                border: '1px solid ' + (isDone ? 'var(--color-border)' : 'transparent'),
                background: isDone ? 'rgba(0, 255, 157, 0.05)' : 'transparent',
                transition: 'all var(--motion-fast) ease',
              }}
            >
              <span style={{ fontSize: '16px', lineHeight: 1, color: isDone ? 'var(--color-success)' : 'var(--color-text-secondary)' }}>
                {isDone ? '☑' : '☐'}
              </span>
              <span
                style={{
                  fontSize: '14px',
                  lineHeight: '1.5',
                  color: isDone ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
                  textDecoration: isDone ? 'line-through' : 'none',
                }}
              >
                {task.text}
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default TargetCategory
