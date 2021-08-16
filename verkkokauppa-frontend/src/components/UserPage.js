import React, { useState, useEffect } from 'react'
import { CHANGE_PASSWORD, ME } from '../queries'
import { Form, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'

const UserPage = ({ setNotification }) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNew, setConfirmNew] = useState('')
  const [changePassword, result] = useMutation(CHANGE_PASSWORD, {
    refetchQueries: [ { query: ME } ],  
    onError: (error) => {
      setNotification('Invalid input')
      setTimeout(() => {
        setNotification('')
      }, 10000)
    },
  })

  useEffect(() => {
    if (result.data) {
      setOldPassword('')
      setNewPassword('')
      setConfirmNew('')

      setNotification('Password updated successfully')
      setTimeout(() => {
        setNotification('')
      }, 10000)
    }
  }, [result.data])

  const submit = (event) => {
    event.preventDefault()

    changePassword({ variables: { oldPassword, newPassword, confirmNew } })
  }

  if (result.loading) {
    return (
      <div>loading...</div>
    )
  }
 
  return (
    <div>
      <h2>User settings</h2>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>Old password:</Form.Label>
          <Form.Control
            className="textField"
            id='oldPassword'         
            type='password'
            value={oldPassword}
            onChange={({ target }) => setOldPassword(target.value)}
          />
          <Form.Label>New password:</Form.Label>
          <Form.Control
            className="textField"
            id='newPassword'         
            type='password'
            value={newPassword}
            onChange={({ target }) => setNewPassword(target.value)}
          />
          <Form.Label>Confirm new password:</Form.Label>
          <Form.Control
            className="textField"
            id='confirmNew'         
            type='password'
            value={confirmNew}
            onChange={({ target }) => setConfirmNew(target.value)}
          />
          <Button className="generalButton" id='change-button' type='submit'>submit</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default UserPage