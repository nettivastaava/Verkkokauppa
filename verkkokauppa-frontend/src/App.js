import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient, useMutation, useLazyQuery } from '@apollo/client'
import Products from './components/Products'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import ShoppingCart from './components/ShoppingCart'
import Notification from './components/Notification'
import { ME, DECREASE_QUANTITY, ALL_PRODUCTS, ADD_TO_CART } from './queries'
import {
  Switch, Route, Link, useRouteMatch
} from "react-router-dom"

const App = () =>  {
  const [errorMessage, setErrorMessage] = useState('')
  const [notification, setNotification] = useState('')
  const userData = useQuery(ME)
  const [ decreaseQuantity, result ] = useMutation(DECREASE_QUANTITY, {
    refetchQueries: [ { query: ALL_PRODUCTS } ],
    onError: (error) => {
      notify(error)
    },
  })
  const [ addToCart, addResult ] = useMutation(ADD_TO_CART, {
    refetchQueries: [ { query: ALL_PRODUCTS } ],
    onError: (error) => {
      notify(error)
    },
  })
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const [myCart, setMyCart] = useState([])
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    }, 10000)
  }

  if (userData.loading) {
    return(
      <div>loading...</div>
    )
  }

  const addProductToCart =  (productToBeAdded) => {
    const productName = productToBeAdded.name
    const price = productToBeAdded.price
    console.log('prod ', productName)
    addToCart({ variables: { productName, price } })
    setNotification(`Added ${productName} to cart`)
      setTimeout(() => {
        setNotification('')
      }, 5000)

  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  

  if (!localStorage.getItem('shop-user-token')) {
    return (
      <div>
        <h1>Web Store</h1>
        <Notification message={notification} />
        <Menu />
        <Switch>
          <Route path= "/login">
            <LoginForm
              setToken={setToken}
              setNotification={setNotification}
            />      
          </Route>
          <Route path= "/register">
            <RegistrationForm
              setNotification={setNotification}
            />
          </Route>
          <Route path= "/products">
            <Products 
            />
          </Route>
        </Switch>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Web Store</h1>
        <Notification message={notification} />
        <Menu logout={logout}/>
        <Switch>
          <Route path= "/shopping-cart">
            <ShoppingCart
              user = {userData.data.me}
              setNotification={setNotification}
              setError={notify}
            />
          </Route>
          <Route path= "/products">
            <Products 
              myCart={myCart}
              setMyCart={setMyCart}
              addToCart={addProductToCart}
              setError={notify}
            />
          </Route>
        </Switch>
      </div>
    </div>
    
  );
}

const Menu = ({ logout }) => {
  const padding = {
    paddingRight: 5
  }

  if (!localStorage.getItem('shop-user-token')) {
    return(
      <div>
        <a href='/products' style={padding}>products</a>
        <a href='/login' style={padding}>login</a>
      </div>
    )
  }

  return(
    <div>
      <a href='/products' style={padding}>products</a>
      <a href='/shopping-cart' style={padding}>shopping cart</a>
      <a href='/' onClick={logout}>logout</a>
    </div>
  )
}

export default App;
