const AccountService = require('../../services/accounts.service')
const axios = require('axios')

jest.mock('axios')

test('get balancesheet by valid provider and business name', async () => {
  axios.get.mockResolvedValue({
    data: [
      {
        year: 2022,
        month: 12,
        profitOrLoss: 250000,
        assetsValue: 1234
      }
    ]
  })
  const balanceSheet = await AccountService.getBalanceSheet('XERO', 'business1')
  expect(balanceSheet.length).toBe(1)
  expect(balanceSheet[0].year).toBe(2022)
  expect(balanceSheet[0].month).toBe(12)
  expect(balanceSheet[0].profitOrLoss).toBe(250000)
  expect(balanceSheet[0].assetsValue).toBe(1234)
})

test('get balancesheet by invalid provider and business name', async () => {
  try {
    await AccountService.getBalanceSheet('ABC', 'business1')
  } catch (e) {
    expect(e.message).toBe('Error while getting data')
  }
})

test('get balancesheet by valid provider and business name but third party is not available', async () => {
  try {
    axios.get.mockRejectedValueOnce()

    await AccountService.getBalanceSheet('XERO', 'business1')
  } catch (e) {
    expect(e.message).toBe('Error while getting data')
  }
})
