// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsVwRRCNN9vwS_i9TDl0F8_DJIHGGEqKA",
  authDomain: "scholar-stream-9947a.firebaseapp.com",
  projectId: "scholar-stream-9947a",
  storageBucket: "scholar-stream-9947a.firebasestorage.app",
  messagingSenderId: "942266192502",
  appId: "1:942266192502:web:1d8553b1b7d360b4034557"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);