import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../modules/auth/pages/LoginPage.jsx'
import DashboardPage from '../modules/dashboard/pages/DashboardPage.jsx'
import NotesPage from '../modules/notes/pages/NotesPage.jsx'
import CalendarPage from '../modules/calendar/pages/CalendarPage.jsx'
import TargetsPage from '../modules/targets/pages/TargetsPage.jsx'
import ShortcutsPage from '../modules/shortcuts/pages/ShortcutsPage.jsx'
import SettingsPage from '../modules/settings/pages/SettingsPage.jsx'

export const router = createBrowserRouter([
  { path: '/', element: <DashboardPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/notes', element: <NotesPage /> },
  { path: '/calendar', element: <CalendarPage /> },
  { path: '/targets', element: <TargetsPage /> },
  { path: '/shortcuts', element: <ShortcutsPage /> },
  { path: '/settings', element: <SettingsPage /> },
])
