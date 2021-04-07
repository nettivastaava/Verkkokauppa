import React, { useState } from 'react'

const Product = ({ show, product, token }) => {
  const [myCart, setMyCart] = useState([])

  if (!show) {
    return null
  }

  const addToCart = (product) => {
    const productToCart = {
      name: product.name,
      price: product.price
    }
    console.log(productToCart)

    const copy = [...myCart, productToCart]
    console.log(copy)
    setMyCart(copy)

    console.log(myCart)
  }

  if (!localStorage.getItem('shop-user-token')) {
    return(
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

  return(
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
            <td><button onClick={() => addToCart(product)}>add to cart</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Product