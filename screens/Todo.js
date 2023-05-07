import {
  Alert,
  Dimensions,
  Image,
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
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Typography from "../components/custom/Typography";
import { Feather } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { GlobalContext } from "../context";
import CourseCategoryCard from "../components/CourseCategoryCard";
import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  remove,
} from "firebase/database";
import { app } from "../firebase";
import { useEffect } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { FontAwesome } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { Entypo } from "@expo/vector-icons";
import { firebasec1 } from "../firebase1";
function Todo() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }
  useEffect(() => {
    schedulePushNotification();
  }, []);

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const startDate = selectedStartDate
    ? selectedStartDate.format("YYYY-MM-DD").toString()
    : "";
  const { themeState, authState } = useContext(GlobalContext);
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
          var nodeRef = firebasec1
            .database()
            .ref(`Todo/${authState.data.userId}/${key}`);
          nodeRef
            .remove()
            .then(function () {
              console.log("Remove succeeded.");
            })
            .catch(function (error) {
              console.log("Remove failed: " + error.message);
            });
        },
      },
    ]);
  };
  const navigation = useNavigation();
  const [todoList, setTodoList] = useState();
  const GetTodoData = () => {
    var database = firebasec1.database();

    // Get a reference to the specific data you want to listen for changes on
    var dataRef = database.ref(`Todo/${authState.data.userId}`);

    // Listen for value changes on the data reference
    dataRef.on("value", function (snapshot) {
      // This function will be called whenever the data changes
      var data = snapshot.val();
      console.log(data, "dd");
      if (data) {
        const arr = Object.keys(data).map((key) => ({ ...data[key], key }));

        const array = arr.reverse();

        setTodoList(array);
      }

      // Do something with the data
    });
  };
  useEffect(() => {
    GetTodoData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeState.value }}>
      <ScrollView
        style={{ padding: 15 }}
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
              Events
            </Typography>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CreateEvents");
              }}
            >
              <Entypo
                name="circle-with-plus"
                size={34}
                color={themeState.mode === "dark" ? "#fff" : "#102660"}
              />
            </TouchableOpacity>
          </View>
          <View></View>
          {todoList?.map((cur, index) => (
            <View
              key={index}
              style={{
                backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
                borderRadius: 15,
                padding: 20,
                flex: 0,
                flexDirection: "row",
                justifyContent: "space-between",

                marginTop: 20,
              }}
            >
              <View
                style={{
                  flex: 0,
                  gap: 20,
                  flexDirection: "row",
                }}
              >
                <FontAwesome
                  name="calendar-check-o"
                  size={74}
                  color="#102660"
                />
                <View style={{ flex: 0, gap: 6 }}>
                  <Typography variant="h5" fontWeight={600} active={false}>
                    {cur.title}
                  </Typography>
                  <Typography variant="body1" active={false}>
                    {cur.description.substr(0, 10) + "...."}
                  </Typography>
                  <Typography variant="body1" active={false}>
                    {cur.category}
                  </Typography>
                  <Typography variant="body1" fontWeight={600} active={false}>
                    Date : {cur.date}
                  </Typography>
                  <Typography variant="body1" fontWeight={600} active={false}>
                    Time : {cur.time}
                  </Typography>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleDelete(cur.key);
                }}
              >
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Desinput: {
    height: 150,
    margin: 6,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,

    color: "#102660",
    borderColor: "#fff",

    backgroundColor: "#fff",
  },
  header: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" ? 24 : 0,
    alignItems: "center",
    marginBottom: 20,
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

    color: "#102660",
    borderColor: "#fff",

    backgroundColor: "#fff",
  },
});
export default Todo;
