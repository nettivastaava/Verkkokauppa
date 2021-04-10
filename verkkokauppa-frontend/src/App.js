import React, { useState } from 'react'
import { useQuery, useApolloClient, useMutation } from '@apollo/client'
import Products from './components/Products'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import ShoppingCart from './components/ShoppingCart'
import { ME, DECREASE_QUANTITY, ALL_PRODUCTS } from './queries'

const App = () =>  {
  const [page, setPage] = useState('products')
  const [errorMessage, setErrorMessage] = useState(null)
  const userData = useQuery(ME)
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

  if (userData.loading)  {
    return(
      <div>loading...</div>
    )
  }

  const checkout = async () => {
    for (var i = 0; i < myCart.length; i++) {
      const productToBePaid = myCart[i]
      
      const name = productToBePaid.name
      const quantity = productToBePaid.amount

      decreaseQuantity({ variables: { name, quantity } })
  
    }
    setMyCart([])
  }

  const removeFromCart = (product) => {
    const copy = [...myCart]
    for (var i = 0; i < myCart.length; i++) {
      if (myCart[i].name === product.name) {
        if (myCart[i].amount > 1) {
          copy[i].amount-=1
          setMyCart(copy)
          break
        } else {
          copy.splice(i, 1)
          setMyCart(copy)
          break
        }
      }
    }
  }

  const addToCart = (product) => {
    const productToCart = {
      name: product.name,
      price: product.price,
      amount: 1
    }
    console.log(productToCart)

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
          break
        }
      }
    }

    if (!found && product.quantity > 0) {
      const copy = [...myCart, productToCart]
      setMyCart(copy)
      console.log(myCart)
    } 

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
      removeFromCart={removeFromCart}
      checkout={checkout}
      />
    </div>
  );
}

export default App;
