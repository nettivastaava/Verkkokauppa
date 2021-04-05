import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN, ME } from '../queries'

const LoginForm = ({ setError, setToken, show, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    refetchQueries: [ { query: ME } ],  
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => { 
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('shop-user-token', token)
      setPage('products')
    }  
  }, [result.data]) 

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
      <p>New user? <button onClick={() => setPage('register')}>Click here to register</button></p>
    </div>
  )
}

export default LoginForm