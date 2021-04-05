import React, { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_PRODUCTS } from './queries'
import Products from './components/Products'
import LoginForm from './components/LoginForm'

const App = () =>  {
  const [page, setPage] = useState('products')
  const productResult = useQuery(ALL_PRODUCTS)
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const [errorMessage, setErrorMessage] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }


  if (productResult.loading) {
    return(
      <div>loading...</div>
    )
  }

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
    </div>
  );
}

export default App;
