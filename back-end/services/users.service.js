const userData = require('../model/users.json')
const providerData = require('../model/providers.json')

exports.getUsers = async function () {
  try {
    return userData
  } catch (e) {
    // Log Errors
    throw Error('Error while getting data')
  }
}

exports.getProviders = async function () {
  try {
    return providerData
  } catch (e) {
    // Log Errors
    console.error(e)
    throw Error('Error while getting data')
  }
}
