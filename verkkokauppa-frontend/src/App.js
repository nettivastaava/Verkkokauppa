import React, { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_PRODUCTS } from './queries'
import Products from './components/Products'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import { ME } from './queries'

const App = () =>  {
  const [page, setPage] = useState('products')
  const productResult = useQuery(ALL_PRODUCTS)
  const userData = useQuery(ME)
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const [errorMessage, setErrorMessage] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (productResult.loading || userData.loading) {
    return(
      <div>loading...</div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('products')}>products</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <Products
          products={productResult.data.allProducts}
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
        <button onClick={logout}>logout</button>
      </div>
      <Products
        products={productResult.data.allProducts}
        show={page === 'products'}
      />
    </div>
  );
}

export default App;
