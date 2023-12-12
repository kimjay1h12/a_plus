import * as SystemUI from "expo-system-ui";
import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";

export default function themeReducer(state, { type, payload }) {
  // Platform
  if (payload === "dark" || type === "dark") {
    SystemUI.setBackgroundColorAsync("#111111");
    if (Platform.OS === "android") {
      NavigationBar.setButtonStyleAsync("light");
      NavigationBar.setBackgroundColorAsync("#111111");
    }
  } else {
    SystemUI.setBackgroundColorAsync("#ffffff");
    if (Platform.OS === "android") {
      NavigationBar.setButtonStyleAsync("dark");
      NavigationBar.setBackgroundColorAsync("#fff");
    }
  }

  switch (type) {
    case "dark":
      return { ...state, mode: "dark", value: "#000" };
    case "default":
      return { ...state, mode: "default", value: payload };
    case "light":
      return { ...state, mode: "light", value: "#ffff" };
    default:
      return state;
  }
}
