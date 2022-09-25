const DecisionService = require('../services/decision.service')
const AccountService = require('../services/accounts.service')

exports.getDecision = async function (req, res, next) {
  // Validate request parameters, queries using express-validator

  try {
    const { year, businessName, provider, loanAmount } = req.body
    const balanceSheet = await AccountService.getBalanceSheet(provider, businessName)
    const profitOrLoss = balanceSheet.reduce((total, val) => total + val.profitOrLoss, 0)
    const averageAssetsValue = balanceSheet.reduce((total, val) => total + val.assetsValue, 0) / balanceSheet.length

    const approval = await DecisionService.getDecision(year, businessName, profitOrLoss, averageAssetsValue, loanAmount)
    return res.status(200).json({ data: approval })
  } catch (e) {
    return res.status(400).send()
  }
}
