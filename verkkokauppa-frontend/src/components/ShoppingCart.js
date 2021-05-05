import React, { useState } from 'react'

const ShoppingCart = ({ items, user, removeFromCart, checkout }) => {

  if (user.cart.length < 1) {
    return (
      <div>
        <h2>Your shopping cart</h2>
        Your shopping cart is currently empty.
      </div>
    )
  }

  var total = 0
  user.cart.map(item => total += item.price * item.amount)
  
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
          {user.cart.map(p =>
            <tr key={p.product}>
              <td>{p.product}</td>
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