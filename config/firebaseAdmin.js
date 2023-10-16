const admin = require('firebase-admin');

const serviceAccount = require('../firebaseserviceaccount.json'); // make sure this path is secure and not exposed to public

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;