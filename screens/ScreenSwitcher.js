import { View, Text, Appearance, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  Stack,
} from "@react-navigation/native-stack";
import Login from "./Login";
import AppWrapper from "./AppWrapper";
import Home from "./Home";

import Course from "./course/u";
import Navigator from "./Navigator";
import Allcourses from "./categories/Allcourses";
import AllCategories from "./categories/AllCategories";
import { useContext } from "react";
import { GlobalContext } from "../context";
import AccountSettings from "../screens/profile/AccountSettings";
import SignUp from "./Signup";
import Profile from "./Profile";
import CreateEvents from "./CreateEvents";

export default function App({ loggedIn }) {
  const RootStack = createNativeStackNavigator();
  const {
    themeState,
    themeDispatch,
    authState: { isLoggedIn },
  } = useContext(GlobalContext);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <RootStack.Screen name="Navigator" component={Navigator} />

          <RootStack.Screen name="Course" component={Course} />
          <RootStack.Screen name="Allcourse" component={Allcourses} />
          <RootStack.Screen name="AllCategories" component={AllCategories} />
          <RootStack.Screen name="Profile" component={Profile} />
          <RootStack.Screen name="CreateEvents" component={CreateEvents} />

          <RootStack.Screen
            name="AccountSettings"
            component={AccountSettings}
          />
        </RootStack.Navigator>
      ) : (
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <RootStack.Screen name="AppWrapper" component={AppWrapper} />

          <RootStack.Screen name="Login" component={Login} />
          <RootStack.Screen name="Signup" component={SignUp} />

          <RootStack.Screen
            name="AccountSettings"
            component={AccountSettings}
          />
        </RootStack.Navigator>
      )}
    </NavigationContainer>
  );
}
