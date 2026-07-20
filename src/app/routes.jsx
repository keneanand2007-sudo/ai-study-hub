import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../modules/auth/pages/LoginPage.jsx'
import ProtectedRoute from '../modules/auth/components/ProtectedRoute.jsx'
import DashboardPage from '../modules/dashboard/pages/DashboardPage.jsx'
import NotesPage from '../modules/notes/pages/NotesPage.jsx'
import CalendarPage from '../modules/calendar/pages/CalendarPage.jsx'
import TargetsPage from '../modules/targets/pages/TargetsPage.jsx'
import ShortcutsPage from '../modules/shortcuts/pages/ShortcutsPage.jsx'
import SettingsPage from '../modules/settings/pages/SettingsPage.jsx'

export const router = createBrowserRouter([
  { path: '/', element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },
  { path: '/login', element: <LoginPage /> },
  { path: '/notes', element: <ProtectedRoute><NotesPage /></ProtectedRoute> },
  { path: '/calendar', element: <ProtectedRoute><CalendarPage /></ProtectedRoute> },
  { path: '/targets', element: <ProtectedRoute><TargetsPage /></ProtectedRoute> },
  { path: '/shortcuts', element: <ProtectedRoute><ShortcutsPage /></ProtectedRoute> },
  { path: '/settings', element: <ProtectedRoute><SettingsPage /></ProtectedRoute> },
])
