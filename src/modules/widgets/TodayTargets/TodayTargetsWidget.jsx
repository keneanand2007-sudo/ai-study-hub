import { useTargetsStore } from '../../targets/store/targetsStore.js'
import WidgetContainer from '../WidgetContainer.jsx'

function TodayTargetsWidget() {
  const completed = useTargetsStore(function (state) { return state.completed })
  var all = []
  Object.keys(completed).forEach(function (cat) {
    Object.keys(completed[cat]).forEach(function (id) {
      all.push(completed[cat][id])
    })
  })
  var doneCount = all.filter(function (v) { return v }).length

  return (
    <WidgetContainer title="Today's Targets">
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', color: 'var(--color-success)', margin: 0 }}>
        {doneCount}/{all.length}
      </p>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '12px', marginTop: 'var(--space-1)' }}>
        targets completed
      </p>
    </WidgetContainer>
  )
}

export default TodayTargetsWidget
