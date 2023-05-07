// import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDT6g06PjDRrVNIupvd7zk9Jv5f-upQtPk",
  authDomain: "aplus-24448.firebaseapp.com",
  projectId: "aplus-24448",
  storageBucket: "aplus-24448.appspot.com",
  messagingSenderId: "469218659307",
  appId: "1:469218659307:web:a4c63ea23cbcb2496067ae",
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);

export default firebase?.initializeApp(firebaseConfig);
