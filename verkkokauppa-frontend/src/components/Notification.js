import React from 'react'

const Notification = ({message}) => {
  if (message === '') {
    return null
  } else if (message.match('^Added')) {
    return <div className='addProd'>{message}</div>
  }
}

export default Notification