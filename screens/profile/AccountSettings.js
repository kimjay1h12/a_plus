import { useNavigation } from "@react-navigation/core";
import { useContext, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { GlobalContext } from "../../context";
import { AntDesign } from "@expo/vector-icons";
import Typography from "../../components/custom/Typography";
import { FontAwesome } from "@expo/vector-icons";
function AccountSettings() {
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const { themeState, themeDispatch } = useContext(GlobalContext);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeState.value }}>
      <ScrollView style={{ padding: 15 }} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <AntDesign
            name="arrowleft"
            size={24}
            color={themeState.mode === "dark" ? "#fff" : "#407BFF"}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Typography variant="h5" fontWeight={700} color="#407BFF">
            Edit Profile
          </Typography>
          <Text></Text>
        </View>
        <View
          style={{
            marginTop: 50,
            backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
            flex: 0,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            padding: 20,
            marginBottom: 50,
          }}
        >
          <Image
            style={{
              width: 130,
              height: 130,
              marginBottom: 20,
              borderRadius: 80,
              marginTop: 40,
            }}
            source={require("../../assets/img/avatar.jpg")}
          />

          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="first Name"
              onChangeText={(text) => setText(text)}
              value={text}
            />
            <Entypo name="edit" size={24} color="black" style={styles.icon} />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={(text) => setText(text)}
              value={text}
            />
            <Entypo name="edit" size={24} color="black" style={styles.icon} />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Email "
              onChangeText={(text) => setText(text)}
              value={text}
            />
            <Entypo name="edit" size={24} color="black" style={styles.icon} />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Country"
              onChangeText={(text) => setText(text)}
              value={text}
            />
            <Entypo name="edit" size={24} color="black" style={styles.icon} />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Phone Number "
              onChangeText={(text) => setText(text)}
              value={text}
            />
            <Entypo name="edit" size={24} color="black" style={styles.icon} />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(text) => setText(text)}
              value={text}
            />
            <Entypo name="edit" size={24} color="black" style={styles.icon} />
          </View>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              navigation.navigate("Navigator");
            }}
          >
            <Text style={styles.ButtonText}>Save Charges</Text>
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
  Button: {
    height: 50,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "#407BFF",
    borderRadius: 7,
    width: "100%",
    marginTop: 40,
    marginBottom: 50,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  icon: {
    marginLeft: 10,
  },
  profileHeader: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 250,
    marginTop: 40,
    borderRadius: 10,
  },
});
export default AccountSettings;
