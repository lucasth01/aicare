var admin = require("firebase-admin");

var serviceAccount = require('../service-account-key.json') || process.env.FIREBASE_SECRET

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = firebase