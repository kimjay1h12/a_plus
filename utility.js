import { initializeApp } from "firebase/app";
import { app, firebase, firebaseConfig } from "./firebase";
import "firebase/storage";
import { getStorage } from "firebase/storage";
import { child, get, getDatabase, ref } from "firebase/database";

export const Universities = [
  "University of Ibadan",
  "University of Ibadan",
  "Covenant University Ota",
  "University of Nigeria",
  "Federal University of Technology Akure",
  "Federal University of Technology Minna",
  "Olabisi Onabanjo University",
  "University of Uyo",
  "Lagos State University",
  "University of Abuja",
  "University of Ilorin",
];
export const Categories = [
  "Accounting",
  "Engineering",
  "Agric",
  "Computer Science",
  "Chemistry",
  "English Language",
  "Geography",
  "History",
  "Information Technology",
  "Law",
  "Mathematics",
  "Yoruba",
];
export const uploadHelper = (type = "image", file) => {
  const storage = app.storage();
  return new Promise(async (resolve, reject) => {
    try {
      alert("jjjj");
      const storageRef = storage.ref(
        "image" + "/" + Date.now() + "_" + file.fileName
      );
      alert(storageRef);
      // const img = await fetch(file.uri);
      // const blob = await img.blob();

      const blob = await uploadFileBlob(file.uri);

      const uploadTask = await storageRef.put(blob);
      const url = await storageRef.getDownloadURL();
      resolve(url);
    } catch (error) {
      reject(error);
    }
  });
};

const uploadFileBlob = async (uri) => {
  alert("dggg");
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  return await blob;
};

export const GetUserInfo = (value) => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const value = snapshot.val();
        return value;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
