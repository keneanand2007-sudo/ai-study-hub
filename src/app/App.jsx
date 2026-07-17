import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.jsx'
import { useSettingsStore } from '../modules/settings/store/settingsStore.js'

function App() {
  const theme = useSettingsStore(function (state) { return state.theme })

  useEffect(function () {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return <RouterProvider router={router} />
}

export default App
