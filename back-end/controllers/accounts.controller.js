var AccountService = require('../services/accounts.service')

exports.getBalanceSheet = async function (req, res, next) {
  // Validate request parameters, queries using express-validator

  try {
    const { provider, businessName } = req.query
    var users = await AccountService.getBalanceSheet(provider, businessName)

    return res.status(200).json({ data: users })
  } catch (e) {
    return res.status(400).send()
  }
}
