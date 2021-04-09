import React, { useState } from 'react'

const ShoppingCart = ({ show, items, removeFromCart, checkout }) => {

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

  var total = 0
  items.map(item => total += item.price * item.amount)
  
  return(
    <div>
      <h2>Your shopping cart</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              price per unit
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
          <div>grand total: {total}$</div>
        </tbody>
      </table>
      <button onClick={() => checkout()}>checkout</button>
    </div>
  )
}


export default ShoppingCart