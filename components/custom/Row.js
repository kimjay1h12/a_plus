import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-web";

function Row({ children }) {
  return <View style={style.root}>{children}</View>;
}
const style = StyleSheet.create({
  root: {
    flex: 0,
    alignItems: "center",
    flexDirection: "row",
  },
});
export default Row;
