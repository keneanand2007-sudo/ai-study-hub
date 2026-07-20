import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore.js'
import Card from '../../../shared/components/Card.jsx'
import Input from '../../../shared/components/Input.jsx'
import Button from '../../../shared/components/Button.jsx'

function LoginPage() {
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const currentUser = useAuthStore(function (state) { return state.currentUser })
  const register = useAuthStore(function (state) { return state.register })
  const login = useAuthStore(function (state) { return state.login })

  useEffect(function () {
    if (currentUser) {
      navigate('/', { replace: true })
    }
  }, [currentUser, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (isRegister) {
      if (!name.trim()) {
        setError('Please enter your name.')
        return
      }

      var result = register(name.trim(), email.trim(), password)
      if (!result.success) {
        setError(result.message)
        return
      }
      navigate(from, { replace: true })
      return
    }

    var loginResult = login(email.trim(), password)
    if (!loginResult.success) {
      setError(loginResult.message)
      return
    }

    navigate(from, { replace: true })
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-6)',
      }}
    >
      <Card glow style={{ width: '100%', maxWidth: '380px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-primary)',
            fontSize: '20px',
            letterSpacing: '1px',
            marginBottom: 'var(--space-1)',
          }}
        >
          AI STUDY HUB
        </h1>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '13px',
            marginBottom: 'var(--space-6)',
          }}
        >
          Access your academic workspace
        </p>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <Input
              label="Name"
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p style={{ color: 'var(--color-danger)', marginBottom: 'var(--space-4)', fontSize: '13px' }}>
              {error}
            </p>
          )}
          <Button type="submit" variant="primary" className="w-full">
            {isRegister ? 'Create Account' : 'Enter System'}
          </Button>
        </form>

        <div style={{ marginTop: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px', margin: 0 }}>
            {isRegister ? 'Already have an account?' : 'Don’t have an account?'}
          </p>
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister)
              setError('')
            }}
            style={{
              border: 'none',
              background: 'transparent',
              color: 'var(--color-primary)',
              cursor: 'pointer',
              fontSize: '13px',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </div>
      </Card>
    </div>
  )
}

export default LoginPage