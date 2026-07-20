import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore.js'

function ProtectedRoute({ children }) {
  const currentUser = useAuthStore(function (state) { return state.currentUser })
  const location = useLocation()

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
