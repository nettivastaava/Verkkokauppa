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
      comments {
        id
        user
        product
        content
        grade
      }
      units_sold
      average_grade
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
      id
      cart {
        productName
        amount
        price
      }
    }
  }
  `

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!, $passwordConf: String!) {
    createUser(username: $username, password: $password, passwordConf: $passwordConf) {
      username
    }
  }
`

export const DECREASE_QUANTITY = gql`
  mutation decreaseQuantity($name: String!, $quantity: Int!) {
    decreaseQuantity(name: $name, quantity: $quantity) {
      name
      quantity
    }
  }
`

export const FIND_PRODUCT = gql`
  query findProduct($name: String!) {
    findProduct(name: $name) {
      name
      price
      quantity
      average_grade
    }
  }
`

export const ADD_COMMENT = gql`
  mutation addComment($user: String!, $product: String!, $content: String! $grade: Int!) {
    addComment(user: $user, product: $product, content: $content, grade: $grade) {
      user
      product
      content
      grade
    }
  }
`

export const ALL_COMMENTS = gql`
  query allCommentsByProduct($product: String){
    allComments(product: $product) {
      user
      product
      content
    }
  }
`

export const ADD_TO_CART = gql`
  mutation addToCart($productName: String!, $price: Float!) {
    addToCart(productName: $productName, price: $price) {
      username
      cart {
        productName
        price
        amount
      }
    }
  }
`

export const REMOVE_FROM_CART = gql`
  mutation removeFromCart($productName: String!) {
    removeFromCart(productName: $productName) {
      username
      cart {
        productName
        price
        amount
      }
    }
  }
`

export const TOTAL_PRICE = gql`
  query {
    totalPrice
  }
`

export const CHECKOUT = gql`
  mutation {
    checkout {
      username
      cart {
        productName
        price
        amount
      }
    }
  }
`

export const REMOVE_COMMENT = gql`
  mutation removeComment($productId: String!) {
    removeComment(productId: $productId) {
      name
      id
    }
  }
`