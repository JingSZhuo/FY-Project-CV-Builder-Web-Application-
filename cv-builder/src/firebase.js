// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCn-vsj2fUxxAP7FRY4UvhRdo93uFBdAZw",
  authDomain: "cvconstruct2022.firebaseapp.com",
  projectId: "cvconstruct2022",
  storageBucket: "cvconstruct2022.appspot.com",
  messagingSenderId: "225800717774",
  appId: "1:225800717774:web:426a7fb3ccd0964c49d79f",
  measurementId: "G-5EVXQ0V8NV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app