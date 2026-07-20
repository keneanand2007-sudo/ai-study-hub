import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, FileText, Calendar, Target, Link2, Settings, Focus } from 'lucide-react'
import CommandPalette from '../../modules/search/components/CommandPalette.jsx'
import { useFocusModeStore } from '../store/focusModeStore.js'
import { useAuthStore } from '../../modules/auth/store/authStore.js'
import Button from './Button.jsx'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: FileText, label: 'Notes', path: '/notes' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: Target, label: 'Targets', path: '/targets' },
  { icon: Link2, label: 'Shortcuts', path: '/shortcuts' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentUser = useAuthStore(function (state) { return state.currentUser })
  const logout = useAuthStore(function (state) { return state.logout })
  const toggleFocusMode = useFocusModeStore(function (state) { return state.toggleFocusMode })

  const handleLogout = function () {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div style={{ width: '220px', height: '100vh', background: 'rgba(13, 15, 24, 0.8)', borderRight: '1px solid var(--color-border)', padding: 'var(--space-6) var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flexShrink: 0 }}>
      <CommandPalette />

      <h1 style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', fontSize: '16px', letterSpacing: '1px', marginBottom: 'var(--space-8)', paddingLeft: 'var(--space-2)' }}>
        AI STUDY HUB
      </h1>

      {NAV_ITEMS.map(function (item) {
        var Icon = item.icon
        var active = location.pathname === item.path
        return (
          <div
            key={item.label}
            onClick={function () { navigate(item.path) }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              background: active ? 'rgba(0, 229, 255, 0.08)' : 'transparent',
              border: active ? '1px solid var(--color-border-glow)' : '1px solid transparent',
              fontSize: '14px',
              fontFamily: 'var(--font-sans)',
              transition: 'all var(--motion-fast) ease',
            }}
          >
            <Icon size={18} />
            {item.label}
          </div>
        )
      })}

      <div
        onClick={toggleFocusMode}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          padding: 'var(--space-3) var(--space-4)',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          color: 'var(--color-secondary)',
          border: '1px solid var(--color-border)',
          fontSize: '14px',
          marginTop: 'var(--space-4)',
          transition: 'all var(--motion-fast) ease',
        }}
      >
        <Focus size={18} />
        Focus Mode
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div style={{ color: 'var(--color-text-secondary)', fontSize: '12px', paddingLeft: 'var(--space-2)' }}>
          Signed in as
        </div>
        <div style={{ color: 'var(--color-text-primary)', fontWeight: 700, paddingLeft: 'var(--space-2)' }}>
          {currentUser?.name || currentUser?.email || 'User'}
        </div>
        <Button variant="secondary" onClick={handleLogout} style={{ width: '100%' }}>
          Logout
        </Button>
      </div>

      <p style={{ marginTop: 'var(--space-4)', fontSize: '10px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)', paddingLeft: 'var(--space-2)' }}>
        CTRL+K for commands
      </p>
    </div>
  )
}

export default Sidebar
