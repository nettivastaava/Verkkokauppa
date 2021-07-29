import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_PRODUCTS, ALL_CATEGORIES, ME } from '../queries'
import Product from './Product'
import { Switch, Route, useRouteMatch } from 'react-router'
import { Table, Button } from 'react-bootstrap'

const Products = ({ myCart, setMyCart, addToCart, setError }) => {
  const categoriesResult = useQuery(ALL_CATEGORIES)
  const [getProducts, result] = useLazyQuery(ALL_PRODUCTS)
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  
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

  const styles = {
    buttonStyle: {
        marginTop: "3px",
        marginBottom: "3px",
        marginRight: "3px",
        marginLeft: "3px"
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
      
      <div className="navBar">
        {categories.map(c => 
          <Button style={styles.buttonStyle} onClick={() => showCategory(c)}>{c}</Button>
        )}
        <Button style={styles.buttonStyle} onClick={() => showCategory('')}>trending</Button>
      </div>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>
              price
            </th>
            <th>
              quantity
            </th>
          </tr>
          {products.map(p =>
            <tr key={p.name}>
              <td><a href={`/products/${p.id}`} >{p.name}</a></td>
              <td>${p.price}</td>
              <td>{p.quantity}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Products