import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDT6g06PjDRrVNIupvd7zk9Jv5f-upQtPk",
  authDomain: "aplus-24448.firebaseapp.com",
  projectId: "aplus-24448",
  storageBucket: "aplus-24448.appspot.com",
  messagingSenderId: "469218659307",
  appId: "1:469218659307:web:a4c63ea23cbcb2496067ae",
};

export const firebasec = firebase.initializeApp(firebaseConfig);
