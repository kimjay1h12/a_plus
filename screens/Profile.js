import { useNavigation } from "@react-navigation/core";
import { useContext, useEffect, useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Typography from "../components/custom/Typography";
import { GlobalContext } from "../context";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { child, get, getDatabase, ref } from "firebase/database";
function Profile() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [userData, setUserData] = useState({});
  const { themeState, themeDispatch, authState, authDispatch } =
    useContext(GlobalContext);

  useEffect(() => {
    if (isEnabled) {
      themeDispatch({
        type: "dark",
      });
    } else {
      themeDispatch({
        type: "light",
      });
    }
  }, [isEnabled]);
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const GetUserInfo = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${authState.data.userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setUserData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    GetUserInfo();
  }, [authState.data.userId]);

  const clear = async () => {
    try {
      const res = await AsyncStorage.removeItem("userId");
      const res1 = await AsyncStorage.removeItem("formdata");
      authDispatch({ type: "Error" });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (colorScheme === "dark") {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, [colorScheme]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeState.value }}>
      <ScrollView style={{ padding: 15 }} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <AntDesign
            name="arrowleft"
            size={28}
            color={themeState.mode === "dark" ? "#aaa" : "#fff"}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Typography variant="h5" fontWeight={700}>
            Profile
          </Typography>
          <Text></Text>
        </View>
        <View
          style={[
            styles.profileHeader,
            {
              backgroundColor: themeState.mode === "dark" ? "#222" : "#f7f7f7",
            },
          ]}
        >
          <Image
            style={{ width: 90, height: 90, borderRadius: 80 }}
            source={require("../assets/img/user.jpg")}
          />
          <Typography variant="h5" fontWeight={700} active={false}>
            {userData?.firstName}
            {" " + userData?.lastName}
          </Typography>
          <Typography variant="body1" active={false}>
            {userData?.email}
          </Typography>
          <Typography variant="body1" active={false}>
            {userData?.school}
          </Typography>
          <Typography variant="body1" active={false}>
            {userData?.phoneNumber}
          </Typography>
          <Typography variant="body1" active={false}>
            {userData?.country}
          </Typography>
        </View>
        <View style={{ marginTop: 40 }}>
          <View
            style={{
              flex: 0,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flex: 0,
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "#407BFF",
                  width: 50,
                  borderRadius: 40,
                  height: 50,
                  flex: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                }}
              >
                <AntDesign name="user" size={30} color="#fff" />
              </View>
              <Typography variant="h5" fontWeight={600}>
                Account Settings
              </Typography>
            </View>
            {themeState.mode === "dark" ? (
              <AntDesign
                name="arrowright"
                size={20}
                color="#fff"
                onPress={() => {
                  navigation.navigate("AccountSettings");
                }}
              />
            ) : (
              <AntDesign
                name="arrowright"
                size={20}
                color="black"
                onPress={() => {
                  navigation.navigate("AccountSettings");
                }}
              />
            )}
          </View>
          <View
            style={{
              flex: 0,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <View
              style={{
                flex: 0,
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "yellow",
                  width: 50,
                  borderRadius: 40,
                  height: 50,
                  flex: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                }}
              >
                <Entypo name="light-down" size={30} color="#ddd" />
              </View>
              <Typography variant="h5" fontWeight={600}>
                {isEnabled ? "Dark Mode" : "Light Mode"}
              </Typography>
            </View>
            <Switch
              trackColor={{ false: "#81b0ff", true: "#767577" }}
              thumbColor={isEnabled ? "#f4f3f4" : "#f5dd4b"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              clear();
            }}
          >
            <View
              style={{
                flex: 0,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 30,
              }}
            >
              <View
                style={{
                  flex: 0,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <View
                  style={{
                    backgroundColor: "red",
                    width: 50,
                    borderRadius: 40,
                    height: 50,
                    flex: 0,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  <Ionicons
                    name="exit-outline"
                    style={{ marginLeft: 7 }}
                    size={30}
                    color="#fff"
                  />
                </View>
                <Typography variant="h5" fontWeight={600}>
                  Logout
                </Typography>
              </View>
              {themeState.mode === "dark" ? (
                <AntDesign name="arrowright" size={30} color="#fff" />
              ) : (
                <AntDesign name="arrowright" size={30} color="black" />
              )}
            </View>
          </TouchableOpacity>
        </View>
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
  profileHeader: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",

    height: 250,
    marginTop: 40,
    borderRadius: 10,
  },
});
export default Profile;
