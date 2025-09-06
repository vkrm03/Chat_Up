// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config (from your snippet)
const firebaseConfig = {
  apiKey: "AIzaSyBl2BW537O6m6Q3V_WIEe--zgWQu2Mjvxs",
  authDomain: "chatup-de868.firebaseapp.com",
  projectId: "chatup-de868",
  storageBucket: "chatup-de868.appspot.com",
  messagingSenderId: "21053765998",
  appId: "1:21053765998:web:d532accc0b2b0c7abe697f",
  measurementId: "G-PB33MHWT43",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
