// Import the functions you need from the SDKs you need

import { initializeApp, firebase } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDT6g06PjDRrVNIupvd7zk9Jv5f-upQtPk",
  authDomain: "aplus-24448.firebaseapp.com",
  projectId: "aplus-24448",
  storageBucket: "aplus-24448.appspot.com",
  messagingSenderId: "469218659307",
  appId: "1:469218659307:web:a4c63ea23cbcb2496067ae",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
