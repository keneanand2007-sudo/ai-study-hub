import FocusModeWrapper from '../../../shared/components/FocusModeWrapper.jsx'
import ClockWidget from '../../../modules/widgets/Clock/ClockWidget.jsx'
import RecentNotesWidget from '../../../modules/widgets/RecentNotes/RecentNotesWidget.jsx'
import TodayTargetsWidget from '../../../modules/widgets/TodayTargets/TodayTargetsWidget.jsx'

function DashboardPage() {
  return (
    <FocusModeWrapper>
      <div style={{ padding: 'var(--space-8)' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)', fontSize: '18px', marginBottom: 'var(--space-6)' }}>
          OVERVIEW
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-5)' }}>
          <ClockWidget />
          <TodayTargetsWidget />
          <RecentNotesWidget />
        </div>
      </div>
    </FocusModeWrapper>
  )
}

export default DashboardPage
