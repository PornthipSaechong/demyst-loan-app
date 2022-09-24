const providerConfig = require('../config/config.json')
const axios = require('axios')

exports.getBalanceSheet = async function (provider, businessName) {
  try {
    const thirdParty = providerConfig.accountProviders[provider]
    if (!thirdParty) {
      throw Error('Error while getting data')
    }
    const currentYear = new Date().getFullYear()
    const res = await axios.get(thirdParty.endpoint, { params: { businessName, year: currentYear } })
    return res.data
  } catch (e) {
    // Log Errors
    console.error(e)
    throw Error('Error while getting data')
  }
}
