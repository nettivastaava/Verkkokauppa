import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient, useMutation, useLazyQuery } from '@apollo/client'
import Products from './components/Products'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import ShoppingCart from './components/ShoppingCart'
import Notification from './components/Notification'
import { ME, DECREASE_QUANTITY, ALL_PRODUCTS } from './queries'
import {
  Switch, Route, Link, useRouteMatch
} from "react-router-dom"

const App = () =>  {
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState('')
  const [ decreaseQuantity, result ] = useMutation(DECREASE_QUANTITY, {
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
      setErrorMessage(null)
    }, 10000)
  }

  const checkout = async () => {
    for (var i = 0; i < myCart.length; i++) {
      const productToBePaid = myCart[i]
      
      const name = productToBePaid.name
      const quantity = productToBePaid.amount

      decreaseQuantity({ variables: { name, quantity } })
  
    }
    setMyCart([])
    setNotification(`Your purchase was successful`)
      setTimeout(() => {
        setNotification('')
      }, 5000)
  }

  const removeFromCart = (product) => {
    const copy = [...myCart]
    for (var i = 0; i < myCart.length; i++) {
      if (myCart[i].name === product.name) {
        if (myCart[i].amount > 1) {
          copy[i].amount-=1
          setMyCart(copy)
          setNotification(`Removed ${product.name} from cart`)
          setTimeout(() => {
            setNotification('')
          }, 5000)
          break
        } else {
          copy.splice(i, 1)
          setMyCart(copy)
          setNotification(`Removed ${product.name} from cart`)
          setTimeout(() => {
            setNotification('')
          }, 5000)
          break
        }
      }
    }
  }

  const addToCart =  (product) => {
    const productToCart = {
      name: product.name,
      price: product.price,
      amount: 1
    }
    console.log('prod ', product)
    console.log('list', myCart)

    var found = false;
    for(var i = 0; i < myCart.length; i++) {
      if (myCart[i].name === productToCart.name) {
        found = true
        if (myCart[i].amount < product.quantity) {
          const copy = [...myCart]
          const updatedProduct = {
            name: product.name,
            price: product.price,
            amount: myCart[i].amount + 1
          }
          copy[i] = updatedProduct
          setMyCart(copy)
          setNotification(`Added ${product.name} to cart`)
          setTimeout(() => {
            setNotification('')
          }, 5000)
          break
        }
      }
    }

    if (!found && product.quantity > 0) {
      console.log('POP')
      const copy = [...myCart, productToCart]
      console.log(copy)
      setMyCart(copy)
          setNotification(`Added ${product.name} to cart`)
          setTimeout(() => {
            setNotification('')
      }, 5000)
      console.log(myCart)
    } 
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setMyCart([])
  }

  if (!localStorage.getItem('shop-user-token')) {
    return (
      <div>
        <h1>Web Store</h1>
        <Menu />
        <Switch>
          <Route path= "/login">
            <LoginForm
              setToken={setToken}
              setError={notify}
            />      
          </Route>
          <Route path= "/register">
            <RegistrationForm
              setError={notify}
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
              items={myCart}
              removeFromCart={removeFromCart}
              checkout={checkout}
            />
          </Route>
          <Route path= "/products">
            <Products 
              myCart={myCart}
              setMyCart={setMyCart}
              addToCart={addToCart}
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
