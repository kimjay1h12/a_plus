import { Platform, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

export default StyleSheet.create({
  bgImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
    left: 0,
    top: 0,
  },
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? moderateScale(35) : 0,
  },
});
