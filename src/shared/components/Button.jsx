import clsx from 'clsx'

const VARIANT_STYLES = {
  primary: {
    background: 'rgba(0, 229, 255, 0.1)',
    color: 'var(--color-primary)',
    border: '1px solid var(--color-primary)',
    boxShadow: '0 0 0px var(--color-primary-glow)',
  },
  secondary: {
    background: 'rgba(124, 58, 237, 0.1)',
    color: 'var(--color-secondary)',
    border: '1px solid var(--color-secondary)',
  },
  outline: {
    background: 'transparent',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--color-border)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-text-secondary)',
    border: '1px solid transparent',
  },
  danger: {
    background: 'rgba(255, 59, 92, 0.1)',
    color: 'var(--color-danger)',
    border: '1px solid var(--color-danger)',
  },
}

const GLOW_ON_HOVER = {
  primary: 'var(--color-primary-glow)',
  secondary: 'var(--color-secondary-glow)',
  danger: 'var(--color-danger-glow)',
}

function Button({
  children,
  variant = 'primary',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className,
}) {
  const style = VARIANT_STYLES[variant] || VARIANT_STYLES.primary
  const glow = GLOW_ON_HOVER[variant]

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx('ash-button', className)}
      style={{
        ...style,
        padding: 'var(--space-3) var(--space-5)',
        borderRadius: 'var(--radius-md)',
        fontSize: '13px',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        fontWeight: 500,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: `all var(--motion-fast) ease`,
      }}
      onMouseEnter={(e) => {
        if (!disabled && glow) e.currentTarget.style.boxShadow = `0 0 14px ${glow}`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {loading ? 'LOADING...' : children}
    </button>
  )
}

export default Button