import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import FocusModeWrapper from '../../../shared/components/FocusModeWrapper.jsx'
import TargetCategory from '../components/TargetCategory.jsx'
import Button from '../../../shared/components/Button.jsx'
import { useTargetsStore } from '../store/targetsStore.js'
import { useCalendarStore } from '../../calendar/store/calendarStore.js'

function TargetsPage() {
  const checkAndResetForNewDay = useTargetsStore(function (state) { return state.checkAndResetForNewDay })
  const currentDateKey = useTargetsStore(function (state) { return state.currentDateKey })
  const templates = useTargetsStore(function (state) { return state.templates })
  const completed = useTargetsStore(function (state) { return state.completed })
  const submitDay = useTargetsStore(function (state) { return state.submitDay })
  const resetForNextDay = useTargetsStore(function (state) { return state.resetForNextDay })
  const getCompletionRatio = useTargetsStore(function (state) { return state.getCompletionRatio })
  const syncDailyTargets = useCalendarStore(function (state) { return state.syncDailyTargets })

  const [justSubmitted, setJustSubmitted] = useState(false)

  useEffect(function () {
    checkAndResetForNewDay()
  }, [])

  function handleSubmit() {
    syncDailyTargets(currentDateKey, templates, completed)
    submitDay()
    setJustSubmitted(true)
    setTimeout(function () {
      resetForNextDay()
      setJustSubmitted(false)
    }, 1800)
  }

  var ratio = getCompletionRatio()
  var percent = Math.round(ratio * 100)

  return (
    <FocusModeWrapper>
      <div style={{ padding: 'var(--space-10)', maxWidth: '1200px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)', fontSize: '20px', margin: 0, marginBottom: 'var(--space-2)' }}>
              DAILY TARGETS
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px', margin: 0 }}>
              {currentDateKey} · {percent}% completed today
            </p>
          </div>

          <Button variant="primary" onClick={handleSubmit} disabled={justSubmitted}>
            {justSubmitted ? 'Submitted ✓' : 'Submit Day'}
          </Button>
        </div>

        {justSubmitted && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', color: 'var(--color-success)', fontSize: '13px' }}>
            <CheckCircle2 size={16} />
            Saved to calendar. Preparing tomorrow's checklist...
          </div>
        )}

        <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
          <TargetCategory categoryKey="study" label="Study" accentColor="var(--color-primary)" />
          <TargetCategory categoryKey="social" label="Social" accentColor="var(--color-secondary)" />
          <TargetCategory categoryKey="physical" label="Physical" accentColor="var(--color-success)" />
        </div>
      </div>
    </FocusModeWrapper>
  )
}

export default TargetsPage
