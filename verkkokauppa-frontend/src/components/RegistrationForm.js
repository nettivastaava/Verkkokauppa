import React, { useState, useEffect } from 'react'
import { from, useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries'
import {
  useHistory
} from "react-router-dom"
import { Form, Button } from 'react-bootstrap'

const RegistrationForm = ({ setNotification }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConf, setPasswordConf] = useState('')
    const history = useHistory()

    const [ createUser, result ] = useMutation(CREATE_USER, {  
        onError: (error) => {
          setNotification(error.graphQLErrors[0].message)
          setTimeout(() => {
            setNotification('')
          }, 10000)
        },
    })

    useEffect(() => { 
      if ( result.data ) {
        setUsername('')
        setPassword('')
        setPasswordConf('')

        history.push('/login')
      }  
    }, [result.data]) 

    const submit = async (event) => {
        event.preventDefault()
    
        createUser({ variables: { username, password, passwordConf } })
    }

    return (
      <div>
        <h2>Create a new account</h2>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <Form.Label>password:</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Label>password confirmation:</Form.Label>
            <Form.Control
              type='password'
              value={passwordConf}
              onChange={({ target }) => setPasswordConf(target.value)}
            />
          <Button type='submit'>register</Button>
          </Form.Group>
        </Form>
      </div>
    )   
}

export default RegistrationForm