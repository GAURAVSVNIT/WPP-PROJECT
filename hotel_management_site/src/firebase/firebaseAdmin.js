// import admin from "firebase-admin";

// console.log("FIREBASE_SERVICE_ACCOUNT:", process.env.FIREBASE_SERVICE_ACCOUNT);
// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);


// if (!admin.apps.length) {
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//         databaseURL: process.env.FIREBASE_DATABASE_URL,
//     });
// }

// export const auth = admin.auth();
// export const firestore = admin.firestore();
// src/lib/firebaseAdmin.js
import admin from "firebase-admin";

// Ensure the environment variable is set
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.error("FIREBASE_SERVICE_ACCOUNT environment variable is not set.");
  process.exit(1);
}

let serviceAccount;
try {
  // Replace escaped newlines with actual newlines and parse the JSON
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT.replace(/\\n/g, "\n"));
} catch (error) {
  console.error("Error parsing FIREBASE_SERVICE_ACCOUNT:", error);
  process.exit(1);
}

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL, // Ensure this variable is set correctly if needed
    });
  }
} catch (error) {
  console.error("Error initializing Firebase Admin SDK:", error);
  // Log additional details if available
  console.error("Detailed error info:", error.errorInfo, error.codePrefix);
  process.exit(1);
}

export const auth = admin.auth();
export const firestore = admin.firestore();
