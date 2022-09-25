const UserController = require('../../controllers/users.controller')
const UserService = require('../../services/users.service')

test('get businesses from controller', async () => {
  const addMock = jest.spyOn(UserService, 'getBusinesses')
  const businesses = [
    {
      id: 'b1',
      name: 'business1',
      year: 2020
    },
    {
      id: 'b2',
      name: 'business2',
      year: 2021
    }
  ]
  addMock.mockImplementation(() => businesses)

  const req = {}
  const res = {
    status: (status) => {
      return {
        json: (data) => {
          return data
        },
        send: () => {
          return { status }
        }
      }
    }
  }
  const result = await UserController.getBusinesses(req, res)
  expect(result.data.length).toBe(2)
  expect(result.data[0].id).toBe('b1')
  expect(result.data[0].name).toBe('business1')
  expect(result.data[0].year).toBe(2020)
})

test('get businesses from controller when service fail', async () => {
  const addMock = jest.spyOn(UserService, 'getBusinesses')
  addMock.mockImplementation(() => { throw new Error('Error while getting data') })

  const req = {}
  const res = {
    status: (status) => {
      return {
        json: (data) => {
          return data
        },
        send: () => {
          return { status }
        }
      }
    }
  }
  const result = await UserController.getBusinesses(req, res)
  expect(result.status).toBe(400)
})

test('get providers from controller', async () => {
  const addMock = jest.spyOn(UserService, 'getProviders')
  const providers = [
    {
      id: 'p1',
      name: 'XERO'
    },
    {
      id: 'p2',
      name: 'MYOB'
    }
  ]
  addMock.mockImplementation(() => providers)

  const req = {}
  const res = {
    status: (status) => {
      return {
        json: (data) => {
          return data
        },
        send: () => {
          return { status }
        }
      }
    }
  }
  const result = await UserController.getProviders(req, res)
  expect(result.data.length).toBe(2)
  expect(result.data[0].id).toBe('p1')
  expect(result.data[0].name).toBe('XERO')
})

test('get providers from controller when service fail', async () => {
  const addMock = jest.spyOn(UserService, 'getProviders')
  addMock.mockImplementation(() => { throw new Error('Error while getting data') })

  const req = {}
  const res = {
    status: (status) => {
      return {
        json: (data) => {
          return data
        },
        send: () => {
          return { status }
        }
      }
    }
  }
  const result = await UserController.getProviders(req, res)
  expect(result.status).toBe(400)
})
