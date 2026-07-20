import { ChevronLeft, ChevronRight, Flame } from 'lucide-react'
import { useCalendarStore } from '../store/calendarStore.js'

var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function formatDateKey(year, month, day) {
  var m = String(month + 1).padStart(2, '0')
  var d = String(day).padStart(2, '0')
  return year + '-' + m + '-' + d
}

function getColorForCompletion(ratio) {
  if (ratio === null) return 'transparent'
  if (ratio >= 1) return 'rgba(0, 255, 157, 0.35)'
  if (ratio >= 0.5) return 'rgba(0, 255, 157, 0.15)'
  if (ratio > 0) return 'rgba(255, 59, 92, 0.2)'
  return 'rgba(120, 120, 120, 0.15)'
}

function LegendDot({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
      <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: color, border: '1px solid var(--color-border)' }} />
      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{label}</span>
    </div>
  )
}

function CalendarGrid() {
  const viewYear = useCalendarStore(function (state) { return state.viewYear })
  const viewMonth = useCalendarStore(function (state) { return state.viewMonth })
  const goToPrevMonth = useCalendarStore(function (state) { return state.goToPrevMonth })
  const goToNextMonth = useCalendarStore(function (state) { return state.goToNextMonth })
  const goToToday = useCalendarStore(function (state) { return state.goToToday })
  const selectedDate = useCalendarStore(function (state) { return state.selectedDate })
  const selectDate = useCalendarStore(function (state) { return state.selectDate })
  const getCompletionForDate = useCalendarStore(function (state) { return state.getCompletionForDate })
  const getMonthStats = useCalendarStore(function (state) { return state.getMonthStats })
  const getStreak = useCalendarStore(function (state) { return state.getStreak })

  var today = new Date()
  var isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth()
  var daysInMonth = getDaysInMonth(viewYear, viewMonth)
  var firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay()
  var stats = getMonthStats(viewYear, viewMonth)
  var streak = getStreak()

  var cells = []
  for (var i = 0; i < firstDayOfWeek; i++) cells.push(null)
  for (var day = 1; day <= daysInMonth; day++) cells.push(day)

  return (
    <div style={{ padding: 'var(--space-6)', flex: 1, minWidth: '320px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <ChevronLeft
            size={20}
            color="var(--color-text-secondary)"
            style={{ cursor: 'pointer' }}
            onClick={goToPrevMonth}
          />
          <h2 style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)', fontSize: '18px', margin: 0, minWidth: '160px', textAlign: 'center' }}>
            {MONTH_NAMES[viewMonth]} {viewYear}
          </h2>
          <ChevronRight
            size={20}
            color="var(--color-text-secondary)"
            style={{ cursor: 'pointer' }}
            onClick={goToNextMonth}
          />
        </div>

        {!isCurrentMonth && (
          <span
            onClick={goToToday}
            style={{ fontSize: '12px', color: 'var(--color-primary)', cursor: 'pointer', border: '1px solid var(--color-border-glow)', padding: 'var(--space-1) var(--space-3)', borderRadius: 'var(--radius-pill)' }}
          >
            Today
          </span>
        )}

        {streak > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-warning)', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
            <Flame size={16} />
            {streak} day streak
          </div>
        )}
      </div>

      <p style={{ color: 'var(--color-text-secondary)', fontSize: '12px', marginBottom: 'var(--space-5)' }}>
        {stats.trackedDays > 0
          ? stats.perfectDays + ' of ' + stats.trackedDays + ' tracked days fully completed this month'
          : 'No data tracked yet this month'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 'var(--space-2)', maxWidth: '560px' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(function (d) {
          return (
            <div key={d} style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-secondary)', paddingBottom: 'var(--space-2)' }}>
              {d}
            </div>
          )
        })}

        {cells.map(function (day, index) {
          if (day === null) return <div key={'empty-' + index} />

          var dateKey = formatDateKey(viewYear, viewMonth, day)
          var isToday = isCurrentMonth && day === today.getDate()
          var isSelected = dateKey === selectedDate
          var completion = getCompletionForDate(dateKey)

          return (
            <div
              key={dateKey}
              onClick={function () { selectDate(dateKey) }}
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
                border: isSelected ? '1px solid var(--color-primary)' : isToday ? '1px solid var(--color-border-glow)' : '1px solid var(--color-border)',
                boxShadow: isSelected ? '0 0 10px var(--color-primary-glow)' : 'none',
                transition: 'all var(--motion-fast) ease',
              }}
            >
              {day}
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-5)', marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
        <LegendDot color="rgba(0, 255, 157, 0.35)" label="Fully completed" />
        <LegendDot color="rgba(0, 255, 157, 0.15)" label="Half completed" />
        <LegendDot color="rgba(255, 59, 92, 0.2)" label="Some progress" />
        <LegendDot color="rgba(120, 120, 120, 0.15)" label="No progress" />
      </div>
    </div>
  )
}

export default CalendarGrid
