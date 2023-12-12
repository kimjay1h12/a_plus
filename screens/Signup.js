import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Typography from "../components/custom/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigation } from "@react-navigation/core";
import { Universities } from "../utility";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebasec } from "../firebasedata";
import { Dimensions } from "react-native";
import { TextField2 } from "../components/custom/TextField";
import { ImageBackground } from "react-native";
function Signup() {
  const navigation = useNavigation();
  const { themeState, themeDispatch, authDispatch, authState } =
    useContext(GlobalContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "",
    email: "",
    school: "",
  });
  const [formdata1, setFormdata1] = useState(["Science"]);
  useEffect(() => {
    setFormdata({ ...formdata, email: email });
  }, [email]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState();
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  console.log("formdata", formdata);
  function PushUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        console.log(userId);
        setUserId(userId);
        writeUserData(userId, formdata);
        PushStorage();
        authDispatch({ type: "SUCCESS", payload: { userId } });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        console.log(error);
        ErrorAlert(errorMessage);
      });
  }
  const database = firebasec.database();

  function writeUserData(userId, formdata) {
    const usersRef = database.ref("users/" + userId);

    usersRef
      .set(formdata)
      .then(() => {
        console.log("Data uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error uploading data:", error);
      });
  }

  const HandleSignUp = async () => {
    try {
      setLoading(true);
      setFormdata({ ...formdata, email: email });
      const res = await PushUser(email, password);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
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
  const ErrorAlert = (errorMessage) =>
    Alert.alert("Error", errorMessage, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  const SuccessAlert = () =>
    Alert.alert("Success", "Welcome To A+Plus Learning Platform", [
      { text: "OK", onPress: () => navigation.navigate("Login") },
    ]);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: themeState.value }}
      keyboardShouldPersistTaps="handled"
    >
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
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          style={{ flex: 1 }}
        >
          <View style={styles.root}>
            <View style={{ flex: 0, alignItems: "center" }}>
              <Typography variant="h2" fontWeight={700}>
                Sign Up
              </Typography>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View
                  style={{
                    margin: 10,
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 35,
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                  }}
                >
                  {Universities.map((cur, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{ marginTop: 10 }}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        setFormdata({ ...formdata, school: cur });
                      }}
                    >
                      <Typography variant="h5" active={true}>
                        {cur}
                      </Typography>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={{
                      backgroundColor: "red",
                      padding: 7,
                      borderRadius: 5,
                      marginTop: 10,
                    }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Typography variant="h5" active={false}>
                      Cancel
                    </Typography>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <View style={{ marginTop: 20, flex: 0, alignItems: "center" }}>
              <TextField2
                placeholder="First Name"
                value={formdata.firstName}
                onChangeText={(e) => setFormdata({ ...formdata, firstName: e })}
              />
              <TextField2
                placeholder="Last Name"
                value={formdata.lastName}
                onChangeText={(e) => setFormdata({ ...formdata, lastName: e })}
              />

              <TextField2
                placeholder="Country"
                value={formdata.country}
                onChangeText={(e) => setFormdata({ ...formdata, country: e })}
              />

              <TextField2
                placeholder="Phone Number"
                value={formdata.phoneNumber}
                onChangeText={(e) =>
                  setFormdata({ ...formdata, phoneNumber: e })
                }
              />

              <TextField2
                placeholder="Email Address"
                value={email}
                onChangeText={(e) => setEmail(e)}
              />
              <TextField2
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={(e) => setPassword(e)}
              />
            </View>

            <View>
              <TouchableOpacity
                style={styles.Button}
                onPress={() => {
                  HandleSignUp();
                }}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.ButtonText}> Sign up</Text>
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
              <Typography variant="h6" fontWeight={600} color="#407BFF">
                Already have an account
              </Typography>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Typography variant="h6" fontWeight={600} color="#f90">
                  Login
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  root: {
    width: "100%",
    flex: 3,
    justifyContent: "center",
    padding: Platform.OS === "ios" ? 22 : 10,

    height: "100%",
    marginTop: "30%",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default Signup;
