// const admin = require('firebase-admin');
// const path = require('path');

// // Load service account key
// const serviceAccountPath = path.join(__dirname, '..', 'serviceAccountKey.json');
// const serviceAccount = require(serviceAccountPath);

// // Initialize Firebase Admin (only once)
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
// }

// const db = admin.firestore();

// module.exports = { db, admin };


const admin = require("firebase-admin");
const path = require("path");

let serviceAccount;

// ✔ When running on Render, use JSON from environment variable
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.log("Using FIREBASE_SERVICE_ACCOUNT from environment.");
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// ✔ When running local, use serviceAccountKey.json
} else {
  console.log("Using local serviceAccountKey.json file.");
  const serviceAccountPath = path.join(__dirname, "..", "serviceAccountKey.json");
  serviceAccount = require(serviceAccountPath);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

module.exports = { db, admin };
