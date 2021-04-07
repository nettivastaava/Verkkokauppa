import React, { useState } from 'react'

const AddToCart = (product, cart, setCart) => {
  
}

const ShoppingCart = ({ show }) => {
  const [cart, setCart] = useState([])

  if (!show) {
      return null
  }

  const removeFromCart = (product) => {

  }

  if (cart.length < 1) {
    return (
      <div>
        <h2>Your shopping cart</h2>
        Your shopping cart is currently empty.
      </div>
    )
  }

  return(
    <div>
      <h2>Your shopping cart</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              price
            </th>
            <th>
              amount
            </th>
            <th></th>
          </tr>
          {cart.map(p =>
            <tr key={p.name}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.amount}</td>
              <td><button onClick={() => removeFromCart(p)}>remove</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ShoppingCart