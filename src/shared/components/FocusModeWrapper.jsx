import { X } from 'lucide-react'
import Sidebar from './Sidebar.jsx'
import { useFocusModeStore } from '../store/focusModeStore.js'

function FocusModeWrapper({ children }) {
  const isFocusMode = useFocusModeStore(function (state) { return state.isFocusMode })
  const toggleFocusMode = useFocusModeStore(function (state) { return state.toggleFocusMode })

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      {!isFocusMode && <Sidebar />}

      {isFocusMode && (
        <div
          onClick={toggleFocusMode}
          style={{
            position: 'fixed',
            top: 'var(--space-4)',
            right: 'var(--space-4)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-2) var(--space-4)',
            borderRadius: 'var(--radius-pill)',
            background: 'rgba(13, 15, 24, 0.9)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-secondary)',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          <X size={14} />
          Exit Focus
        </div>
      )}

      <div style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  )
}

export default FocusModeWrapper
