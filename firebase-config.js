
// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBlHomdlq0ziskwGtE9CRyjA84r85vRD9A",
  authDomain: "nomercy-ea37a.firebaseapp.com",
  projectId: "nomercy-ea37a",
  storageBucket: "nomercy-ea37a.firebasestorage.app",
  messagingSenderId: "636693283731",
  appId: "1:636693283731:web:9b167a38514517c17a1e66",
  measurementId: "G-GRKR34WSFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, doc, setDoc, getDoc, updateDoc };
