// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALJp9PX49uvEit6PD96QxaPNdUiK6_IBI",
  authDomain: "letsquit-1b913.firebaseapp.com",
  projectId: "letsquit-1b913",
  storageBucket: "letsquit-1b913.appspot.com",
  messagingSenderId: "469574663864",
  appId: "1:469574663864:web:b63b27b954b981ed1d7e4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // auth feature
export const db = getFirestore(app); //real time database
export const storage = getStorage(app); //photo storage
