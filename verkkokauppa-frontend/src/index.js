import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { setContext } from 'apollo-link-context'
import './index.css'

import { 
    ApolloClient, ApolloProvider, HttpLink, InMemoryCache
} from '@apollo/client' 
import {
  BrowserRouter as Router,
} from "react-router-dom"



const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('shop-user-token')
  return {    
    headers: {      
      ...headers,      
      authorization: token ? `bearer ${token}` : null,    
    }  
  }})

const httpLink = new HttpLink({ uri: '/graphql' })
  
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)

