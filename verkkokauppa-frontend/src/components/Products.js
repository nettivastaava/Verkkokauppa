import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_PRODUCTS, ALL_CATEGORIES } from '../queries'
import Product from './Product'

const Products = ({ show, myCart, setMyCart, addToCart }) => {
  const categoriesResult = useQuery(ALL_CATEGORIES)
  const [getProducts, result] = useLazyQuery(ALL_PRODUCTS)
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [productToShow, setProductToShow] = useState(null)
  const [page, setPage] = useState('')

  useEffect(() => {
    if (categoriesResult.data) {
      setCategories(categoriesResult.data.allCategories)
      getProducts()
    }
  }, [categoriesResult, getProducts])

  useEffect(() => {    
    if (result.data) {      
      setProducts(result.data.allProducts)    
    }  
  }, [result])

  if (categoriesResult.loading) {
    return <div>loading...</div>
  }

  if (!show) {
    return null
  }

  const showCategory = (category) => {    
    getProducts({ variables: { category: category } })  
    
    if (!category) {
      setCategory('')
    } else {
      setCategory(category)
    }
  }

  const inspectProduct = (product) => {
    setProductToShow(product)
    setPage('product')
  }
  
  return (
    <div>
      <Product
      show={page === 'product'}
      product={productToShow}
      myCart={myCart}
      setMyCart={setMyCart}
      addToCart={addToCart}
      />
      <h2>Search products</h2>
      
      <div>
        {categories.map(c => 
          <button onClick={() => showCategory(c)}>{c}</button>
        )}
        <button onClick={() => showCategory('')}>clear filters</button>
      </div>
      <p>Products in category</p>
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
          {products.map(p =>
            <tr key={p.name}>
              <td>{p.name}</td>
              <td>{p.price}$</td>
              <td>{p.description}</td>
              <td>{p.quantity}</td>
              <td><button onClick={() => inspectProduct(p)}>view</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Products