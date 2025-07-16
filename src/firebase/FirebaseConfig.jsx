// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6OeewDpdYj96LzEao_U7KRkORTvoVI6M",
  authDomain: "shoppingdata-1b101.firebaseapp.com",
  projectId: "shoppingdata-1b101",
  storageBucket: "shoppingdata-1b101.firebasestorage.app",
  messagingSenderId: "900295973233",
  appId: "1:900295973233:web:d92b787782baf9d1477ed0"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig); //firebaseConfig it is a object that contains all the important project-specific settings required to connect your app to your Firebase project.

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}