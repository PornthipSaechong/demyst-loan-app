const UserService = require('../services/users.service')

exports.getBusinesses = async function (req, res, next) {
  // Validate request parameters, queries using express-validator

  try {
    const users = await UserService.getBusinesses()

    return res.status(200).json({ data: users })
  } catch (e) {
    return res.status(400).send()
  }
}

exports.getProviders = async function (req, res, next) {
  // Validate request parameters, queries using express-validator

  try {
    const providers = await UserService.getProviders()

    return res.status(200).json({ data: providers })
  } catch (e) {
    return res.status(400).send()
  }
}
