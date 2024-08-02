// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUZzEOQx4O6Flhr_ZKhr3agEN4VaJMgLA",
  authDomain: "gaindot-63169.firebaseapp.com",
  projectId: "gaindot-63169",
  storageBucket: "gaindot-63169.appspot.com",
  messagingSenderId: "668898577132",
  appId: "1:668898577132:web:631e2ee8523fa6b4cd33c9",
  measurementId: "G-L9WW87H2GK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
export { firestore };
