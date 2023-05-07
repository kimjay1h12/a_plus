import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Text, useColorScheme, View } from "react-native";
import { GlobalContext } from "../context";
import Navigator from "./Navigator";
import Onboarding from "./Onboarding";
import { runTransaction } from "firebase/database";
import * as SplashScreen from "expo-splash-screen";
function AppWrapper() {
  const { themeState, themeDispatch, authState, authDispatch } =
    useContext(GlobalContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const colorScheme = useColorScheme();
  const loggedIn = authState.loggedIn;
  const navigation = useNavigation();

  function Auth(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const userId = userCredential.user.uid;
        authDispatch({ type: "SUCCESS", payload: { userId } });
        setTimeout(() => {
          SplashScreen.hideAsync();
        }, 500);
      })
      .catch((error) => {
        //alert this error
        SplashScreen.hideAsync();
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  const SignIn = async () => {
    try {
      const res = await Auth(email, password);
    } catch (error) {
      console.log(error);
    }
  };
  const getStorage = async () => {
    try {
      const res1 = await AsyncStorage.getItem("formdata");
      const obj = JSON.parse(res1);

      setEmail(obj.email);
      setPassword(obj.password);
      console.log(email);
    } catch (error) {
      console.log("error", error);
    }
  };
  const d = new Date();
  const day = d.getDay();
  const GetAppUsage = (userId) => {
    if (day === 0) {
      runTransaction(
        ref(db, `appUsage/${userId}/Sunday`),
        (currentValue) => (currentValue || 0) + 1
      );
    }
    if (day === 1) {
      runTransaction(
        ref(db, `appUsage/${userId}/Monday`),
        (currentValue) => (currentValue || 0) + 1
      );
    }
    if (day === 2) {
      runTransaction(
        ref(db, `appUsage/${userId}/Tuesday`),
        (currentValue) => (currentValue || 0) + 1
      );
    }
    if (day === 3) {
      runTransaction(
        ref(db, `appUsage/${userId}/Wednesday`),
        (currentValue) => (currentValue || 0) + 1
      );
    }
    if (day === 4) {
      runTransaction(
        ref(db, `appUsage/${userId}/Thursday`),
        (currentValue) => (currentValue || 0) + 1
      );
    }
    if (day === 5) {
      runTransaction(
        ref(db, `appUsage/${userId}/Friday`),
        (currentValue) => (currentValue || 0) + 1
      );
    }
    if (day === 6) {
      runTransaction(
        ref(db, `appUsage/${userId}/Saturday`),
        (currentValue) => (currentValue || 0) + 1
      );
    }
  };
  useEffect(() => {
    getStorage();
    if (email && password) SignIn();
  }, [email, password]);

  useEffect(() => {
    if (colorScheme === "dark") {
      themeDispatch({
        type: "dark",
      });
    } else {
      themeDispatch({
        type: "light",
      });
    }
  }, [colorScheme]);

  return <Onboarding />;
}
export default AppWrapper;
