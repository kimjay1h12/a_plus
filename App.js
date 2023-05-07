import { View, Text, Appearance, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  Stack,
} from "@react-navigation/native-stack";
import Onboarding from "./screens/Onboarding";
import AppWrapper from "./screens/AppWrapper";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Navigator from "./screens/Navigator";
import Course from "./screens/course/u";
import GlobalProvider, { GlobalContext } from "./context";
import { useContext, useEffect } from "react";
import Allcourses from "./screens/categories/Allcourses";
import AllCategories from "./screens/categories/AllCategories";
import AccountSettings from "./screens/profile/AccountSettings";
import ScreenSwicher from "./screens/ScreenSwitcher";
import * as SplashScreen from "expo-splash-screen";
export default function App({ loggedIn }) {
  const RootStack = createNativeStackNavigator();
  const { themeState, themeDispatch } = useContext(GlobalContext);
  SplashScreen.preventAutoHideAsync();
  return (
    <GlobalProvider>
      <ScreenSwicher />
    </GlobalProvider>
  );
}
