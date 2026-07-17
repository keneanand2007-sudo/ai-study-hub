import FocusModeWrapper from '../../../shared/components/FocusModeWrapper.jsx'
import TargetCategory from '../components/TargetCategory.jsx'

function TargetsPage() {
  return (
    <FocusModeWrapper>
      <div style={{ padding: 'var(--space-6)' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)', fontSize: '18px', marginBottom: 'var(--space-6)' }}>
          DAILY TARGETS
        </h2>
        <div style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
          <TargetCategory categoryKey="study" label="Study" />
          <TargetCategory categoryKey="social" label="Social" />
          <TargetCategory categoryKey="physical" label="Physical" />
        </div>
      </div>
    </FocusModeWrapper>
  )
}

export default TargetsPage
