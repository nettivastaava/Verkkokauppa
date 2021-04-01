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