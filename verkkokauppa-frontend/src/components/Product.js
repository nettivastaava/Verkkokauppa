import userEvent from '@testing-library/user-event'
import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import Comments from './Comments'


const Product = ({ show, product, myCart, setMyCart, addToCart }) => {

  useEffect(() => {
    if (product === null || !localStorage.getItem('shop-user-token')) {
      return
    }

    const buyButton =  document.getElementById('buy-button')

    if (product.quantity < 1) {
      buyButton.disabled = true
    } else {
      buyButton.disabled = false
    }
    
  })

  if (!show) {
    return null
  }

  if (!localStorage.getItem('shop-user-token')) {
    return (
      <div>
        <h2>{product.name}</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                price
              </th>
              <th>
                description
              </th>
              <th>
                quantity
              </th>
            </tr>
            <tr>
              <td>{product.name}</td>
              <td>{product.price}$</td>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
  const button = <button id='buy-button' onClick={() => addToCart(product)}>add to cart</button>

  return (
    
    <div>
      <h2>{product.name}</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              price
            </th>
            <th>
              description
            </th>
            <th>
              quantity
            </th>
            <th></th>
          </tr>
          <tr>
            <td>{product.name}</td>
            <td>{product.price}$</td>
            <td>{product.description}</td>
            <td>{product.quantity}</td>
            <td>{button}</td>
          </tr>
        </tbody>
      </table>
      <Comments 
        comments={product.comments}
      />
    </div>
  )
}

export default Product