import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  Linking,
} from "react-native";

import * as FileSystem from "expo-file-system";
import Typography from "../../components/custom/Typography";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context";
import { Entypo } from "@expo/vector-icons";
import Avatar from "../../components/custom/Avatar";
import * as DocumentPicker from "expo-document-picker";

import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";

function Course({ route }) {
  const [loading, setLoading] = useState(false);
  const data = route.params.data;

  const { themeState } = useContext(GlobalContext);
  const navigation = useNavigation();
  const [active, setActive] = useState(false);
  const [fileUri, setFileUri] = useState("");

  const url = data.courseUrl;
  console.log();

  const downloadFile = async (url) => {
    const directory = FileSystem.documentDirectory + "Analog Electronics/"; // replace with the desired directory name
    const fileUri = directory + "file.pdf"; // replace with the desired file name and extension
    setLoading(true);
    try {
      const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);

      if (status === "granted") {
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

        const downloadObject = FileSystem.createDownloadResumable(url, fileUri);

        try {
          const { uri } = await downloadObject.downloadAsync();
        } catch (error) {
          console.error("Error downloading file:", error);
          setLoading(false);
        }
      } else {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status === "granted") {
          await FileSystem.makeDirectoryAsync(directory, {
            intermediates: true,
          });

          const downloadObject = FileSystem.createDownloadResumable(
            url,
            fileUri
          );

          try {
            const { uri } = await downloadObject.downloadAsync();
            Alert.alert("File Downloaded at " + " " + uri);
            setLoading(false);
          } catch (error) {
            console.error("Error downloading file:", error);
          }
        }
      }
    } catch (error) {
      console.error("Error checking permission:", error);
      setLoading(false);
    }
  };

  const openDocumentFromUrl = async (url) => {
    try {
      const { uri } = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: false,
        type: "*/*",
        uri: url,
      });
      if (uri) {
        // Open the document using the Expo Linking API
        await Linking.openURL(uri);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  return (
    <SafeAreaView style={{ backgroundColor: themeState.value }}>
      <ScrollView
        style={{
          padding: 18,
          backgroundColor: themeState.value,
          height: "100%",
        }}
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
            Course Details
          </Typography>
          <Text></Text>
        </View>
        <View>
          <Image source={{ uri: data?.image }} style={styles.image} />
          <View style={{ paddingTop: 9, paddingBottom: 20 }}>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => {
                Linking.openURL(data?.courseUrl);
              }}
            >
              <Text style={styles.ButtonText}>View</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Typography variant="h3" color="#102660" fontWeight={700}>
              {data.courseTitle}
            </Typography>
          </View>
          <View style={{ marginTop: 10 }}>
            <Typography variant="body1" color="#102660">
              Last Updated
              <Text style={{ fontSize: 16, fontWeight: 700 }}>
                {data?.createdAt}
              </Text>
            </Typography>
          </View>

          <View style={styles.Switch}>
            <TouchableOpacity
              style={
                active
                  ? styles.SwitchButtonNotActive
                  : styles.SwitchButtonActive
              }
              onPress={() => {
                setActive(!active);
              }}
            >
              <Text
                style={
                  active
                    ? styles.SwitchButtonText
                    : styles.SwitchButtonTextNotActive
                }
              >
                Description
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                active
                  ? styles.SwitchButtonActive
                  : styles.SwitchButtonNotActive
              }
              onPress={() => {
                setActive(!active);
              }}
            >
              <Text
                style={
                  active
                    ? styles.SwitchButtonTextActive
                    : styles.SwitchButtonText
                }
              >
                Author Details
              </Text>
            </TouchableOpacity>
          </View>
          {active ? (
            <View
              style={{
                marginTop: 20,
              }}
            >
              <View
                style={{
                  flex: 0,
                  flexDirection: "row",

                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flex: 0,
                    flexDirection: "row",
                    gap: 10,
                    marginTop: 15,
                    alignItems: "center",
                  }}
                >
                  <Avatar src={require("../../assets/img/avatar.jpg")} />
                  <View>
                    <Typography variant="h6" fontWeight={700}>
                      {data.authorName}
                    </Typography>
                  </View>
                </View>
                <View
                  style={{
                    flex: 0,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Entypo
                    name="star"
                    size={18}
                    color="#f90"
                    style={{ marginRight: 4 }}
                  />
                  <Typography color="#102660" variant="body1">
                    4.8
                  </Typography>
                </View>
              </View>
              <View style={{ marginTop: 40 }}>
                <Typography variant="h6">
                  <View style={{ marginRight: 10 }}></View>
                  {data?.authorDescription}
                </Typography>
              </View>
              <View style={{ marginTop: 40 }}>
                <TouchableOpacity
                  style={styles.Button}
                  onPress={() => {
                    navigation.navigate("Navigator");
                  }}
                >
                  <Text style={styles.ButtonText}>Contact </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{ marginTop: 20 }}>
              <Typography variant="h6">
                <View style={{ marginRight: 10 }}></View>
                {data.courseDescription}
              </Typography>

              <View style={{ marginTop: 40 }}>
                <TouchableOpacity
                  style={styles.Button}
                  onPress={() => {
                    downloadFile(url);
                  }}
                >
                  {loading ? (
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={styles.ButtonText}>Downloading</Text>
                      <ActivityIndicator color="#fff" />
                    </View>
                  ) : (
                    <Text style={styles.ButtonText}>
                      Download{" "}
                      <Entypo
                        name="download"
                        size={24}
                        color="#fff"
                        style={{ marginLeft: 2 }}
                      />
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: {},
  header: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
  },
  ButtonText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 20,
    fontWeight: "700",
  },
  SwitchButtonText: {
    color: "#000",
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 20,
    fontWeight: "700",
  },
  SwitchButtonTextActive: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 20,
    fontWeight: "700",
  },
  SwitchButtonTextNotActive: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 20,
    fontWeight: "700",
  },
  Switch: {
    flex: 0,
    flexDirection: "row",
    marginTop: 20,
  },
  Button: {
    height: 50,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#102660",

    borderRadius: 5,
    borderWidth: 1,
  },
  SwitchButton: {
    height: 50,
    width: 150,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#fff",
  },
  SwitchButtonNotActive: {
    height: 50,
    width: 150,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#fff",
  },
  SwitchButtonActive: {
    height: 50,
    width: 150,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#102660",
  },
  Button: {
    height: 50,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#102660",

    borderRadius: 5,
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 30,
    borderRadius: 10,
  },
});
export default Course;
