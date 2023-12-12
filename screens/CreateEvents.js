import {
  Alert,
  Dimensions,
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
import Typography from "../components/custom/Typography";
import { Feather } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { GlobalContext } from "../context";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome } from "@expo/vector-icons";
import CourseCategoryCard from "../components/CourseCategoryCard";
import { child, get, getDatabase, push, ref } from "firebase/database";
import { app } from "../firebase";
import { useEffect } from "react";
import CalendarPicker from "react-native-calendar-picker";
const Category = [
  {
    title: "Reading",
    icon: <Feather name="book-open" size={34} color="black" />,
  },
  {
    title: "Working",

    icon: <MaterialIcons name="computer" size={34} color="#407BFF" />,
  },
  {
    title: "Writing",

    icon: <FontAwesome name="pencil-square-o" size={34} color="black" />,
  },
  {
    title: "Gaming",

    icon: <Entypo name="game-controller" size={34} color="#407BFF" />,
  },
  {
    title: "Sport",

    icon: <FontAwesome name="pencil-square-o" size={34} color="black" />,
  },
  {
    title: "Cooking",

    icon: <Entypo name="game-controller" size={34} color="#407BFF" />,
  },
];
function CreateEvents() {
  const [date, setDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: 23 + ":" + 20,
    category: "Reading",

    description: "",
  });
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    setDate(date);
    hideDatePicker();
  };

  const [category, setCategory] = useState("Reading");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const startDate = selectedStartDate
    ? selectedStartDate.format("YYYY-MM-DD").toString()
    : "";
  const { themeState, authState } = useContext(GlobalContext);
  const navigation = useNavigation();

  useEffect(() => {
    var date = new Date(selectedStartDate).getDate();
    var month = new Date(selectedStartDate).getMonth() + 1;
    var year = new Date(selectedStartDate).getFullYear();
    var data = date + "-" + month + "-" + year;
    setFormData({ ...formData, date: data });
  }, [selectedStartDate]);

  function writeTodoData(formdata) {
    const db = getDatabase(app);
    push(ref(db, `Todo/${authState.data.userId}`), formData);

    Alert.alert("Success");
    setFormData({
      title: "",
      date: "",
      time: 23 + ":" + 20,
      category: "Reading",

      description: "",
    });
    navigation.goBack();
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeState.value }}>
      <ScrollView
        style={{ padding: 15 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
        >
          <View style={styles.header}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="#407BFF"
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Typography variant="h5" fontWeight={700} color="#407BFF">
              Create Events
            </Typography>
            <Text></Text>
          </View>
          <View style={{ marginTop: 50 }}>
            <View
              style={{
                flex: 0,
                alignItems: "center",
                marginBottom: 30,
                marginTop: 10,
              }}
            >
              <Typography variant="h5" fontWeight={600}>
                Event Date
              </Typography>
            </View>
            <View
              style={{
                borderRadius: 15,
                backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
                padding: 10,
              }}
            >
              <CalendarPicker
                width={Dimensions.get("window").width - 15}
                onDateChange={setSelectedStartDate}
              />
            </View>
          </View>
          <View style={{ marginTop: 50 }}>
            <View style={{ flex: 0, alignItems: "center", marginBottom: 20 }}>
              <Typography variant="h5" fontWeight={600}>
                Event Time
              </Typography>
            </View>
            <TouchableOpacity
              style={{
                height: 50,
                flex: 0,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
                width: "96%",
                paddingTop: 8,
                paddingBottom: 8,

                borderRadius: 10,
                marginLeft: Platform.OS === "ios" ? 10 : 0,
                marginRight: Platform.OS === "ios" ? 10 : 0,
                backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
              }}
              onPress={showDatePicker}
            >
              <Text
                style={{
                  color: themeState.mode === "dark" ? "#fff" : "#407BFF",
                  textAlign: "center",
                  paddingLeft: 15,
                  paddingRight: 15,
                  fontSize: 20,
                  fontWeight: "700",
                }}
              >
                {formData.time}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  time: e.getHours() + ":" + e.getMinutes(),
                });
              }}
            />
          </View>
          <View style={{ marginTop: 50 }}>
            <View style={{ flex: 0, alignItems: "center", marginBottom: 20 }}>
              <Typography variant="h5" fontWeight={600}>
                Event Title
              </Typography>
            </View>
            <TextInput
              placeholder="Event Title"
              style={{
                height: 50,
                margin: 6,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,

                color: themeState.mode === "dark" ? "#fff" : "#407BFF",

                backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
              }}
              value={formData.title}
              onChangeText={(e) => {
                setFormData({ ...formData, title: e });
              }}
              placeholderTextColor={
                themeState.mode === "dark" ? "#fff" : "#407BFF"
              }
            />
          </View>
          <View style={{ marginTop: 50 }}>
            <View style={{ flex: 0, alignItems: "center", marginBottom: 20 }}>
              <Typography variant="h5" fontWeight={600}>
                Event Description
              </Typography>
            </View>
            <TextInput
              placeholder="Event Description"
              placeholderTextColor={
                themeState.mode === "dark" ? "#fff" : "##407BFF"
              }
              style={{
                height: 150,
                margin: 6,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,

                color: themeState.mode === "dark" ? "#fff" : "#407BFF",

                backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
              }}
              value={formData.description}
              onChangeText={(e) => {
                setFormData({ ...formData, description: e });
              }}
              multiline
            />
          </View>
          <View style={{ marginTop: 50 }}>
            <View style={{ flex: 0, alignItems: "center", marginBottom: 20 }}>
              <Typography variant="h5" fontWeight={600}>
                Event Category
              </Typography>
            </View>
            <View
              style={{
                flex: 0,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {Category.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setFormData({ ...formData, category: item.title });
                  }}
                >
                  <View
                    style={{
                      flex: 0,
                      width: 100,
                      height: 100,
                      backgroundColor:
                        themeState.mode === "dark" ? "#222" : "#fff",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 60,
                      borderColor:
                        item.title === formData.category ? "#f90" : "#fff",
                      borderWidth: 1,
                      marginTop: 10,
                    }}
                  >
                    {item.icon}
                    <Typography active={false}>{item.title}</Typography>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{ marginTop: 50, marginBottom: 70 }}>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => {
                setLoading(true);
                writeTodoData();
                setLoading(false);
              }}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.ButtonText}>Create Event</Text>
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
  ButtonText1: {
    color: "#407BFF",
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
    width: "96%",
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginLeft: Platform.OS === "ios" ? 10 : 0,
    marginRight: Platform.OS === "ios" ? 10 : 0,
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
});
export default CreateEvents;
