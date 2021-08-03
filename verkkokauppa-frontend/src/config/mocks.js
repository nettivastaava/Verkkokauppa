import {
  CREATE_USER, LOGIN, ME, ALL_PRODUCTS, ALL_CATEGORIES, ADD_COMMENT
} from '../queries'

const mocks = [
  {
    request: {
      query: CREATE_USER,
      variables: {
        username: 'Harri',
        password: 'salainen',
        passwordConf: 'salainen'
      }
    },
    result: {
      data: {
        createUser: {
          username: 'Harri',
          password: 'salainen',
          passwordConf: 'salainen'
        }
      }
    }
  },
  {
    request: {
      query: LOGIN,
      variables: {
        username: 'Harri',
        password: 'salainen',
      }
    },
    result: {
      data: {
        login: {
          value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1NjFjNWE2LTc1NjYtNDA5Ny04NDUzLWM5MjU0NDE0ZTM5NyIsImVtYWlsIjoiaGVoZUBoZWhlLmZpIiwiaWF0IjoxNjIzNzY1NjkwLCJleHAiOjE2MjM3NjkyOTB9.WMQnhKrWbjqPxiieWsVMY4x5GA6pi91DM9zo5eo0GFY',
        }
      }
    }
  },
  {
    request: {
      query: ME
    },
    result: {
      data: {
        me: {
          username: 'Harri',
        }
      }
    }
  },
  {
    request: {
      query: ALL_CATEGORIES,
    },
    result: {
      data: {
        allCategories: [
            "electronics",
            "clothing"
        ]
      }
    },
  },
  {
    request: {
      query: ALL_PRODUCTS,
    },
    result: {
      data: {
        allProducts: [
          {
            _typename: "Product",
            name: "Two sizes too big, faded Taz t-shirt",
            price: 17.45,
            quantity: 5,
            units_sold: 0,
            average_grade: null,
            description: "Guaranteed to be ill-fitting",
            comments: [],
            categories: [ "clothing" ],
            id: "ff28rj292fkfljf92"
          },
          {
            _typename: "Product",
            name: "Color TV",
            price: 399.95,
            quantity: 2,
            units_sold: 0,
            average_grade: null,
            comments: [],
            categories: [ "electronics" ],
            id: "ff28rj2929fjf92" 
          }
        ]
      }
    },
  },
  {
    request: {
      query: ADD_COMMENT,
      variables: {
        user: 'Harri',
        product: 'ff28rj292fkfljf92',
        content: 'Oli ihan liian piukka',
        grade: 2
      }
    },
    result: {
      data: {
        addComment: {
          user: 'Harri',
          product: 'ff28rj292fkfljf92',
          content: 'Oli ihan liian piukka',
          grade: 2
        }
      }
    }
  },
]

export default mocks