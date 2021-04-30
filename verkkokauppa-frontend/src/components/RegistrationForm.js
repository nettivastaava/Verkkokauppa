import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries'
import {
  useHistory
} from "react-router-dom"

const RegistrationForm = ({ setError }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConf, setPasswordConf] = useState('')
    const history = useHistory()

    const [ createUser, result ] = useMutation(CREATE_USER, {  
        onError: (error) => {
          setError(error)
        },
    })

    const submit = async (event) => {
        event.preventDefault()
    
        createUser({ variables: { username, password, passwordConf } })

        setUsername('')
        setPassword('')
        setPasswordConf('')
        history.push('/')
      }

    return (
      <div>
        <h2>Create a new account</h2>
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
          <div>
            confirm password <input
              type='password'
              value={passwordConf}
              onChange={({ target }) => setPasswordConf(target.value)}
            />
          </div>
          <button type='submit'>register</button>
        </form>
      </div>
    )
    
}

export default RegistrationForm