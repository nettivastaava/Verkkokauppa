const { ApolloServer, gql } = require('apollo-server')

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
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})