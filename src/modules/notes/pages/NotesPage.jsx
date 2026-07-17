import FocusModeWrapper from '../../../shared/components/FocusModeWrapper.jsx'
import SubjectList from '../components/SubjectList.jsx'
import NotesGrid from '../components/NotesGrid.jsx'

function NotesPage() {
  return (
    <FocusModeWrapper>
      <div style={{ display: 'flex' }}>
        <SubjectList />
        <div style={{ flex: 1 }}>
          <NotesGrid />
        </div>
      </div>
    </FocusModeWrapper>
  )
}

export default NotesPage
