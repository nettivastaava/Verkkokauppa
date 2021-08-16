import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_PRODUCTS, ALL_CATEGORIES } from '../queries'
import Product from './Product'
import { Switch, Route, useRouteMatch } from 'react-router'
import { Table, Button } from 'react-bootstrap'

const Products = ({ myCart, setMyCart, addToCart, setError }) => {
  const categoriesResult = useQuery(ALL_CATEGORIES)
  const [getProducts, result] = useLazyQuery(ALL_PRODUCTS)
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [productsToShow, setProductsToShow] = useState([])
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    if (categoriesResult.data) {
      setCategories(categoriesResult.data.allCategories)
      getProducts()
    }
  }, [categoriesResult, getProducts])

  useEffect(() => {    
    if (result.data) {      
      setProducts(result.data.allProducts) 
      setProductsToShow(result.data.allProducts)  
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

  const filterByGrade = (grade) => {
    const filteredProducts = products.filter(product => product.average_grade >= grade)
    setProductsToShow(filteredProducts)
  }

  const styles = {
    buttonStyle: {
        marginTop: "3px",
        marginBottom: "5px",
        marginRight: "10px",
        marginLeft: "10px"
    }
  }
  
  return (
    <div className="bottomPadding">
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
      <h2 className="midHeader">Search products by category</h2>
      
      <div className="navBar">
        {categories.map(c => 
          <Button className="categoryButton"style={styles.buttonStyle} onClick={() => showCategory(c)}>{c}</Button>
        )}
        <Button className="categoryButton" style={styles.buttonStyle} onClick={() => showCategory('')}>trending</Button>
      </div>
      <div>
        <div className="float-child">
          Search product by name:
          <input 
            id="nameFilter"
            type='text'
            min='1'
            max='48'
            onChange={({ target }) => setFilter(target.value)}
          />
        </div>
        <div className="float-child">
          Show products with grade at least 
          <input 
            id='gradeFilter'
            type='number'
            min='1'
            max='5'
            size= '2'
            onChange={({ target }) => filterByGrade(target.value)}
          /> 
        </div>
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
          {productsToShow.filter(product => product.name.toLowerCase().includes(filter.toLowerCase())).map(p =>
            <tr key={p.name}>
              <td><a className="textLink" id={p.id} href={`/products/${p.id}`} >{p.name}</a></td>
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