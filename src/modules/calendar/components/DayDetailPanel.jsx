import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useCalendarStore } from '../store/calendarStore.js'
import Card from '../../../shared/components/Card.jsx'
import Button from '../../../shared/components/Button.jsx'

var CATEGORIES = [
  { key: 'study', label: 'Study' },
  { key: 'social', label: 'Social' },
  { key: 'physical', label: 'Physical' },
]

function formatReadableDate(dateKey) {
  var parts = dateKey.split('-')
  var dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))
  return dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
}

function DayDetailPanel() {
  const selectedDate = useCalendarStore(function (state) { return state.selectedDate })
  const tasksByDate = useCalendarStore(function (state) { return state.tasksByDate })
  const addTask = useCalendarStore(function (state) { return state.addTask })
  const toggleTask = useCalendarStore(function (state) { return state.toggleTask })
  const [inputs, setInputs] = useState({ study: '', social: '', physical: '' })

  if (!selectedDate) {
    return (
      <Card style={{ width: '320px', flexShrink: 0 }}>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
          Select a date to view or add notes.
        </p>
      </Card>
    )
  }

  var dayTasks = tasksByDate[selectedDate] || { study: [], social: [], physical: [] }
  var all = dayTasks.study.concat(dayTasks.social, dayTasks.physical)
  var doneCount = all.filter(function (t) { return t.done }).length
  var percent = all.length > 0 ? Math.round((doneCount / all.length) * 100) : 0

  function handleAdd(category) {
    if (!inputs[category].trim()) return
    addTask(selectedDate, category, inputs[category])
    var updated = Object.assign({}, inputs)
    updated[category] = ''
    setInputs(updated)
  }

  return (
    <Card style={{ width: '320px', flexShrink: 0 }}>
      <h3 style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', fontSize: '14px', marginBottom: 'var(--space-1)' }}>
        {formatReadableDate(selectedDate)}
      </h3>
      {all.length > 0 && (
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '12px', marginBottom: 'var(--space-5)' }}>
          {doneCount}/{all.length} completed ({percent}%)
        </p>
      )}
      {all.length === 0 && (
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '12px', marginBottom: 'var(--space-5)' }}>
          No entries yet for this day.
        </p>
      )}

      {CATEGORIES.map(function (cat) {
        var items = dayTasks[cat.key]
        return (
          <div key={cat.key} style={{ marginBottom: 'var(--space-5)' }}>
            <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
              {cat.label}
            </p>

            {items.map(function (task) {
              return (
                <div
                  key={task.id}
                  onClick={function () { toggleTask(selectedDate, cat.key, task.id) }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)',
                    padding: 'var(--space-1) 0', cursor: 'pointer', fontSize: '13px',
                    color: task.done ? 'var(--color-success)' : 'var(--color-text-primary)',
                    textDecoration: task.done ? 'line-through' : 'none',
                  }}
                >
                  <span>{task.done ? '☑' : '☐'}</span>
                  {task.text}
                </div>
              )
            })}

            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
              <input
                value={inputs[cat.key]}
                onChange={function (e) {
                  var updated = Object.assign({}, inputs)
                  updated[cat.key] = e.target.value
                  setInputs(updated)
                }}
                onKeyDown={function (e) { if (e.key === 'Enter') handleAdd(cat.key) }}
                placeholder={'Add a note for ' + cat.label.toLowerCase()}
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)', color: 'var(--color-text-primary)', fontSize: '12px',
                  padding: 'var(--space-2)', outline: 'none',
                }}
              />
              <Button variant="ghost" onClick={function () { handleAdd(cat.key) }}>
                <Plus size={14} />
              </Button>
            </div>
          </div>
        )
      })}
    </Card>
  )
}

export default DayDetailPanel
