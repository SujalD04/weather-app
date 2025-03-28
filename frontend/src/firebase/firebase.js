// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js'
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js' 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtUyJONURL9LHsGre8pOpDK3cQz-Ddz1w",
  authDomain: "weather-app-d6323.firebaseapp.com",
  projectId: "weather-app-d6323",
  storageBucket: "weather-app-d6323.firebasestorage.app",
  messagingSenderId: "576784281417",
  appId: "1:576784281417:web:dbcf634c312f5abfd17498",
  measurementId: "G-Q9NT1ZWGE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
