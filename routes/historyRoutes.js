const express = require('express')
const router = express.Router()
const {
    getHistory,
    addHistory
} = require('../controllers/historyController')
const { authorize } = require('../middleware/auth')

router.route('/').get(authorize, getHistory).post(authorize, addHistory)

module.exports = router