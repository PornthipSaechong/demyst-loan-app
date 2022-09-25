const express = require('express')
const router = express.Router()

const UserController = require('../controllers/users.controller')

router.get('/:username/business', UserController.getBusinesses)
router.get('/:username/providers', UserController.getProviders)

module.exports = router
