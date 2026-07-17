import { useRef } from 'react'
import { Upload } from 'lucide-react'
import { useNotesStore } from '../store/notesStore.js'
import Button from '../../../shared/components/Button.jsx'

function UploadButton() {
  const fileInputRef = useRef(null)
  const selectedSubjectId = useNotesStore(function (state) { return state.selectedSubjectId })
  const addNote = useNotesStore(function (state) { return state.addNote })

  function handleFileChange(e) {
    var file = e.target.files[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file only.')
      return
    }
    addNote(selectedSubjectId, file)
    e.target.value = ''
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Button variant="primary" onClick={function () { fileInputRef.current.click() }}>
        Upload PDF
      </Button>
    </div>
  )
}

export default UploadButton
