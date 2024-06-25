// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApR2ZzaV18j5wBShk23BXEVwzqOzWquYg",
    authDomain: "distritec-ec.firebaseapp.com",
    projectId: "distritec-ec",
    storageBucket: "distritec-ec.appspot.com",
    messagingSenderId: "424243179628",
    appId: "1:424243179628:web:bc13600158180bc4dde849"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)