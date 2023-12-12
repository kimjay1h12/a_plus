import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import * as Haptics from "expo-haptics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref, runTransaction } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextField2 } from "../components/custom/TextField";
import Typography from "../components/custom/Typography";
import { GlobalContext } from "../context";
import { db } from "../firebase";
import Button from "../components/custom/Button";
import { ImageBackground } from "react-native";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { themeState, authDispatch, authState } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const [sound, setSound] = useState();

  function Auth(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const userId = userCredential.user.uid;
        GetAppUsage();
        authDispatch({ type: "SUCCESS", payload: { userId } });
        PushStorage(userId);
        //stored the userId here
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setLoading(false);
      })
      .catch((error) => {
        //alert this error
        const errorCode = error.code;
        const errorMessage = error.message;
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        setLoading(false);
        ErrorAlert(errorMessage);
      });
  }

  const ErrorAlert = (errorMessage) =>
    Alert.alert("Error", errorMessage, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  const PushStorage = async () => {
    try {
      const res1 = AsyncStorage.setItem(
        "formdata",
        JSON.stringify({
          email: email,
          password: password,
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  const SignIn = async () => {
    setLoading(true);
    try {
      const res = await Auth(email, password);
    } catch (error) {
      console.log(error);
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

  const getStorage = async () => {
    try {
      const res1 = await AsyncStorage.getItem("formdata");
      const obj = JSON.parse(res1);

      setEmail(obj.email);
      setPassword(obj.password);

      console.log(email, password);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getStorage();
  }, []);
  console.log(email, password);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: themeState.value,
      }}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <ImageBackground
          source={require("../assets/img/clipart.png")}
          style={{
            width: "100%",
            height: Dimensions.get("screen").height,
            flex: 1,

            justifyContent: "center",
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              padding: 10,
            }}
          >
            <View style={{ flex: 0, alignItems: "center", marginBottom: 10 }}>
              <Typography variant="h1" fontWeight={700}>
                Login
              </Typography>
            </View>
            <View
              style={{
                marginTop: 20,
                flex: 0,
                alignItems: "center",
              }}
            >
              <TextField2
                placeholder="Email"
                value={email}
                onChangeText={(e) => {
                  setEmail(e);
                }}
              />
              <TextField2
                placeholder="Password"
                value={password}
                secureTextEntry={true}
                onChangeText={(e) => {
                  setPassword(e);
                }}
              />
            </View>
            {/* <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Typography variant="h6" fontWeight={600} color="#407BFF">
                Forgot Password ?
              </Typography>
            </View> */}

            <View style={{ marginTop: 10 }}>
              <Button
                title="Login"
                onPress={() => {
                  SignIn();
                }}
                loading={loading}
              />

              {/* <TouchableOpacity
                style={styles.Button}
              
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.ButtonText}>Login</Text>
                )}
              </TouchableOpacity> */}
            </View>
            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                flex: 0,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <Typography variant="h6" fontWeight={600} color="#407BFF">
                Don't have an account yet?
              </Typography>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Signup");
                }}
              >
                <Text style={{ fontSize: 15, color: "#f90" }}>Signup</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: {
    width: "100%",
    flex: 1,

    height: "100%",
    marginTop: "50%",
  },
  ButtonText: {
    color: "#fff",
    textAlign: "center",

    fontSize: 20,
    fontWeight: "700",
  },
  Button: {
    height: 50,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "#407BFF",
    borderRadius: 10,
  },

  input: {
    height: 50,
    margin: 6,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: Dimensions.get("window").width - 20,
    color: "#407BFF",
    borderColor: "#fff",

    backgroundColor: "#fff",
  },
});
export default Login;
