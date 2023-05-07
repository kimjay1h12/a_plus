import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "./custom/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { GlobalContext } from "../context";
import * as Haptics from "expo-haptics";
import { db } from "../firebase";
import { ref, remove } from "firebase/database";
function CourseCategoryCard({
  title,
  description,
  coursecode,
  image,
  userKey,
  postKey,
}) {
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
  return (
    <View
      style={{
        flex: 0,
        flexDirection: "row",
        padding: 15,
        backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
        borderRadius: 15,
        gap: 10,
        width: "100%",
        marginTop: 10,
      }}
    >
      {image ? (
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
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {},
  Image: {
    width: 130,
    height: 130,
    borderRadius: 20,
  },
});
export default CourseCategoryCard;
