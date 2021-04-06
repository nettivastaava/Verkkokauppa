import { gql } from '@apollo/client'

export const ALL_PRODUCTS = gql`
  query allProductsByCategory($category: String){
    allProducts(category: $category) {
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
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ALL_CATEGORIES = gql`
query {
  allCategories
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
    createUser(username: $username, password: $password) {
      username
    }
  }
`