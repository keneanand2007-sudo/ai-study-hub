import FocusModeWrapper from '../../../shared/components/FocusModeWrapper.jsx'
import CalendarGrid from '../components/CalendarGrid.jsx'
import DayDetailPanel from '../components/DayDetailPanel.jsx'

function CalendarPage() {
  return (
    <FocusModeWrapper>
      <div style={{ display: 'flex', gap: 'var(--space-6)', padding: 'var(--space-6)', flexWrap: 'wrap' }}>
        <CalendarGrid />
        <DayDetailPanel />
      </div>
    </FocusModeWrapper>
  )
}

export default CalendarPage
