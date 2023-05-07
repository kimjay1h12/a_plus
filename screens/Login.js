import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import Typography from "../components/custom/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {} from "react";
import { ref, runTransaction } from "firebase/database";
import { db } from "../firebase";

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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.root}>
            <View>
              <View style={{ flex: 0, alignItems: "center" }}>
                <Typography variant="h1" color="#102660" fontWeight={700}>
                  Welcome
                </Typography>
              </View>
              <View
                style={{
                  marginTop: 20,
                  flex: 0,
                  alignItems: "center",
                  padding: 30,
                }}
              >
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#102660"
                  style={styles.input}
                  value={email}
                  onChangeText={(e) => {
                    setEmail(e);
                  }}
                />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#102660"
                  style={styles.input}
                  value={password}
                  secureTextEntry={true}
                  onChangeText={(e) => {
                    setPassword(e);
                  }}
                />
              </View>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Typography variant="h6" fontWeight={600} color="#102660">
                  Forgot Password ?
                </Typography>
              </View>

              <View>
                <TouchableOpacity
                  style={styles.Button}
                  onPress={() => {
                    SignIn();
                  }}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.ButtonText}>Login</Text>
                  )}
                </TouchableOpacity>
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
                <Typography variant="h6" fontWeight={600} color="#102660">
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
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: {
    width: "100%",
    flex: 3,
    justifyContent: "center",
    padding: Platform.OS === "ios" ? 20 : 10,
    height: "100%",
    marginTop: "50%",
  },
  ButtonText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
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
    backgroundColor: "#102660",
    borderRadius: 10,
  },

  input: {
    height: 50,
    margin: 6,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: Dimensions.get("window").width - 20,
    color: "#102660",
    borderColor: "#fff",

    backgroundColor: "#fff",
  },
});
export default Login;
