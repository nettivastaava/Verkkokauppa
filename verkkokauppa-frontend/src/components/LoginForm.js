import React, { useState, useEffect } from 'react'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { LOGIN, ME } from '../queries'
import {
  Switch, Route, Link, useRouteMatch
} from "react-router-dom"

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
      localStorage.setItem('username', username)
      setPage('products')
      window.location.reload()
    }  
  }, [result.data]) 

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
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
      <p>New user? Register <a href='/register'>here</a></p>
    </div>
  )
}

export default LoginForm