// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEWRkURaOkbt5-6htSNbYVkdq3qpmdoeI",
  authDomain: "books-api-e9179.firebaseapp.com",
  projectId: "books-api-e9179",
  storageBucket: "books-api-e9179.firebasestorage.app",
  messagingSenderId: "824490402853",
  appId: "1:824490402853:web:8a5c6c666c139f80de4bcc",
  measurementId: "G-FQBJ0ENDKF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
