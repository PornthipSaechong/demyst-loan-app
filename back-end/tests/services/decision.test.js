const DecisionService = require('../../services/decision.service')
const axios = require('axios')

jest.mock('axios')

test('get decision at 60 preassessment', async () => {
  axios.post.mockResolvedValue({ data: { approved: true, approvalRate: 60 } })

  const year = 2022
  const businessName = 'business1'
  const profitOrLoss = 1
  const averageAssetsValue = 0
  const loanAmount = 1
  const decision = await DecisionService.getDecision(year, businessName, profitOrLoss, averageAssetsValue, loanAmount)
  expect(decision.approved).toBe(true)
  expect(decision.approvalRate).toBe(60)
})

test('get decision at 100 preassessment', async () => {
  axios.post.mockResolvedValue({ data: { approved: true, approvalRate: 100 } })

  const year = 2022
  const businessName = 'business1'
  const profitOrLoss = 1
  const averageAssetsValue = 2
  const loanAmount = 1
  const decision = await DecisionService.getDecision(year, businessName, profitOrLoss, averageAssetsValue, loanAmount)
  expect(decision.approved).toBe(true)
  expect(decision.approvalRate).toBe(100)
})

test('get decision at 20 preassessment', async () => {
  axios.post.mockResolvedValue({ data: { approved: true, approvalRate: 20 } })

  const year = 2022
  const businessName = 'business1'
  const profitOrLoss = -1
  const averageAssetsValue = 0
  const loanAmount = 1
  const decision = await DecisionService.getDecision(year, businessName, profitOrLoss, averageAssetsValue, loanAmount)
  expect(decision.approved).toBe(true)
  expect(decision.approvalRate).toBe(20)
})

test('get decision but third party is not available', async () => {
  try {
    axios.post.mockRejectedValueOnce()

    const year = 2022
    const businessName = 'business1'
    const profitOrLoss = -1
    const averageAssetsValue = 0
    const loanAmount = 1
    await DecisionService.getDecision(year, businessName, profitOrLoss, averageAssetsValue, loanAmount)
  } catch (e) {
    expect(e.message).toBe('Error while getting data')
  }
})
