const express = require('express')
const router = express.Router()

const DecisionController = require('../controllers/decision.controller')

router.post('/approve', DecisionController.getBalanceSheet)

module.exports = router
