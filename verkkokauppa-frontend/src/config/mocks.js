import {
  CREATE_USER, LOGIN, ME
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
  }
]

export default mocks