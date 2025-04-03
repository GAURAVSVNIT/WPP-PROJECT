import { initializeApp, getApp, getApps } from "firebase/app";
<<<<<<< HEAD:hotel_management_site/src/firebase/firebase.js
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
=======
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
>>>>>>> parent of e57d48b (Added Authentication API):hotel_management_site/src/lib/firebase.js

const firebaseConfig = 
{
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurnmentId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const firestore = getFirestore(app);

<<<<<<< HEAD:hotel_management_site/src/firebase/firebase.js
const googleProvider = new GoogleAuthProvider();
// Connect Firebase services to the local emulators (only in development)
if (process.env.NEXT_PUBLIC_ENV === "development") {
    console.log("Using Firebase Emulators...");
    connectFirestoreEmulator(firestore, "localhost", 8080);
    connectAuthEmulator(auth, "http://localhost:9099");
  }
export { auth, firestore, app, googleProvider };
=======
export { auth, firestore, app };
>>>>>>> parent of e57d48b (Added Authentication API):hotel_management_site/src/lib/firebase.js

