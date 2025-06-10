'use client'

import { useState } from 'react'

import { authClient } from '@/lib/auth-client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Home() {
  const { data: session } = authClient.useSession()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onSubmit = () => {
    authClient.signUp.email(
      {
        name,
        email,
        password
      },
      {
        onError: error => {
          console.error('Sign up error:', error)
        },
        onSuccess: () => {
          console.log('Sign up successful')
          console.log('Session:', session)
        }
      }
    )
  }

  return (
    <div className='flex h-screen flex-col items-center justify-center p-4'>
      <Input
        placeholder='Name'
        value={name}
        onChange={e => setName(e.target.value)}
        className='mb-4'
      />
      <Input
        placeholder='Email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        className='mb-4'
      />
      <Input
        type='password'
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        className='mb-4'
      />

      <Button
        onClick={onSubmit}
        className='w-full'
        disabled={!name || !email || !password}
      >
        Sign Up
      </Button>
    </div>
  )
}
