// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8FzSo0R7xogMM1bcPIdx_x5aqI1nJvMs",
  authDomain: "minblog-59692.firebaseapp.com",
  projectId: "minblog-59692",
  storageBucket: "minblog-59692.appspot.com",
  messagingSenderId: "226391717080",
  appId: "1:226391717080:web:e6cfa5b874ec9355ed93ad",
  measurementId: "G-1C5VGHX4FX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};