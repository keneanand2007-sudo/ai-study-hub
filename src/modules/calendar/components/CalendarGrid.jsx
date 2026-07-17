import { useCalendarStore } from '../store/calendarStore.js'

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function formatDateKey(year, month, day) {
  const m = String(month + 1).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${year}-${m}-${d}`
}

function getColorForCompletion(ratio) {
  if (ratio === null) return 'transparent'
  if (ratio >= 1) return 'rgba(0, 255, 157, 0.35)' // dark green
  if (ratio >= 0.5) return 'rgba(0, 255, 157, 0.15)' // light green
  if (ratio > 0) return 'rgba(255, 59, 92, 0.2)' // red-ish
  return 'rgba(120, 120, 120, 0.15)' // grey
}

function CalendarGrid() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfWeek = new Date(year, month, 1).getDay()

  const selectedDate = useCalendarStore((state) => state.selectedDate)
  const selectDate = useCalendarStore((state) => state.selectDate)
  const getCompletionForDate = useCalendarStore((state) => state.getCompletionForDate)

  const cells = []
  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day)
  }

  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <h2
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-text-primary)',
          fontSize: '18px',
          marginBottom: 'var(--space-5)',
        }}
      >
        {today.toLocaleString('default', { month: 'long' })} {year}
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 'var(--space-2)',
          maxWidth: '560px',
        }}
      >
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div
            key={d}
            style={{
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-text-secondary)',
              paddingBottom: 'var(--space-2)',
            }}
          >
            {d}
          </div>
        ))}

        {cells.map((day, index) => {
          if (day === null) return <div key={`empty-${index}`} />

          const dateKey = formatDateKey(year, month, day)
          const isToday = day === today.getDate()
          const isSelected = dateKey === selectedDate
          const completion = getCompletionForDate(dateKey)

          return (
            <div
              key={dateKey}
              onClick={() => selectDate(dateKey)}
              style={{
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontSize: '13px',
                fontFamily: 'var(--font-mono)',
                color: isToday ? 'var(--color-primary)' : 'var(--color-text-primary)',
                background: getColorForCompletion(completion),
                border: isSelected
                  ? '1px solid var(--color-primary)'
                  : isToday
                  ? '1px solid var(--color-border-glow)'
                  : '1px solid var(--color-border)',
                boxShadow: isSelected ? '0 0 10px var(--color-primary-glow)' : 'none',
                transition: 'all var(--motion-fast) ease',
              }}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarGrid