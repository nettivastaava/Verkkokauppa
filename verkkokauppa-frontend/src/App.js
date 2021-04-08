import React, { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import Products from './components/Products'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import ShoppingCart from './components/ShoppingCart'
import { ME } from './queries'

const App = () =>  {
  const [page, setPage] = useState('products')
  const userData = useQuery(ME)
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const [errorMessage, setErrorMessage] = useState(null)
  const [myCart, setMyCart] = useState([])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (userData.loading) {
    return(
      <div>loading...</div>
    )
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

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
    setMyCart([])
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('products')}>products</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <Products
          show={page === 'products'}
        />
        <LoginForm
          setToken={setToken}
          setError={notify}
          show={page === 'login'}
          setPage={setPage}
        />
        <RegistrationForm
          setError={notify}
          show={page === 'register'}
          setPage={setPage}
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('products')}>products</button>
        <button onClick={() => setPage('cart')}>shopping cart</button>
        <button onClick={logout}>logout</button>
      </div>
      <Products
        show={page === 'products'}
        myCart={myCart}
        setMyCart={setMyCart}
        addToCart={addToCart}
      />
      <ShoppingCart
      show={page === 'cart'}
      items={myCart}
      />
    </div>
  );
}

export default App;
