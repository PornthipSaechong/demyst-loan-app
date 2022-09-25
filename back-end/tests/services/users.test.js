const UserService = require('../../services/users.service')

test('get businesses by user', async () => {
  const businesses = await UserService.getBusinesses()

  expect(businesses.length).toBe(2)
  expect(businesses[0].id).toBe('b1')
  expect(businesses[0].name).toBe('business1')
  expect(businesses[0].year).toBe(2020)
})

test('get providers by user', async () => {
  const providers = await UserService.getProviders()

  expect(providers.length).toBe(2)
  expect(providers[0].id).toBe('p1')
  expect(providers[0].name).toBe('XERO')
})
