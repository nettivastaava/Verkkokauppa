import React, { useState } from 'react'

const Products = (props) => {
    const products = props.products
    console.log(products)
    return (
        <div>
          <h2>Products</h2>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>
                  price
                </th>
                <th>
                  quantity
                </th>
                <th></th>
              </tr>
              {products.map(p =>
                <tr key={p.name}>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.quantity}</td>
                  <td>{p.description}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )
}

export default Products