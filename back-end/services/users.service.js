const businessData = require('../model/businesses.json')
const providerData = require('../model/providers.json')

exports.getBusinesses = async function () {
  return businessData
}

exports.getProviders = async function () {
  return providerData
}
