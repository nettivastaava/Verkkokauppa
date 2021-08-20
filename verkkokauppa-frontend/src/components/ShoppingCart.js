import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { REMOVE_FROM_CART, CHECKOUT, ME, ALL_PRODUCTS } from '../queries'
import { Button, Table } from 'react-bootstrap'

const ShoppingCart = ({ user, setNotification, setError }) => {
  const [shoppingCart, setShoppingCart] = useState([])
  const [ removeFromCart, removeResult ] = useMutation(REMOVE_FROM_CART, {
    refetchQueries: [ { query: ME } ],
    onError: (error) => {
      setError(error)
    },
  })
  const [ checkout, checkoutResult ] = useMutation(CHECKOUT, {
    refetchQueries: [ { query: ME }, { query: ALL_PRODUCTS} ],
    onError: (error) => {
      setError(error)
    },
  })

  useEffect(() => {
    setShoppingCart(user.cart)
  })

  if (shoppingCart < 1) {
    return (
      <div className="bottomPadding">
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

  const checkoutFunc = async () => {
    if (window.confirm(`Confirm your purchase of $${total}`)) {
      for (var i = 0; i < shoppingCart.length; i++) {
      checkout()
      setNotification(`Your purchase was successful`)
        setTimeout(() => {
          setNotification('')
        }, 5000)
      }
    }
  }
  
  return(
    <div className="bottomPadding">
      <h2>Your shopping cart</h2>
      <Table striped>
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
              <td>${p.price}</td>
              <td>{p.amount}</td>
              <td><Button className="generalButton" onClick={() => removeProductFromCart(p)}>remove</Button></td>
            </tr>
          )}
          <tr>
            <th>grand total:</th>
            <th>${total}</th>
          </tr>
        </tbody>
      </Table>
      <Button className="generalButton" onClick={() => checkoutFunc()}>checkout</Button>
    </div>
  )
}


export default ShoppingCart