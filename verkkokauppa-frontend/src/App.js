import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_PRODUCTS } from './queries'
import Products from './components/Products'

const App = () =>  {
  const productResult = useQuery(ALL_PRODUCTS)

  if (productResult.loading) {
    return(
      <div>loading...</div>
    )
  }

  return (
    <div>
      <Products
        products={productResult.data.allProducts}
      />
    </div>
  );
}

export default App;
