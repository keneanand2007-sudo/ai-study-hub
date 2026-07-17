import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, Calendar, Target, Link2, Settings, Search } from 'lucide-react'

const COMMANDS = [
  { id: 'dashboard', label: 'Go to Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'notes', label: 'Go to Notes', icon: FileText, path: '/notes' },
  { id: 'calendar', label: 'Go to Calendar', icon: Calendar, path: '/calendar' },
  { id: 'targets', label: 'Go to Targets', icon: Target, path: '/targets' },
  { id: 'shortcuts', label: 'Go to Shortcuts', icon: Link2, path: '/shortcuts' },
  { id: 'settings', label: 'Go to Settings', icon: Settings, path: '/settings' },
]

function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(function (prev) { return !prev })
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return function () {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) setQuery('')
  }, [isOpen])

  if (!isOpen) return null

  const filtered = COMMANDS.filter(function (cmd) {
    return cmd.label.toLowerCase().indexOf(query.toLowerCase()) !== -1
  })

  function handleSelect(path) {
    navigate(path)
    setIsOpen(false)
  }

  function handleBackdropClick() {
    setIsOpen(false)
  }

  function stopClick(e) {
    e.stopPropagation()
  }

  return (
    <div onClick={handleBackdropClick} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(5, 6, 10, 0.7)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '15vh' }}>
      <div onClick={stopClick} style={{ width: '100%', maxWidth: '480px', background: 'rgba(13, 15, 24, 0.95)', border: '1px solid var(--color-primary)', borderRadius: 'var(--radius-lg)', boxShadow: '0 0 30px var(--color-primary-glow)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border)' }}>
          <Search size={18} color="var(--color-primary)" />
          <input autoFocus value={query} onChange={function (e) { setQuery(e.target.value) }} placeholder="Type a command or search..." style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-primary)', fontSize: '15px', fontFamily: 'var(--font-mono)' }} />
          <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '2px 6px' }}>ESC</span>
        </div>

        <div style={{ maxHeight: '320px', overflowY: 'auto', padding: 'var(--space-2)' }}>
          {filtered.length === 0 && (
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px', padding: 'var(--space-4)', textAlign: 'center' }}>No results found.</p>
          )}
          {filtered.map(function (cmd) {
            var Icon = cmd.icon
            return (
              <div key={cmd.id} onClick={function () { handleSelect(cmd.path) }} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)', cursor: 'pointer', color: 'var(--color-text-primary)', fontSize: '14px', transition: 'background var(--motion-fast) ease' }}
                onMouseEnter={function (e) { e.currentTarget.style.background = 'rgba(0, 229, 255, 0.08)' }}
                onMouseLeave={function (e) { e.currentTarget.style.background = 'transparent' }}
              >
                <Icon size={16} color="var(--color-primary)" />
                {cmd.label}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
