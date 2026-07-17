import { useState } from 'react'
import clsx from 'clsx'

function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  className,
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div className={clsx('ash-input-wrapper', className)} style={{ marginBottom: 'var(--space-5)' }}>
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: 'var(--space-2)',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            color: 'var(--color-text-secondary)',
          }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: 'var(--space-3) var(--space-4)',
          background: 'rgba(255, 255, 255, 0.02)',
          border: `1px solid ${
            error ? 'var(--color-danger)' : focused ? 'var(--color-primary)' : 'var(--color-border)'
          }`,
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-text-primary)',
          fontSize: '14px',
          fontFamily: 'var(--font-sans)',
          outline: 'none',
          boxShadow: focused ? '0 0 10px var(--color-primary-glow)' : 'none',
          transition: `all var(--motion-fast) ease`,
        }}
      />
      {error && (
        <p style={{ color: 'var(--color-danger)', fontSize: '12px', marginTop: 'var(--space-1)' }}>
          {error}
        </p>
      )}
    </div>
  )
}

export default Input