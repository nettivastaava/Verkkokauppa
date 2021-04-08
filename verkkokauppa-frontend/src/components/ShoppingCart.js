import React, { useState } from 'react'

const ShoppingCart = ({ show, items, removeFromCart }) => {
  const [cart, setCart] = useState([])

  if (!show) {
      return null
  }

  if (items.length < 1) {
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
          {items.map(p =>
            <tr key={p.name}>
              <td>{p.name}</td>
              <td>{p.price}$</td>
              <td>{p.amount}</td>
              <td><button onClick={() => removeFromCart(p)}>remove</button></td>
            </tr>
          )}
        </tbody>
      </table>
      <button>checkout</button>
    </div>
  )
}

export default ShoppingCart