// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3LCTSkPg9bz_5_6H_t5Twy7Ou9_SQJ7A",
  authDomain: "lab03-10aee.firebaseapp.com",
  projectId: "lab03-10aee",
  storageBucket: "lab03-10aee.firebasestorage.app",
  messagingSenderId: "1043880743185",
  appId: "1:1043880743185:web:34287ba06bb97c00af3cb0",
  measurementId: "G-77BLWGBGSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


