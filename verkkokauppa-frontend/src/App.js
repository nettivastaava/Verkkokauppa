import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient, useMutation, useLazyQuery } from '@apollo/client'
import Products from './components/Products'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import ShoppingCart from './components/ShoppingCart'
import Notification from './components/Notification'
import Menu from './components/Menu'
import image from './logos/pw_logo.png'
import { Image } from 'react-bootstrap'
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

  useEffect(() => {
    document.title = 'Pennywise Web Store'
  }, [])

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
      <div className="container">
        <div className="header">
          <Image width="140" height="140" src={image} />
          <h1>Pennywise Web Store</h1>
        </div>
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
      <div className="container">
        <div className="header">
          <Image width="140" height="140" src={image} />
          <h1>Pennywise Web Store</h1>
        </div>
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
  );
}

export default App;
