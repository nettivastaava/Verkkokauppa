import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN, ME } from '../queries'
import { useHistory, Link } from "react-router-dom"
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const [ login, result ] = useMutation(LOGIN, {
    refetchQueries: [ { query: ME } ],  
    onError: (error) => {
      setNotification('Invalid credentials')
      setTimeout(() => {
        setNotification('')
      }, 10000)
    },
  })

  useEffect(() => { 
    if ( result.data ) {
      const token = result.data.login.value

      localStorage.setItem('shop-user-token', token)
      localStorage.setItem('username', username)
      history.push('/')
      window.location.reload()
    }  
  }, [result.data]) 

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div className="bottomPadding">
      <h2>Login</h2>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            className="textField"
            id='username'
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control  
            className="textField"
            id='password'         
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button className="generalButton" id='login-button' type='submit'>login</Button>
        </Form.Group>
      </Form>
      <p>New user? Register <Link id='register-link' to='/register'>here</Link></p>
    </div>
  )
}

export default LoginForm