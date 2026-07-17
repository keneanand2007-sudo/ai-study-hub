import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { getPdfFile } from '../../../shared/utils/pdfStorage.js'

function PdfViewerModal({ note, onClose }) {
  const [fileUrl, setFileUrl] = useState(null)

  useEffect(function () {
    if (!note) {
      setFileUrl(null)
      return
    }
    var objectUrl = null
    getPdfFile(note.id).then(function (file) {
      if (file) {
        objectUrl = URL.createObjectURL(file)
        setFileUrl(objectUrl)
      }
    })
    return function () {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [note])

  if (!note) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(5, 6, 10, 0.85)', backdropFilter: 'blur(6px)',
        zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'var(--space-6)',
      }}
    >
      <div
        onClick={function (e) { e.stopPropagation() }}
        style={{
          width: '100%', maxWidth: '900px', height: '90vh',
          background: 'var(--color-surface)', border: '1px solid var(--color-primary)',
          borderRadius: 'var(--radius-lg)', boxShadow: '0 0 30px var(--color-primary-glow)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border)' }}>
          <p style={{ color: 'var(--color-text-primary)', fontSize: '14px', margin: 0, fontFamily: 'var(--font-mono)' }}>
            {note.title}
          </p>
          <X size={20} color="var(--color-text-secondary)" style={{ cursor: 'pointer' }} onClick={onClose} />
        </div>

        {fileUrl ? (
          <iframe src={fileUrl} title={note.title} style={{ flex: 1, border: 'none', width: '100%' }} />
        ) : (
          <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: 'var(--space-8)' }}>
            Loading PDF...
          </p>
        )}
      </div>
    </div>
  )
}

export default PdfViewerModal
