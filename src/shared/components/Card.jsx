import clsx from 'clsx'

function Card({ children, className, glow = false, style }) {
  return (
    <div
      className={clsx('ash-card', className)}
      style={{
        background: 'rgba(13, 15, 24, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        transition: `border-color var(--motion-normal) ease, box-shadow var(--motion-normal) ease`,
        boxShadow: glow ? '0 0 20px var(--color-primary-glow)' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default Card