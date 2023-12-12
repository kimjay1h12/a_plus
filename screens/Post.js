import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Video } from "expo-av";

import { SaveFormat, manipulateAsync } from "expo-image-manipulator";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { initializeApp } from "firebase/app";
import { getDatabase, set } from "firebase/database";
import { ref } from "firebase/storage";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/custom/Button";
import { TextField2 } from "../components/custom/TextField";
import Typography from "../components/custom/Typography";
import { GlobalContext } from "../context";
import { firebaseConfig } from "../firebase";
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
    courseCategory: "web_development",

    courseDescription: "",
    courseTitle: "",
    document: [],
    videos: [],

    createdAt: "",
    userkey: authState.data.userId,
  });
  const courseCategory = [
    {
      label: "Web Development",
      value: "web_development",
    },
    {
      label: "Software Engineering",
      value: "software_engineering",
    },
    {
      label: "Cyber Security",
      value: "cyber_security",
    },
    {
      label: "Mobile App Development",
      value: "mobileapp_development",
    },
  ];
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
  }, [authState]);
  const [videoUris, setVideoUris] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleVideoUpload = async () => {
    try {
      if (videoUris.length === 0) {
        console.log("No videos selected.");
        return;
      }

      const promises = videoUris.map(async (videoUri, index) => {
        // const processedVideoUri = await VideoProcessing.compress(videoUri, {
        //   bitrateMultiplier: 3,
        //   width: 720,
        //   height: 1280,
        //   saveToCameraRoll: false,
        //   saveWithCurrentDate: true,
        // });

        //     const uploadTask = ref.put(blob);
        //     uploadTask.on("state_changed", {
        //       // Optional function to track upload progress
        //     });
        //     uploadTask.then(async () => {
        //       const url = await ref.getDownloadURL();
        //       setDocName(name);
        //       setFormdata({ ...formdata, courseUrl: url });
        //       setLoadingDoc(false);
        //     });
        //     setLoadingDoc(false);
        //   }
        const response = await fetch(videoUri?.uri);
        const blob = await response.blob();
        const ref = storageRef.child(`videos/${videoUri.fileName}`);
        const uploadTask = ref.put(blob);
        uploadTask.on("state_changed", (taskSnapshot) => {
          const progress =
            (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
          setUploadProgress(progress);
        });
        return uploadTask.then(async () => {
          const downloadUrl = await ref.getDownloadURL();
          return downloadUrl;
        });
      });

      const url = await Promise.all(promises);
      console.log(url, "url");
      setFormdata({
        ...formdata,
        videos: url,
      });
      setUploadProgress(0);
      console.log("All videos uploaded successfully.");
    } catch (error) {
      console.error("Error uploading videos: ", error);
    }
  };
  const handleDocumentUpload = async () => {
    try {
      if (documents.length === 0) {
        console.log("No videos selected.");
        return;
      }

      const promises = documents.map(async (doc, index) => {
        // const processedVideoUri = await VideoProcessing.compress(videoUri, {
        //   bitrateMultiplier: 3,
        //   width: 720,
        //   height: 1280,
        //   saveToCameraRoll: false,
        //   saveWithCurrentDate: true,
        // });

        //     const uploadTask = ref.put(blob);
        //     uploadTask.on("state_changed", {
        //       // Optional function to track upload progress
        //     });
        //     uploadTask.then(async () => {
        //       const url = await ref.getDownloadURL();
        //       setDocName(name);
        //       setFormdata({ ...formdata, courseUrl: url });
        //       setLoadingDoc(false);
        //     });
        //     setLoadingDoc(false);
        //   }
        const response = await fetch(doc?.uri);
        const blob = await response.blob();
        const ref = storageRef.child(`documents/${doc.fileName}`);
        const uploadTask = ref.put(blob);
        uploadTask.on("state_changed", (taskSnapshot) => {
          const progress =
            (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
          setUploadProgress(progress);
        });
        return uploadTask.then(async () => {
          const downloadUrl = await ref.getDownloadURL();
          return downloadUrl;
        });
      });

      const url = await Promise.all(promises);
      setFormdata({
        ...formdata,
        document: url,
      });
      console.log(url, "url");
      setUploadProgress(0);
      console.log("All Documents uploaded successfully.");
    } catch (error) {
      console.error("Error uploading Document: ", error);
    }
  };
  console.log("formdata", formdata);
  const handleVideoPicker = async (isCamera) => {
    await ImagePicker.requestCameraPermissionsAsync();
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    const image = await ImagePicker["launchImageLibraryAsync"]({
      mediaTypes: ImagePicker.MediaTypeOptions.All,

      allowsEditing: true,
      aspect: [4, 3],
      // videoQuality: 0.5,
      videoMaxDuration: 600,
      quality: 1,
    });

    if (!image.canceled) {
      let result = { ...image };
      if (image.assets[0]?.type === "image") {
        let resized = await manipulateAsync(
          image.assets[0].uri,
          [
            {
              resize: { width: 900 },
            },
          ],
          {
            compress: 0.5,
            format: SaveFormat.JPEG,
          }
        );
        result.assets[0].uri = resized.uri;
      }

      // if (result.fileSize > 5000000)
      //   return Alert.alert(
      //     "File size too large"ol
      //     "File size should be less than 10MB"
      //   );

      const r = [...videoUris];
      const b = result?.assets[0];
      const c = r?.push(b);
      setVideoUris(r);

      return result?.assets[0];
    }
    console.log("video", null);
    return null;
  };
  const [docName, setDocName] = useState("Add Course File e.g pdf ,docs ...");
  const [documents, setDocuments] = useState([]);
  async function handleDocumentPicker() {
    const res = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      multiple: true,
      copyToCacheDirectory: true,
    });
    const r = [...documents];
    const b = res;
    const c = r?.push(b);
    setDocuments(r);
    console.log(res, "doe");
    // const response = await fetch(uri);
    // const blob = await response.blob();
    // const ref = storageRef.child(`documents/${name}`);
    // const uploadTask = ref.put(blob);
    // uploadTask.on("state_changed", {
    //   // Optional function to track upload progress
    // });
    // uploadTask.then(async () => {
    //   const url = await ref.getDownloadURL();
    //   setDocName(name);
    //   setFormdata({ ...formdata, courseUrl: url });
    //   setLoadingDoc(false);
    // });
    // setLoadingDoc(false);
  }

  function uploadUserData(formdata) {
    const usersRef = database.ref("courses/" + formdata?.courseCategory);

    usersRef
      .push(formdata)
      .then(() => {
        Alert.alert("Success");

        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error uploading data:", error);
        Alert.alert(error);
        setLoading(false);
      });
  }
  function writeUserData() {
    const db = getDatabase(app);
    const loc = formdata?.courseCategory;
    set(ref(db, "couses/" + loc), formdata);
    setLoading(false);
    Alert.alert("Success");
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
              size={28}
              color={themeState.mode === "dark" ? "#aaa" : "#000"}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Typography variant="h5" fontWeight={700}>
              Create Course
            </Typography>
            <Text></Text>
          </View>
          <View style={{ marginTop: 70 }}>
            {/* <TouchableOpacity
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
                  color={themeState.mode === "dark" ? "#fff" : "##407BFF"}
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
            </TouchableOpacity> */}
          </View>
          <View style={{ marginTop: 10 }}>
            <TextField2
              placeholder="Course Category"
              value={formdata.courseCategory}
              options={courseCategory.map((cur) => ({
                value: cur.value,
                label: cur.label,
              }))}
              onChangeText={(e) => {
                setFormdata({
                  ...formdata,
                  courseCategory: e,
                });
              }}
            />
            <TextField2
              placeholder="Course Title"
              value={formdata.courseTitle}
              onChangeText={(e) => {
                setFormdata({
                  ...formdata,
                  courseTitle: e,
                });
              }}
            />

            <TextField2
              placeholder="Course Description"
              value={formdata.courseDescription}
              onChangeText={(e) => {
                setFormdata({
                  ...formdata,
                  courseDescription: e,
                });
              }}
            />
            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity
                onPress={handleVideoPicker}
                style={{
                  backgroundColor: "#f7f7f7",
                  width: "100%",
                  height: 100,
                  borderRadius: 10,
                  flex: 0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">Add Video</Typography>
              </TouchableOpacity>
              {videoUris?.length > 0 && (
                <View style={{ marginTop: 10 }}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {videoUris?.map((selectedImages, i) => (
                      <Video
                        // ref={video}
                        key={i}
                        source={{
                          uri: selectedImages.uri,
                        }}
                        useNativeControls
                        resizeMode="contain"
                        // isLooping
                        style={{
                          width: 200,
                          height: 300,
                          marginRight: 10,
                          borderRadius: 20,
                        }}
                      />
                    ))}
                  </ScrollView>
                  <Button
                    style={{ marginTop: 10 }}
                    title="Upload Videos"
                    onPress={handleVideoUpload}
                  />
                  {uploadProgress > 0 && (
                    <Typography variant="h5">
                      {Math.round(uploadProgress)}
                    </Typography>
                  )}
                </View>
              )}
            </View>
            <View>
              <View style={{ marginBottom: 10 }}>
                <TouchableOpacity
                  onPress={handleDocumentPicker}
                  style={{
                    backgroundColor: "#f7f7f7",
                    width: "100%",
                    height: 100,
                    borderRadius: 10,
                    flex: 0,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6">Add Document</Typography>
                </TouchableOpacity>
              </View>
              {documents?.length > 0 && (
                <View style={{ marginTop: 10 }}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {documents.map((item, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.videoThumbnail,
                          {
                            borderColor:
                              themeState.mode === "light" ? "#000" : "#aaa",
                            padding: 10,
                          },
                        ]}
                      >
                        <Image
                          source={require("../assets/img/document.png")}
                          style={{
                            width: 200,
                            height: 250,
                            resizeMode: "contain",
                          }}
                        />
                        <View
                          style={{
                            flex: 0,
                            alignItems: "center",
                            flexDirection: "column",
                            justifyContent: "center",
                            paddingRight: 2,
                          }}
                        >
                          <View style={{ marginBottom: 3 }}>
                            <Typography variant="h6" fontWeight={700}>
                              {item.name}
                            </Typography>
                          </View>
                        </View>
                        {/* You can use custom video thumbnail images here */}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <Button
                    style={{ marginTop: 10, marginBottom: 10 }}
                    title="Upload Documents"
                    onPress={handleDocumentUpload}
                  />
                  {uploadProgress > 0 && (
                    <Typography variant="h5">
                      {Math.round(uploadProgress)}
                    </Typography>
                  )}
                </View>
              )}
            </View>
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

    color: "#407BFF",
    borderColor: "#fff",

    backgroundColor: "#fff",
  },
  Desinput: {
    height: 100,
    margin: 6,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,

    color: "#407BFF",
    borderColor: "#fff",

    backgroundColor: "#fff",
  },
  ButtonText: {
    color: "#407BFF",
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
    backgroundColor: "#407BFF",
    borderRadius: 10,
    marginLeft: Platform.OS === "ios" ? 10 : 0,
    marginRight: Platform.OS === "ios" ? 10 : 0,
  },
  videoThumbnail: {
    minWidth: 200,
    minHeight: 250,
    marginRight: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 20,
  },
});
export default Post;
