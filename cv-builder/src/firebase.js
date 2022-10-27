// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
 

const firebaseConfig = {
  apiKey: "AIzaSyCn-vsj2fUxxAP7FRY4UvhRdo93uFBdAZw",
  authDomain: "cvconstruct2022.firebaseapp.com",
  projectId: "cvconstruct2022",
  storageBucket: "cvconstruct2022.appspot.com",
  messagingSenderId: "225800717774",
  appId: "1:225800717774:web:426a7fb3ccd0964c49d79f",
  measurementId: "G-5EVXQ0V8NV",
  databaseURL: "https://cvconstruct2022-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

export default app;