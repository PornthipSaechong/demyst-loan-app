const providerConfig = require('../config/config.json')
const axios = require('axios')

exports.getDecision = async function (year, businessName, profitOrLoss, averageAssetsValue, loanAmount) {
  try {
    const decisionEngine = providerConfig.decisionEngine
    let preAssessment = 20
    if (profitOrLoss > 0) {
      preAssessment = 60
    }

    if (averageAssetsValue > loanAmount) {
      preAssessment = 100
    }
    const res = await axios.post(decisionEngine.endpoint, { year, businessName, profitOrLoss, preAssessment })
    return res.data
  } catch (e) {
    // Log Errors
    console.error(e)
    throw Error('Error while getting data')
  }
}
