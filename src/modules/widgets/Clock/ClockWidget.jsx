import { useState, useEffect } from 'react'
import WidgetContainer from '../WidgetContainer.jsx'

function ClockWidget() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <WidgetContainer title="System Time" glow>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '32px',
          color: 'var(--color-primary)',
          margin: 0,
        }}
      >
        {time.toLocaleTimeString()}
      </p>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px', marginTop: 'var(--space-2)' }}>
        {time.toDateString()}
      </p>
    </WidgetContainer>
  )
}

export default ClockWidget