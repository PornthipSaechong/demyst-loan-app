const AccountController = require('../../controllers/accounts.controller')
const AccountService = require('../../services/accounts.service')

test('get businesses from controller', async () => {
  const addMock = jest.spyOn(AccountService, 'getBalanceSheet')
  const balanceSheet = [
    {
      year: 2022,
      month: 12,
      profitOrLoss: 250000,
      assetsValue: 1234
    }
  ]

  addMock.mockImplementation(() => balanceSheet)

  const req = {
    query: {
      provider: 'XERO',
      businessName: 'business1'
    }
  }
  const res = {
    status: (status) => {
      return {
        json: (data) => {
          return data
        },
        send: () => {
          return 'sent'
        }
      }
    }
  }
  const result = await AccountController.getBalanceSheet(req, res)
  expect(result.data.length).toBe(1)
  expect(result.data[0].year).toBe(2022)
  expect(result.data[0].month).toBe(12)
  expect(result.data[0].profitOrLoss).toBe(250000)
  expect(result.data[0].assetsValue).toBe(1234)
})

test('get businesses from controller when service fail', async () => {
  const addMock = jest.spyOn(AccountService, 'getBalanceSheet')
  addMock.mockImplementation(() => { throw new Error('Error while getting data') })

  const req = {
    query: {
      provider: 'XERO',
      businessName: 'business1'
    }
  }
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
  const result = await AccountController.getBalanceSheet(req, res)
  expect(result.status).toBe(400)
})
