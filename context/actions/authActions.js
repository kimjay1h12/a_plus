import { initializeApp } from "firebase/app";
import "firebase/auth";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase, { firebaseConfig } from "../../firebase";

export const Signup = async (dispatch, data, email, password) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  dispatch({
    type: "LOADING",
  });

  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const userId = userCredential.user;
      const payload = {
        userId,
      };
      dispatch({
        type: "SUCCESS",
        payload,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      dispatch({
        type: "Error",
        payload: {
          errorMessage,
          errorCode,
        },
      });
    });
};
