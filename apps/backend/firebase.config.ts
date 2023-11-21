// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_0V6Tic1NR7H6tE_noMyNhEacc8wfihc",
  authDomain: "env-a-2310d.firebaseapp.com",
  projectId: "env-a-2310d",
  storageBucket: "env-a-2310d.appspot.com",
  messagingSenderId: "679969211030",
  appId: "1:679969211030:web:32be8693c881f31b35b8b7",
  measurementId: "G-YWEYH55N4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);