const express = require('express')
const router = express.Router()
const {
    getHistory,
    addHistory
} = require('../controllers/historyController')
const { authorize } = require('../middleware/auth')
const multer = require('multer')
const MulterGoogleCloudStorage = require('multer-cloud-storage')

const uploadHandler = multer({
    storage: MulterGoogleCloudStorage.storageEngine(),
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}`)
    }
})

router.route('/').get(authorize, getHistory).post(authorize, uploadHandler.any(), addHistory)

module.exports = router