// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmEjyitLjsLmmr8wlZ4uK72JYauUtl0H8",
  authDomain: "chatgptclone-6b79d.firebaseapp.com",
  projectId: "chatgptclone-6b79d",
  storageBucket: "chatgptclone-6b79d.appspot.com",
  messagingSenderId: "1046283999711",
  appId: "1:1046283999711:web:4a7009df2c02ebc854cc6a"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = getApps().length? getApp():initializeApp(firebaseConfig);
const db= getFirestore(app);
const auth = getAuth();


export {db,auth};