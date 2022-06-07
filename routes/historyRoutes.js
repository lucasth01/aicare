const express = require('express')
const router = express.Router()
const {
    getHistory,
    addHistory
} = require('../controllers/historyController')
const { authorize } = require('../middleware/auth')
const multer = require('multer')
const imgUpload = require('../middleware/imageUpload')

const upload = multer({
    storage: multer.memoryStorage()
})

router.route('/').get(authorize, getHistory).post(authorize, upload.single('file'), imgUpload.uploadToGcs, addHistory)

module.exports = router