import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { REMOVE_FROM_CART, ALL_PRODUCTS, ME } from '../queries'

const ShoppingCart = ({ user, checkout, setNotification, setError }) => {
  const [shoppingCart, setShoppingCart] = useState([])
  const [ removeFromCart, removeResult ] = useMutation(REMOVE_FROM_CART, {
    refetchQueries: [ { query: ME } ],
    onError: (error) => {
      setError(error)
    },
  })

  useEffect(() => {
    setShoppingCart(user.cart)
  })

  if (shoppingCart < 1) {
    return (
      <div>
        <h2>Your shopping cart</h2>
        Your shopping cart is currently empty.
      </div>
    )
  }

  var total = 0
  shoppingCart.map(item => total += item.price * item.amount)
  total = total.toFixed(2)

  const removeProductFromCart = (productToBeRemoved) => {
    const productName = productToBeRemoved.productName
    removeFromCart({ variables: { productName }})
    setNotification(`Removed ${productName} from cart`)
      setTimeout(() => {
        setNotification('')
      }, 5000) 

    total =-productToBeRemoved.price
  }
  
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
          {shoppingCart.map(p =>
            <tr key={p.product}>
              <td>{p.productName}</td>
              <td>{p.price}$</td>
              <td>{p.amount}</td>
              <td><button onClick={() => removeProductFromCart(p)}>remove</button></td>
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