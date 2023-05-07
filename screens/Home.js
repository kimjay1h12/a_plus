import {
  Dimensions,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import Typography from "../components/custom/Typography";
import { Entypo } from "@expo/vector-icons";
import ImageSlider from "../components/ImageSlider";
import CourseCard from "../components/CourseCard";
import { useNavigation } from "@react-navigation/core";
import { useCallback, useContext, useEffect, useState } from "react";
import themeReducer from "../context/reducer/themeReducer";
import { GlobalContext } from "../context";
import { Categories } from "../utility";
import { Ionicons } from "@expo/vector-icons";
import { child, get, onValue, ref, set } from "firebase/database";
import { db } from "../firebase";
import { LineChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
function Home() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    GetAppUsageResult();
    GetCourses();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const [userData, setUserData] = useState({});
  const { themeState, themeDispatch, authState, authDispatch } =
    useContext(GlobalContext);

  const GetUserInfo = () => {
    const dbRef = ref(db);
    get(child(dbRef, `users/${authState.data.userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
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
  let appUsageCount = 0;

  const [data, setData] = useState();

  const GetCourses = () => {
    // Get a reference to the specific data you want to listen for changes on
    var dataRef = ref(db, "courses");
    onValue(dataRef, (snapshot) => {
      var data = snapshot.val();
      console.log(data, "dd");
      if (data) {
        const arr = Object?.keys(data).map((key) => ({ ...data[key], key }));
        const array = arr.reverse();
        setAllCourses(array);
        setCourse(array.slice(0, 10));
      }
    });
  };

  useEffect(() => {
    GetCourses();
  }, []);
  const GetAppUsageResult = () => {
    // Get a reference to the specific data you want to listen for changes on
    var dataRef = ref(db, `appUsage/${authState.data.userId}`);

    onValue(dataRef, (snapshot) => {
      var data = snapshot.val();
      setData(data);
    });
  };

  useEffect(() => {
    GetAppUsageResult();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: themeState.value,
      }}
    >
      <StatusBar translucent={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.ImageSlider}>{/* <ImageSlider /> */}</View>
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            padding: 12,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Image
              style={{
                width: 42,
                height: 42,
                borderRadius: 40,
              }}
              source={require("../assets/img/user.jpg")}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 0,
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {userData?.firstName ? (
              <View>
                <Typography variant="h5" fontWeight={700}>
                  {userData?.firstName + " " + userData?.lastName}
                </Typography>
                <Typography variant="body2">{userData?.email}</Typography>
              </View>
            ) : (
              <ActivityIndicator color="#fff" />
            )}
          </View>
          <Ionicons
            name="notifications"
            size={34}
            color={themeState.mode === "dark" ? "#fff" : "#102660"}
          />
        </View>
        <View style={{ padding: 10, marginTop: 10 }}>
          <View
            style={{
              backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
              padding: 20,
              borderRadius: 16,
              flex: 0,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="chart-bar-stacked"
              size={44}
              color={themeState.mode === "dark" ? "#fff" : "#102660"}
            />
            <Text
              style={{
                color: themeState.mode === "dark" ? "#fff" : "#102660",
                fontWeight: 600,
                fontSize: 17,
              }}
            >
              You have 2 upcomming Events
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={34}
              color={themeState.mode === "dark" ? "#fff" : "#102660"}
            />
          </View>
        </View>
        <View style={{ padding: 10, marginTop: 10 }}>
          <View style={{ marginBottom: 20 }}>
            <Typography variant="h5" fontWeight={600} color="#102660">
              General Usage Report
            </Typography>
          </View>
          <LineChart
            data={{
              labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
              datasets: [
                {
                  data: [
                    data?.Monday || 0,
                    data?.Tuesday || 0,
                    data?.Wednesday || 0,
                    data?.Thursday || 0,
                    data?.Friday || 0,
                    data?.Saturday || 0,
                    data?.Sunday || 0,
                  ],
                },
              ],
            }}
            width={Dimensions.get("window").width - 20} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
              backgroundGradientFrom:
                themeState.mode === "dark" ? "#222" : "#fff",
              backgroundGradientTo:
                themeState.mode === "dark" ? "#222" : "#fff",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) =>
                `${themeState.mode === "dark" ? "#fff" : "#102660"}`,
              labelColor: (opacity = 1) =>
                `${themeState.mode === "dark" ? "#fff" : "#102660"}`,

              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#102660",
              },
            }}
            bezier
            style={{
              borderRadius: 16,
            }}
          />
        </View>
        <View style={styles.Category}>
          <View style={styles.CategoryHeader}>
            <Typography variant="h5" fontWeight={600} color="#102660">
              Category
            </Typography>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AllCategories");
              }}
            >
              <Typography variant="body2" fontWeight={600} color="blue">
                See All
              </Typography>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal style={styles.CategoryContent}>
            {Categories?.map((cur, index) => (
              <TouchableOpacity key={index}>
                <View
                  style={{
                    backgroundColor:
                      themeState.mode === "dark" ? "#222" : "#fff",
                    minHeight: 120,
                    shadowColor: "#fff",
                    flex: 0,
                    minWidth: 190,
                    justifyContent: "center",
                    padding: 20,
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ marginBottom: 10 }}>
                    <Entypo
                      name="book"
                      size={34}
                      color={themeState.mode === "dark" ? "#fff" : "#102660"}
                    />
                  </Text>
                  <Text
                    style={{
                      color: themeState.mode === "dark" ? "#fff" : "#102660",
                    }}
                  >
                    {cur}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.TopCoursesHeader}>
            <Typography variant="h5" fontWeight={600} color="#102660">
              Top Courses
            </Typography>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Allcourse", { data: allCourses });
              }}
            >
              <Typography variant="body2" fontWeight={600} color="blue">
                See All
              </Typography>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal style={styles.CategoryContent}>
            {course?.map((cur, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("Course", {
                    data: {
                      image: cur.image,
                      authorName: cur.authorName,
                      coursecode: cur.Coursecode,
                      courseTitle: cur.courseTitle,
                      courseDescription: cur.courseDescription,
                      authorDescription: cur.authorDescription,
                      courseUrl: cur.courseUrl,
                      createdAt: cur.createdAt,
                    },
                  });
                }}
              >
                <CourseCard
                  description={cur.courseDescription}
                  url={cur.image}
                  author={cur.authorName}
                  rating={4.8}
                  category={cur.category}
                  title={cur.courseTitle}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  ImageSlider: {},
  Category: {
    padding: 15,
    marginTop: 10,
  },
  CategoryHeader: {
    flex: 0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  TopCoursesHeader: {
    flex: 0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },

  CategoryContent: {
    marginTop: 30,
    flex: 0,
    flexDirection: "row",
    overflow: "scroll",
    width: "100%",
  },
});
export default Home;
