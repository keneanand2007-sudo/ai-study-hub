import { useTargetsStore } from '../../targets/store/targetsStore.js'
import WidgetContainer from '../WidgetContainer.jsx'

function TodayTargetsWidget() {
  const targets = useTargetsStore(function (state) { return state.targets })
  var all = targets.study.concat(targets.social, targets.physical)
  var doneCount = all.filter(function (t) { return t.done }).length

  return (
    <WidgetContainer title="Today's Targets">
      {all.length === 0 ? (
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>No targets set yet.</p>
      ) : (
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', color: 'var(--color-success)', margin: 0 }}>
            {doneCount}/{all.length}
          </p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '12px', marginTop: 'var(--space-1)' }}>
            targets completed
          </p>
        </div>
      )}
    </WidgetContainer>
  )
}

export default TodayTargetsWidget