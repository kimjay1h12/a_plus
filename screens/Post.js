import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Typography from "../components/custom/Typography";
import { GlobalContext } from "../context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { Categories, uploadHelper } from "../utility";
import * as ImagePicker from "expo-image-picker";
import { Database, child, get, getDatabase, push } from "firebase/database";
import { firebaseConfig } from "../firebase";
import { initializeApp } from "firebase/app";
import { Image } from "react-native";
import { getStorage, ref } from "firebase/storage";
import { firebasec1 } from "../firebase1";
import { firebasec } from "../firebasedata";
function Post() {
  const { themeState, authState } = useContext(GlobalContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDoc, setLoadingDoc] = useState(false);
  const [image, setImage] = useState();
  const [userData, setUserData] = useState();
  const [formdata, setFormdata] = useState({
    courseTitle: "",

    courseDescription: "",
    category: "English Language",
    Coursecode: "",
    authorName: "",
    authorDescription: "",
    courseUrl: "",
    image: "",
    createdAt: "",
    userkey: authState.data.userId,
  });
  const app = initializeApp(firebaseConfig);
  // const GetUserInfo = () => {
  //   const dbRef = ref(getDatabase());
  //   get(child(dbRef, `users/${authState.data.userId}`))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         console.log(snapshot.val());
  //         setUserData(snapshot.val());
  //         setFormdata({
  //           ...formdata,
  //           author: userData.firstName + " " + userData.lastName,
  //         });
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  // useEffect(() => {
  //   GetUserInfo();
  // }, [authState.data.userId]);
  const storage = firebasec1.storage();
  const storageRef = storage.ref();
  const database = firebasec.database();
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var data = date + "-" + month + "-" + year;
    setFormdata({ ...formdata, createdAt: data });
  };
  useEffect(() => {
    getCurrentDate();
  }, []);

  const [docName, setDocName] = useState("Add Course File e.g pdf ,docs ...");
  async function handleImageUpload() {
    const { uri, assets } = await ImagePicker.launchImageLibraryAsync();

    const fileName = assets.map((cur) => cur.fileName);

    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = storageRef.child(`images/${fileName}`);
    const uploadTask = ref.put(blob);
    uploadTask.on("state_changed", {
      // Optional function to track upload progress
      progress: (snapshot) => {
        alert("loading upload progress");
      },
    });
    uploadTask.then(async () => {
      const url = await ref.getDownloadURL();

      setFormdata({ ...formdata, image: url });
    });
  }

  async function handleDocumentUpload() {
    const { uri, name, type } = await DocumentPicker.getDocumentAsync();

    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storageRef.child(`documents/${name}`);
    const uploadTask = ref.put(blob);
    uploadTask.on("state_changed", {
      // Optional function to track upload progress
    });
    uploadTask.then(async () => {
      const url = await ref.getDownloadURL();
      setDocName(name);
      setFormdata({ ...formdata, courseUrl: url });
      setLoadingDoc(false);
    });
    setLoadingDoc(false);
  }

  function uploadUserData(formdata) {
    const usersRef = database.ref("courses");
    const userRef = usersRef.push();

    userRef
      .set(formdata)
      .then(() => {
        Alert.alert("Success");
        setFormdata({
          courseTitle: "",

          courseDescription: "",
          category: "",
          Coursecode: "",
          authorName: "",
          authorDescription: "",
          courseUrl: "",
          image: "",
        });
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error uploading data:", error);
        Alert.alert(error);
        setLoading(false);
      });
  }
  function writeUserData(formdata) {
    const db = getDatabase(app);
    push(ref(db, "couses/" + "data"), formdata);
    setLoading(false);
    Alert.alert("Success");
    setFormdata({
      courseTitle: "",

      courseDescription: "",
      category: "",
      Coursecode: "",
      authorName: "",
      authorDescription: "",
      courseUrl: "",
      image: "",
    });
    navigation.goBack();
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: themeState.value,
        height: "100%",
        padding: 7,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          style={{ flex: 1 }}
        >
          <View style={styles.header}>
            <AntDesign
              name="arrowleft"
              size={34}
              color={themeState.mode === "dark" ? "#fff" : "#102660"}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Typography variant="h5" fontWeight={700} color="#102660">
              Create Course
            </Typography>
            <Text></Text>
          </View>
          <View style={{ marginTop: 70 }}>
            <TouchableOpacity
              style={{
                height: 350,
                margin: 5,
                backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
                borderRadius: 20,
                flex: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                handleImageUpload();
              }}
            >
              {formdata.image === "" ? (
                <Entypo
                  name="camera"
                  size={64}
                  color={themeState.mode === "dark" ? "#fff" : "##102660"}
                />
              ) : (
                <Image
                  source={{
                    uri: formdata.image,
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                    resizeMode: "cover",
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 30 }}>
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
                    marginTop: "50%",
                    backgroundColor:
                      themeState.mode === "dark" ? "#222" : "#fff",
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
                  {Categories.map((cur, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{ marginTop: 10 }}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        setFormdata({
                          ...formdata,
                          category: cur,
                        });
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
            <TextInput
              placeholder="Course Title"
              value={formdata.courseTitle}
              onChangeText={(e) => {
                setFormdata({
                  ...formdata,
                  courseTitle: e,
                });
              }}
              placeholderTextColor={
                themeState.mode === "dark" ? "#fff" : "##102660"
              }
              style={{
                margin: 6,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                height: 50,
                color: themeState.mode === "dark" ? "#fff" : "#102660",

                backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
              }}
            />
            <TextInput
              placeholder="Course Code"
              value={formdata.Coursecode}
              onChangeText={(e) => {
                setFormdata({
                  ...formdata,
                  Coursecode: e,
                });
              }}
              placeholderTextColor={
                themeState.mode === "dark" ? "#fff" : "##102660"
              }
              style={{
                margin: 6,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                height: 50,
                color: themeState.mode === "dark" ? "#fff" : "#102660",

                backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible), Keyboard.dismiss;
              }}
            >
              <TouchableOpacity
                style={{
                  height: 50,
                  flex: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  paddingTop: 8,
                  marginBottom: 10,
                  paddingBottom: 8,

                  borderRadius: 10,
                  marginLeft: Platform.OS === "ios" ? 8 : 0,
                  marginRight: Platform.OS === "ios" ? 8 : 0,
                  backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
                }}
                onPress={() => {
                  setModalVisible(!modalVisible), Keyboard.dismiss;
                }}
              >
                <Text
                  style={{
                    color: themeState.mode === "dark" ? "#fff" : "#102660",
                    textAlign: "center",
                    paddingLeft: 15,
                    paddingRight: 15,
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  {formdata.category}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TextInput
              placeholder="Course Description"
              placeholderTextColor={
                themeState.mode === "dark" ? "#fff" : "##102660"
              }
              style={{
                margin: 6,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                height: 150,
                color: themeState.mode === "dark" ? "#fff" : "#102660",

                backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
              }}
              multiline
              value={formdata.courseDescription}
              onChangeText={(e) => {
                setFormdata({
                  ...formdata,
                  courseDescription: e,
                });
              }}
            />
            <TextInput
              placeholder="Author Name"
              value={formdata.authorName}
              onChangeText={(e) => {
                setFormdata({
                  ...formdata,
                  authorName: e,
                });
              }}
              placeholderTextColor={
                themeState.mode === "dark" ? "#fff" : "##102660"
              }
              style={{
                margin: 6,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                height: 50,
                color: themeState.mode === "dark" ? "#fff" : "#102660",

                backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
              }}
            />
            <TextInput
              placeholder="Author Description"
              placeholderTextColor={
                themeState.mode === "dark" ? "#fff" : "##102660"
              }
              style={{
                margin: 6,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                height: 50,
                color: themeState.mode === "dark" ? "#fff" : "#102660",

                backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
              }}
              multiline
              value={formdata.authorDescription}
              onChangeText={(e) => {
                setFormdata({
                  ...formdata,
                  authorDescription: e,
                });
              }}
            />
            <TouchableOpacity
              style={{
                height: 50,
                flex: 0,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
                paddingTop: 8,
                paddingBottom: 8,

                borderRadius: 10,
                marginLeft: Platform.OS === "ios" ? 8 : 0,
                marginRight: Platform.OS === "ios" ? 8 : 0,
                backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
              }}
              onPress={() => {
                setLoadingDoc(true);
                handleDocumentUpload();
                setLoadingDoc(false);
              }}
            >
              {loadingDoc ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text
                  style={{
                    color: themeState.mode === "dark" ? "#fff" : "#102660",
                    textAlign: "center",
                    paddingLeft: 15,
                    paddingRight: 15,
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  {docName}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 30 }}>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => {
                setLoading(true);
                uploadUserData(formdata);
                setLoading(false);
              }}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.ButtonText1}>Create Course</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  header: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" ? 24 : 0,
    alignItems: "center",
  },
  camera: {
    height: 350,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 20,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 50,
    margin: 6,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,

    color: "#102660",
    borderColor: "#fff",

    backgroundColor: "#fff",
  },
  Desinput: {
    height: 100,
    margin: 6,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,

    color: "#102660",
    borderColor: "#fff",

    backgroundColor: "#fff",
  },
  ButtonText: {
    color: "#102660",
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 20,
    fontWeight: "700",
  },
  ButtonText1: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 20,
    fontWeight: "700",
  },

  DocButton: {
    height: 50,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginLeft: Platform.OS === "ios" ? 10 : 0,
    marginRight: Platform.OS === "ios" ? 10 : 0,
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
    marginLeft: Platform.OS === "ios" ? 10 : 0,
    marginRight: Platform.OS === "ios" ? 10 : 0,
  },
});
export default Post;
