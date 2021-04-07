import React from 'react'

const Product = ({ show, product, token }) => {
  if (!show) {
    return null
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
              <th></th>
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
            <td><button>add to cart</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Product