// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db };