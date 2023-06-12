// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAnnnCRNghzHH1VZi3U5Evdh5zUDa0DkI",
  authDomain: "myoffer-de0b5.firebaseapp.com",
  projectId: "myoffer-de0b5",
  storageBucket: "myoffer-de0b5.appspot.com",
  messagingSenderId: "236435850204",
  appId: "1:236435850204:web:03b7ba97dc747713308519",
  measurementId: "G-8LP45J8E2Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage();

export const db = getFirestore(app)
export const auth = getAuth();

