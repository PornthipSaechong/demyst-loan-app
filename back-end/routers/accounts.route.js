const express = require('express')
const router = express.Router()

const AccountController = require('../controllers/accounts.controller')

router.get('/balanceSheet', AccountController.getBalanceSheet)

module.exports = router
