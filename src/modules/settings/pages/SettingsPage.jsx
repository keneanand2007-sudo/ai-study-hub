import { Sun, Moon } from 'lucide-react'
import FocusModeWrapper from '../../../shared/components/FocusModeWrapper.jsx'
import Card from '../../../shared/components/Card.jsx'
import { useSettingsStore } from '../store/settingsStore.js'

function SettingsPage() {
  const theme = useSettingsStore(function (state) { return state.theme })
  const setTheme = useSettingsStore(function (state) { return state.setTheme })

  return (
    <FocusModeWrapper>
      <div style={{ padding: 'var(--space-8)', maxWidth: '500px' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)', fontSize: '18px', marginBottom: 'var(--space-6)' }}>
          SETTINGS
        </h2>

        <Card>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
            Appearance
          </h3>

          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <div
              onClick={function () { setTheme('dark') }}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-5)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                border: theme === 'dark' ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                boxShadow: theme === 'dark' ? '0 0 12px var(--color-primary-glow)' : 'none',
                color: theme === 'dark' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              }}
            >
              <Moon size={22} />
              <span style={{ fontSize: '13px' }}>Dark (HUD)</span>
            </div>

            <div
              onClick={function () { setTheme('light') }}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-5)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                border: theme === 'light' ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                boxShadow: theme === 'light' ? '0 0 12px var(--color-primary-glow)' : 'none',
                color: theme === 'light' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              }}
            >
              <Sun size={22} />
              <span style={{ fontSize: '13px' }}>Light</span>
            </div>
          </div>
        </Card>
      </div>
    </FocusModeWrapper>
  )
}

export default SettingsPage
