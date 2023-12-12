import {
  Alert,
  BackHandler,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import Amination from "../components/Amination";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../context";
import Typography from "../components/custom/Typography";
import * as Network from "expo-network";
import { Dimensions } from "react-native";
function Onboarding() {
  const navigation = useNavigation();
  const [steps, setSteps] = useState(0);
  const [networkData, setNetworkData] = useState();
  const { themeState } = useContext(GlobalContext);
  const NetworkCheck = async () => {
    try {
      const res = await Network.getNetworkStateAsync();

      setNetworkData(res.isConnected);
      if (res.isConnected) {
      } else {
        AlertNetwork();
      }
      console.log(networkData);
    } catch (error) {
      AlertNetwork();
    }
  };
  const AlertNetwork = () => {
    Alert.alert(
      "Oops Not Connected to the internet",
      "You need to connect to the internet to proceed using this app",
      [
        {
          text: "Settings",
          style: "cancel",
          onPress: () => {
            Linking.openSettings();
          },
        },
        {
          text: "Yes",
          onPress: async () => {
            BackHandler.exitApp();
          },
        },
      ]
    );
  };
  useEffect(() => {
    NetworkCheck();
  }, []);

  return (
    <View
      style={{ height: "100%", backgroundColor: themeState.value, flex: 1 }}
    >
      {steps === 0 && (
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Image
            source={require("../assets/img/aplus.gif")}
            style={{
              width: Dimensions.get("screen").width,
              maxHeight: Dimensions.get("screen").height - 300,
              resizeMode: "contain",
            }}
          />
          <View
            style={{
              flex: 0,

              padding: 0,
              alignItems: "center",
              justifyContent: "space-between",

              flexDirection: "column",
            }}
          >
            <Typography variant="h1" fontWeight={700}>
              Boost Your
            </Typography>
            <Typography variant="h2">Digital Education Online</Typography>
          </View>
          <Amination>
            <TouchableOpacity
              style={[styles.LoginButton, { marginBottom: 70 }]}
              onPress={() => {
                setSteps(steps + 1);
              }}
            >
              <Text style={styles.LoginButtonText}>
                Get Started
                <AntDesign name="arrowright" size={20} color={"#fff"} />
              </Text>
            </TouchableOpacity>
          </Amination>
        </View>
      )}
      {steps === 1 && (
        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          <Image
            style={{
              width: "100%",
              maxHeight: Dimensions.get("screen").height - 300,
              resizeMode: "contain",
            }}
            source={require("../assets/img/aplus1.png")}
          />

          <View style={{ marginTop: 3 }}>
            <View style={styles.TextSection}>
              <Typography variant="h1" fontWeight={700}>
                Get your best result ever...
              </Typography>
            </View>
          </View>
          <View style={{ padding: 20, marginTop: 20, marginBottom: 70 }}>
            <TouchableOpacity
              style={[styles.LoginButton, { backgroundColor: "#aaa" }]}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.LoginButtonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.LoginButton}
            >
              <Text style={styles.LoginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  ButtonText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  LoginButtonText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 15,
    fontSize: 20,
    fontWeight: "700",
    paddingRight: 15,
    width: Dimensions.get("screen").width - 30,
  },
  image: {
    alignItems: "center",
    marginTop: 59,
    backgroundColor: "#fff",
  },
  Button: {
    marginRight: 10,

    marginTop: 10,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "#407BFF",
    borderRadius: 15,
  },

  LoginButton: {
    minWidth: 180,
    minHeight: 50,
    marginTop: 10,
    flex: 0,
    justifyContent: "center",
    borderRadius: 20,
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,

    backgroundColor: "#407BFF",
  },
  TextSection: {
    padding: 15,
  },

  Footer: {
    flex: 0,

    position: "absolute",
    bottom: 50,
    right: 20,
  },
  Footer1: {
    flex: 0,
    width: "100%",
    position: "absolute",
    bottom: 50,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
  },
  Footer2: {
    flex: 0,
    width: "100%",
    position: "absolute",
    bottom: 50,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
  },
});
export default Onboarding;
