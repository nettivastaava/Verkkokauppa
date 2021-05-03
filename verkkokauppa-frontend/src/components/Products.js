import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_PRODUCTS, ALL_CATEGORIES, ME } from '../queries'
import Product from './Product'
import { Switch, Route, useRouteMatch } from 'react-router'

const Products = ({ myCart, setMyCart, addToCart, setError }) => {
  const categoriesResult = useQuery(ALL_CATEGORIES)
  const [getProducts, result] = useLazyQuery(ALL_PRODUCTS)
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [productToShow, setProductToShow] = useState(null)
  

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

  const match = useRouteMatch('/products/:id')   
  const product = match    
    ? products.find(p => p.id === match.params.id)    
    : null

  if (categoriesResult.loading || result.loading) {
    return <div>loading...</div>
  }

  const showCategory = (category) => {    
    getProducts({ variables: { category: category } })  
    
    if (!category) {
      setCategory('')
    } else {
      setCategory(category)
    }
  }
  
  return (
    <div>
      <Switch>
        <Route path= "/products/:id">
          <Product
            shownProduct={product}
            myCart={myCart}
            setMyCart={setMyCart}
            addToCart={addToCart}
            setError={setError}
          />
        </Route>
      </Switch>
      <h2>Search products</h2>
      
      <div>
        {categories.map(c => 
          <button onClick={() => showCategory(c)}>{c}</button>
        )}
        <button onClick={() => showCategory('')}>trending</button>
      </div>
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
              <td><a href={`/products/${p.id}`} >{p.name}</a></td>
              <td>{p.price}$</td>
              <td>{p.description}</td>
              <td>{p.quantity}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Products