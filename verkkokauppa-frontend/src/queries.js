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

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createuser(username: $username, password: $password) {
      username
    }
  }
`