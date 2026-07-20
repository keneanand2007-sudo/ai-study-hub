import { Flame } from 'lucide-react'
import { useCalendarStore } from '../../calendar/store/calendarStore.js'
import WidgetContainer from '../WidgetContainer.jsx'

function StreakWidget() {
  const getStreak = useCalendarStore(function (state) { return state.getStreak })
  var streak = getStreak()

  return (
    <WidgetContainer title="Current Streak" glow={streak > 0}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <Flame size={28} color={streak > 0 ? 'var(--color-warning)' : 'var(--color-text-secondary)'} />
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', color: 'var(--color-text-primary)', margin: 0 }}>
            {streak}
          </p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '12px', margin: 0 }}>
            {streak === 1 ? 'day' : 'days'} in a row
          </p>
        </div>
      </div>
    </WidgetContainer>
  )
}

export default StreakWidget
