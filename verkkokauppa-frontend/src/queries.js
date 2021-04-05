import { gql } from '@apollo/client'

export const ALL_PRODUCTS = gql`
  query {
    allProducts  {
      name
      price
      quantity
      id
      categories
      description
    }
  }
  `
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
    }
  }
  `