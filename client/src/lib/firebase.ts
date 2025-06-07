import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBlHomdlq0ziskwGtE9CRyjA84r85vRD9A",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nomercy-ea37a.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nomercy-ea37a",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nomercy-ea37a.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "636693283731",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:636693283731:web:9b167a38514517c17a1e66",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-GRKR34WSFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
