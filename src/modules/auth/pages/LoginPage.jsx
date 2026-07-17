import { useState } from 'react'
import Card from '../../../shared/components/Card.jsx'
import Input from '../../../shared/components/Input.jsx'
import Button from '../../../shared/components/Button.jsx'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login attempt:', { email, password })
    // Business logic yaha nahi likhenge — ye baad me authService.js me jayega
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
          <Button type="submit" variant="primary" className="w-full">
            Enter System
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default LoginPage