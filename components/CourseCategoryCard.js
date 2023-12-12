import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { getDatabase, ref, remove, set } from "firebase/database";
import { useContext, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { GlobalContext } from "../context";
import { db, firebaseConfig } from "../firebase";
import SelectMenu from "./custom/SelectMenu";
import Typography from "./custom/Typography";
import { initializeApp } from "firebase/app";
function CourseCategoryCard({
  title,
  description,
  coursecode,
  image,
  userKey,
  postKey,
}) {
  const options = [
    { label: "Add To Course", value: postKey },
    { label: "Remove From Course", value: "option_1" },
    { label: "Add to Favourate", value: "option_2" },
    // Add more options as needed
  ];
  const handleDelete = (key) => {
    // Get a reference to the child node you want to remove

    // Remove the node using the remove() method

    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          var nodeRef = ref(db, `courses/${key}`);

          remove(nodeRef)
            .then(function () {})
            .catch(function (error) {
              console.log("Remove failed: " + error.message);
            });
        },
      },
    ]);
  };
  const [liked, setLiked] = useState(false);
  const { themeState, authState } = useContext(GlobalContext);
  const [isVisible, setIsVisible] = useState(false);
  const handleopen = () => {
    setIsVisible(true);
  };
  const handleClose = () => {
    setIsVisible(false);
  };
  const app = initializeApp(firebaseConfig);
  const userId = authState?.data?.userId;
  console.log(userId);
  function writeUserData(postKey) {
    const db = getDatabase(app);

    set(ref(db, "mycourse/" + userId), postKey);

    Alert.alert("Success");
  }

  return (
    <View
      style={{
        flex: 0,
        flexDirection: "row",
        padding: 12,
        backgroundColor: themeState.mode === "dark" ? "#222" : "#f7f7f7",
        borderBottomColor: themeState.mode === "dark" ? "#fff" : "#000",
        borderWidth: 0.7,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderColor: "translucent",
        borderStyle: "solid",

        width: "100%",
      }}
    >
      <SelectMenu
        open={isVisible}
        options={options}
        onChange={(e) => {
          writeUserData(e);
        }}
        onClose={handleClose}
      />
      <View
        style={{
          flex: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: Dimensions.get("screen").width - 60,
        }}
      >
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          {image ? (
            <Image style={styles.Image} source={{ uri: image }} />
          ) : (
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 20,
                resizeMode: "contain",
              }}
              source={require("../assets/img/file.png")}
            />
          )}
          <View>
            <Typography variant="h6">{title}</Typography>
            <Typography>{description}</Typography>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleopen();
          }}
        >
          <Feather
            name="more-vertical"
            size={24}
            color={themeState.mode === "dark" ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </View>
      {/* {image ? (
        <Image style={styles.Image} source={{ uri: image }} />
      ) : (
        <Image
          style={{
            width: 130,
            height: 130,
            borderRadius: 20,
            resizeMode: "contain",
          }}
          source={require("../assets/img/file.png")}
        />
      )}
      <View
        style={{
          marginTop: 10,
          flex: 1,
          justifyContent: "space-between",
          marginLeft: 9,
        }}
      >
        <View style={{ width: "100%" }}>
          <Typography variant="body1" fontWeight={700} active={false}>
            {title}
          </Typography>
          <View style={{ marginTop: 4 }}>
            <Typography variant="body2" active={false}>
              {coursecode}
            </Typography>
          </View>
          <View style={{ marginTop: 8 }}>
            <Typography variant="body1 " active={false}>
              {description?.substr(0, 10)}
            </Typography>
          </View>
        </View>
        <View
          style={{
            right: 0,
            position: "absolute",
            bottom: 0,
          }}
        >
          {authState.data.userId === userKey ? (
            <TouchableOpacity
              onPress={() => {
                handleDelete(postKey);
              }}
            >
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  root: {},
  Image: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: 250,
    flex: 1,
  },
  optionItem: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});
export default CourseCategoryCard;
