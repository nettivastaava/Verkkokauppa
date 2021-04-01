const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')


let products = [
  {
    name: 'Canned salmon',
    price: 8,
    quantity: 3,
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    categories: ['snacks'],
    description: 'High quality salmon. Sustainably produced.'
  },
  {
    name: 'VHS player',
    price: 20,
    quantity: 1,
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    categories: ['electronics'],
    description: 'A blast from the past!'
  },
  {
    name: 'Salted peanuts',
    price: 3,
    quantity: 5,
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    categories: ['snacks'],
  },
  { 
    name: 'FIFA 2k16',
    price: 15,
    quantity: 5,
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    categories: ['games'],
    description: 'Really a lot better than 2k15!'
  },
]

const typeDefs = gql`
  type Product {
    name: String!
    price: Int!
    quantity: Int!
    categories: [String!]!
    id: ID!
    description: String 
  }

  type Query {
    productCount: Int!
    allProducts(category: String): [Product]!
  }

  type Mutation {
    addProduct(
      name: String!
      price: Int!
      quantity: Int!
      categories: [String!]!
      description: String
    ): Product
    editProduct(    
      name: String!    
      quantity: Int! 
    ): Product
  }
`

const resolvers = {
  Query: {
      productCount: () => products.length,
      allProducts: async (root, args) => {
        if (!args.category) {
            return products
        } else {
            return products.filter(product => product.categories.includes(args.category))          
        }
      }
  },
  Mutation: {
    addProduct: (root, args) => {
      const product = { ...args, id: uuid() }
      products = products.concat(product)
      return product
    },
    editProduct: (root, args) => {
      const product = products.find(p => p.name === args.name)
        if (!product) {
          return null
        }

      const updatedProduct = { ...product, quantity: args.quantity }
      products = products.map(p => p.name === args.name ? updatedProduct : p)
      return updatedProduct
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})