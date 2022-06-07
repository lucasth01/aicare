const { Storage } = require('@google-cloud/storage')
const fs = require('fs')
const dateFormat = require('dateformat')

const gcs = new Storage({
    projectId: 'aicare-development'
})

const bucketName = 'aicare-bucket'
const bucket = gcs.bucket(bucketName)

function getPublicUrl(filename) {
    return 'https://storage.googleapis.com/' + bucketName + '/aicare-ml/images/' + filename;
}

// let ImgUpload = {}

// ImgUpload.uploadToGcs = (req, res, next) => {
//     if (!req.file) res.status(400).json({ message: 'No file uploaded.' })

//     const gcsname = 'image-' + dateFormat(new Date(), "yyyymmdd-HHMMss")
//     const file = bucket.file(gcsname)

//     const stream = file.createWriteStream({
//         metadata: {
//             contentType: req.file.mimetype
//         }
//     })

//     stream.on('error', (err) => {
//         req.file.cloudStorageError = err
//         console.log(err)
//         next()
//     })

//     stream.on('finish', () => {
//         req.file.cloudStorageObject = gcsname
//         req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
//         next()
//     })

//     stream.end(req.file.buffer)
// }

async function uploadFile(req, res, next) {
    if (!req.file) res.status(400).json({ message: 'No file uploaded.' })
    const gcsname = 'image-' + dateFormat(new Date(), "yyyymmdd-HHMMss")

    await bucket.upload(req.file, {
      destination: 'aicare-ml/images/' + getPublicUrl(gcsname),
    });

    console.log(`${filePath} uploaded to ${bucketName}`);
    next()
}

module.exports = uploadFile