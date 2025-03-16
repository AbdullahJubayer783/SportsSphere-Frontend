// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_TgOY9OheD8wOTOtaiLNBzWEgy_x7RII",
  authDomain: "sportssphere-authentication.firebaseapp.com",
  projectId: "sportssphere-authentication",
  storageBucket: "sportssphere-authentication.firebasestorage.app",
  messagingSenderId: "233328201619",
  appId: "1:233328201619:web:cbcb040e023b8795e12266"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);