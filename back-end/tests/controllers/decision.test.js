const DecisionController = require('../../controllers/decision.controller')
const AccountService = require('../../services/accounts.service')
const DecisionService = require('../../services/decision.service')

test('get decision from controller', async () => {
  const addMock = jest.spyOn(AccountService, 'getBalanceSheet')
  const balanceSheet = [
    {
      year: 2022,
      month: 12,
      profitOrLoss: 250000,
      assetsValue: 1234
    },
    {
      year: 2022,
      month: 11,
      profitOrLoss: 250000,
      assetsValue: 1234
    }
  ]
  addMock.mockImplementation(() => balanceSheet)
  const addMock2 = jest.spyOn(DecisionService, 'getDecision')
  const decision = { approved: true, approvalRate: 20 }
  addMock2.mockImplementation(() => decision)

  const req = {
    body: {
      year: 2022,
      businessName: 'business1',
      provider: 'XERO',
      loanAmount: 1000
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
  const result = await DecisionController.getDecision(req, res)
  expect(addMock2).toHaveBeenCalledWith(2022, 'business1', 500000, 1234, 1000)
  expect(result.data.approved).toBe(true)
  expect(result.data.approvalRate).toBe(20)
})

test('get decision when decision service fail', async () => {
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
  const addMock2 = jest.spyOn(DecisionService, 'getDecision')
  addMock2.mockImplementation(() => { throw Error('Error while getting data') })
  const req = {
    body: {
      year: 2022,
      businessName: 'business1',
      provider: 'XERO',
      loanAmount: 1000
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

  const result = await DecisionController.getDecision(req, res)
  expect(result.status).toBe(400)
})

test('get decision when account service fail', async () => {
  const addMock = jest.spyOn(AccountService, 'getBalanceSheet')
  addMock.mockImplementation(() => { throw new Error('Error while getting data') })
  const addMock2 = jest.spyOn(DecisionService, 'getDecision')
  const decision = { approved: true, approvalRate: 20 }
  addMock2.mockImplementation(() => decision)
  const req = {
    body: {
      year: 2022,
      businessName: 'business1',
      provider: 'XERO',
      loanAmount: 1000
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
  const result = await DecisionController.getDecision(req, res)
  expect(result.status).toBe(400)
})
