import { useState } from 'react'
import { Globe, X, Plus } from 'lucide-react'
import { useShortcutsStore, PRESET_SHORTCUTS } from '../store/shortcutsStore.js'
import Button from '../../../shared/components/Button.jsx'

function getFaviconUrl(url) {
  try {
    var domain = new URL(url).hostname
    return 'https://www.google.com/s2/favicons?domain=' + domain + '&sz=64'
  } catch (err) {
    return null
  }
}

function openInNewTab(url) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

function ShortcutCard({ sc, onDelete }) {
  var favicon = getFaviconUrl(sc.url)

  function handleClick() {
    openInNewTab(sc.url)
  }

  function handleDeleteClick(e) {
    e.stopPropagation()
    onDelete(sc.id)
  }

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'relative',
        background: 'rgba(13, 15, 24, 0.7)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all var(--motion-fast) ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-2)',
      }}
      onMouseEnter={function (e) {
        e.currentTarget.style.borderColor = 'var(--color-primary)'
        e.currentTarget.style.boxShadow = '0 0 12px var(--color-primary-glow)'
      }}
      onMouseLeave={function (e) {
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <X
        size={14}
        color="var(--color-text-secondary)"
        style={{ position: 'absolute', top: 8, right: 8 }}
        onClick={handleDeleteClick}
      />
      {favicon ? (
        <img src={favicon} alt="" width={28} height={28} />
      ) : (
        <Globe size={28} color="var(--color-primary)" />
      )}
      <p style={{ color: 'var(--color-text-primary)', fontSize: '13px', margin: 0 }}>{sc.title}</p>
    </div>
  )
}

function ShortcutGrid() {
  const shortcuts = useShortcutsStore(function (state) { return state.shortcuts })
  const addShortcut = useShortcutsStore(function (state) { return state.addShortcut })
  const deleteShortcut = useShortcutsStore(function (state) { return state.deleteShortcut })

  const [showForm, setShowForm] = useState(false)
  const [showPresets, setShowPresets] = useState(false)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  function handleAdd() {
    if (!title.trim() || !url.trim()) return
    var finalUrl = url.trim()
    if (finalUrl.indexOf('http') !== 0) {
      finalUrl = 'https://' + finalUrl
    }
    addShortcut(title.trim(), finalUrl, 'Custom')
    setTitle('')
    setUrl('')
    setShowForm(false)
  }

  function handlePresetAdd(preset) {
    var alreadyExists = shortcuts.some(function (s) { return s.url === preset.url })
    if (alreadyExists) return
    addShortcut(preset.title, preset.url, preset.category)
  }

  var existingUrls = shortcuts.map(function (s) { return s.url })
  var availablePresets = PRESET_SHORTCUTS.filter(function (p) { return existingUrls.indexOf(p.url) === -1 })

  var grouped = {}
  shortcuts.forEach(function (sc) {
    var cat = sc.category || 'Other'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(sc)
  })

  return (
    <div style={{ padding: 'var(--space-8)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)', fontSize: '18px', margin: 0 }}>
          SHORTCUTS
        </h2>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="outline" onClick={function () { setShowPresets(!showPresets); setShowForm(false) }}>
            {showPresets ? 'Close' : '+ Quick Add'}
          </Button>
          <Button variant="primary" onClick={function () { setShowForm(!showForm); setShowPresets(false) }}>
            {showForm ? 'Cancel' : '+ Custom Link'}
          </Button>
        </div>
      </div>

      {showPresets && (
        <div style={{ marginBottom: 'var(--space-8)', padding: 'var(--space-5)', background: 'rgba(13,15,24,0.5)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '12px', marginBottom: 'var(--space-4)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
            Popular Sites — click to add
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            {availablePresets.map(function (preset) {
              return (
                <div
                  key={preset.url}
                  onClick={function () { handlePresetAdd(preset) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                    padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--color-border)', cursor: 'pointer', fontSize: '13px',
                    color: 'var(--color-text-primary)', transition: 'all var(--motion-fast) ease',
                  }}
                  onMouseEnter={function (e) { e.currentTarget.style.borderColor = 'var(--color-primary)' }}
                  onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--color-border)' }}
                >
                  <Plus size={12} color="var(--color-primary)" />
                  {preset.title}
                </div>
              )
            })}
            {availablePresets.length === 0 && (
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>All presets added already.</p>
            )}
          </div>
        </div>
      )}

      {showForm && (
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-8)', flexWrap: 'wrap' }}>
          <input
            value={title}
            onChange={function (e) { setTitle(e.target.value) }}
            placeholder="Title (e.g. Notion)"
            style={{ flex: '1 1 200px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-text-primary)', fontSize: '13px', padding: 'var(--space-3)', outline: 'none' }}
          />
          <input
            value={url}
            onChange={function (e) { setUrl(e.target.value) }}
            placeholder="URL (e.g. notion.so)"
            style={{ flex: '1 1 200px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-text-primary)', fontSize: '13px', padding: 'var(--space-3)', outline: 'none' }}
          />
          <Button variant="primary" onClick={handleAdd}>Save</Button>
        </div>
      )}

      {Object.keys(grouped).map(function (categoryName) {
        return (
          <div key={categoryName} style={{ marginBottom: 'var(--space-8)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
              {categoryName}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 'var(--space-4)' }}>
              {grouped[categoryName].map(function (sc) {
                return <ShortcutCard key={sc.id} sc={sc} onDelete={deleteShortcut} />
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ShortcutGrid
