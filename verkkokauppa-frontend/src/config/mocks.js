import {
  CREATE_USER
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
  }
]

export default mocks