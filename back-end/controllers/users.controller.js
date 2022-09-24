var UserService = require('../services/users.service')

exports.getUsers = async function (req, res, next) {
  // Validate request parameters, queries using express-validator

  try {
    var users = await UserService.getUsers()

    return res.status(200).json({ data: users })
  } catch (e) {
    return res.status(400).json({ message: e.message })
  }
}

exports.getProviders = async function (req, res, next) {
  // Validate request parameters, queries using express-validator

  try {
    var providers = await UserService.getProviders()

    return res.status(200).json({ data: providers })
  } catch (e) {
    return res.status(400).send()
  }
}
