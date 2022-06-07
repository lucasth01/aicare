const express = require('express')
const router = express.Router()
const {
    getHistory,
    addHistory
} = require('../controllers/historyController')
const { authorize } = require('../middleware/auth')
const Multer = require('multer')
const imgUpload = require('../middleware/imageUpload')

const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
})

router.route('/').get(authorize, getHistory).post(authorize, multer.single('file'), imgUpload.uploadToGcs, addHistory)

module.exports = router