import { useState } from 'react'
import { useTargetsStore } from '../store/targetsStore.js'
import Card from '../../../shared/components/Card.jsx'
import Button from '../../../shared/components/Button.jsx'
import { Trash2 } from 'lucide-react'

function TargetCategory({ categoryKey, label }) {
  const targets = useTargetsStore((state) => state.targets[categoryKey])
  const addTarget = useTargetsStore((state) => state.addTarget)
  const toggleTarget = useTargetsStore((state) => state.toggleTarget)
  const deleteTarget = useTargetsStore((state) => state.deleteTarget)
  const [input, setInput] = useState('')

  const handleAdd = () => {
    if (!input.trim()) return
    addTarget(categoryKey, input)
    setInput('')
  }

  const doneCount = targets.filter((t) => t.done).length

  return (
    <Card style={{ flex: 1, minWidth: '260px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-4)',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'var(--color-primary)',
            margin: 0,
          }}
        >
          {label}
        </h3>
        <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
          {doneCount}/{targets.length}
        </span>
      </div>

      {targets.length === 0 && (
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>No targets yet.</p>
      )}

      {targets.map((task) => (
        <div
          key={task.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-2) 0',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <span
            onClick={() => toggleTarget(categoryKey, task.id)}
            style={{
              cursor: 'pointer',
              flex: 1,
              fontSize: '13px',
              color: task.done ? 'var(--color-success)' : 'var(--color-text-primary)',
              textDecoration: task.done ? 'line-through' : 'none',
            }}
          >
            {task.done ? '☑' : '☐'} {task.text}
          </span>
          <Trash2
            size={14}
            color="var(--color-text-secondary)"
            style={{ cursor: 'pointer' }}
            onClick={() => deleteTarget(categoryKey, task.id)}
          />
        </div>
      ))}

      <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add new target"
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--color-text-primary)',
            fontSize: '12px',
            padding: 'var(--space-2)',
            outline: 'none',
          }}
        />
        <Button variant="ghost" onClick={handleAdd}>+</Button>
      </div>
    </Card>
  )
}

export default TargetCategory