// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiDf-KyIuY7dMbKfKg8H2fdK9oDlh6ljw",
  authDomain: "hawkeats-2438f.firebaseapp.com",
  projectId: "hawkeats-2438f",
  storageBucket: "hawkeats-2438f.appspot.com",
  messagingSenderId: "1025300970885",
  appId: "1:1025300970885:web:ad12bdfb7d30af6bf898ec"
};

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase}
