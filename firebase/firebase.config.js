// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiX2VwX5M8xbsoQDVxhF5hZmxAmHUmWNk",
  authDomain: "cmsblog-bd.firebaseapp.com",
  projectId: "cmsblog-bd",
  storageBucket: "cmsblog-bd.appspot.com",
  messagingSenderId: "158168843052",
  appId: "1:158168843052:web:eec94a3beab3d051286289",
  appName:'user'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;