import { render, screen, act } from '@testing-library/react'
import BusinessDetails from '../components/BusinessDetails'
import App from '../App'

test('renders the landing page', async () => {
  const fakeBusinesses = [
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
  const fakeProviders = [
    {
      id: 'p1',
      name: 'XERO'
    },
    {
      id: 'p2',
      name: 'MYOB'
    }
  ]
  const fakeBalanceSheet = [
    {
      year: 2022,
      month: 12,
      profitOrLoss: 250000,
      assetsValue: 1234
    },
    {
      year: 2022,
      month: 11,
      profitOrLoss: 1150,
      assetsValue: 5789
    },
    {
      year: 2022,
      month: 10,
      profitOrLoss: 2500,
      assetsValue: 22345
    }
  ]
  const fakeApproval = { approved: true, approvalRate: 20 }

  jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: fakeBusinesses })
    })
  )
  jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: fakeProviders })
    })
  )
  jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: fakeBalanceSheet })
    })
  )
  jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: fakeApproval })
    })
  )

  await act(async () => {
    render(<App />)
  })
  const next = screen.getByRole('next')

  expect(screen.getByRole('heading')).toHaveTextContent(/Enter Business Details/)
  expect(screen.getByRole('businesses')).toHaveDisplayValue('business1')
  expect(screen.getByRole('providers')).toHaveDisplayValue('XERO')
  expect(screen.getByRole('loan')).toBeEnabled()
  expect(next).toBeEnabled()

  await act(async () => {
    next.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
  expect(screen.getByRole('heading')).toHaveTextContent(/Review Balance Sheet/)
  expect(screen.getByRole('business')).toHaveTextContent('business1')
  expect(screen.getByRole('provider')).toHaveTextContent('XERO')
  expect(screen.getByRole('year')).toHaveTextContent('2020')
  expect(screen.getByRole('loan')).toHaveTextContent(0)

  const apply = screen.getByRole('apply')
  await act(async () => {
    apply.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
  expect(screen.getByRole('heading')).toHaveTextContent(/Congratulation your load has been approved!/)
  expect(screen.getByRole('sub-heading')).toHaveTextContent(/Loan is favored to be approved 20% of the requested value/)
  global.fetch.mockRestore()
})
