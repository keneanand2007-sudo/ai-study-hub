import { useState } from 'react'
import { useShortcutsStore } from '../store/shortcutsStore.js'
import { Globe, X } from 'lucide-react'
import Button from '../../../shared/components/Button.jsx'

function getFaviconUrl(url) {
  try {
    const domain = new URL(url).hostname
    return 'https://www.google.com/s2/favicons?domain=' + domain + '&sz=64'
  } catch (err) {
    return null
  }
}

function ShortcutCard({ sc, onDelete }) {
  const favicon = getFaviconUrl(sc.url)

  const cardStyle = {
    position: 'relative',
    background: 'rgba(13, 15, 24, 0.7)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-5)',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'all var(--motion-fast) ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-2)',
  }

  function handleEnter(e) {
    e.currentTarget.style.borderColor = 'var(--color-primary)'
    e.currentTarget.style.boxShadow = '0 0 12px var(--color-primary-glow)'
  }

  function handleLeave(e) {
    e.currentTarget.style.borderColor = 'var(--color-border)'
    e.currentTarget.style.boxShadow = 'none'
  }

  function handleDeleteClick(e) {
    e.preventDefault()
    onDelete(sc.id)
  }

  const linkProps = { href: sc.url, target: '_blank', rel: 'noopener noreferrer' }

  return (
    <a key={sc.id} {...linkProps} style={cardStyle} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <X size={14} color="var(--color-text-secondary)" style={{ position: 'absolute', top: 8, right: 8, cursor: 'pointer' }} onClick={handleDeleteClick} />
      {favicon ? <img src={favicon} alt="" width={28} height={28} /> : <Globe size={28} color="var(--color-primary)" />}
      <p style={{ color: 'var(--color-text-primary)', fontSize: '13px', margin: 0 }}>{sc.title}</p>
    </a>
  )
}

function ShortcutGrid() {
  const shortcuts = useShortcutsStore((state) => state.shortcuts)
  const addShortcut = useShortcutsStore((state) => state.addShortcut)
  const deleteShortcut = useShortcutsStore((state) => state.deleteShortcut)

  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleAdd = () => {
    if (!title.trim() || !url.trim()) return
    var finalUrl = url.trim()
    if (finalUrl.indexOf('http') !== 0) {
      finalUrl = 'https://' + finalUrl
    }
    addShortcut(title.trim(), finalUrl)
    setTitle('')
    setUrl('')
    setShowForm(false)
  }

  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)', fontSize: '18px', margin: 0 }}>
          SHORTCUTS
        </h2>
        <Button variant="outline" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Shortcut'}
        </Button>
      </div>

      {showForm && (
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (e.g. Notion)"
            style={{ flex: '1 1 200px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-text-primary)', fontSize: '13px', padding: 'var(--space-3)', outline: 'none' }}
          />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL (e.g. notion.so)"
            style={{ flex: '1 1 200px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-text-primary)', fontSize: '13px', padding: 'var(--space-3)', outline: 'none' }}
          />
          <Button variant="primary" onClick={handleAdd}>Save</Button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 'var(--space-4)' }}>
        {shortcuts.map((sc) => (
          <ShortcutCard key={sc.id} sc={sc} onDelete={deleteShortcut} />
        ))}
      </div>
    </div>
  )
}

export default ShortcutGrid
