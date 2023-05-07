import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import Home from "./Home";
import { Entypo } from "@expo/vector-icons";
import Settings from "./Post";
import Search from "./Search";
import Profile from "./Profile";
import { MaterialIcons } from "@expo/vector-icons";

import { FontAwesome } from "@expo/vector-icons";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context";
import { AntDesign } from "@expo/vector-icons";
import Post from "./Post";
import Todo from "./Todo";
import Course from "./course/u";
import Allcourses from "./categories/Allcourses";
import { useColorScheme } from "react-native";

const Tab = createBottomTabNavigator();
function Navigator() {
  const colorScheme = useColorScheme();
  const { themeState, authState, themeDispatch } = useContext(GlobalContext);
  useEffect(() => {
    if (colorScheme === "dark") {
      themeDispatch({
        type: "dark",
      });
    } else {
      themeDispatch({
        type: "light",
      });
    }
  }, [colorScheme]);
  console.log(authState);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: themeState.value,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#5555b2",
          title: "Home",

          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor: "transparent",
          headerTitleStyle: {
            fontSize: 16,
            marginLeft: 20,
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#5555b2",
          title: "Search",

          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor: "transparent",
          headerTitleStyle: {
            fontSize: 16,
          },
        }}
      />
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="pluscircle" size={34} color={color} />
          ),
          tabBarActiveTintColor: "#5555b2",
          title: "Post",

          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor: "transparent",
          headerTitleStyle: {
            fontSize: 16,
          },
        }}
      />

      <Tab.Screen
        name="Favourite"
        component={Allcourses}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="open-book" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#5555b2",
          title: "Courses",

          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor: "transparent",
          headerTitleStyle: {
            fontSize: 16,
          },
        }}
      />

      <Tab.Screen
        name="Todo"
        component={Todo}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event-available" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#5555b2",
          title: "Todo",

          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor: "transparent",
          headerTitleStyle: {
            fontSize: 16,
          },
        }}
      />
    </Tab.Navigator>
  );
}
export default Navigator;
