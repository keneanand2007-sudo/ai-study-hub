function WidgetContainer({ title, children, glow = false }) {
  return (
    <div
      style={{
        background: 'rgba(13, 15, 24, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        boxShadow: glow ? '0 0 16px var(--color-primary-glow)' : 'none',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-4)',
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  )
}

export default WidgetContainer