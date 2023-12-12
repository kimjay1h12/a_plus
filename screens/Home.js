import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { child, get, onValue, ref } from "firebase/database";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import Typography from "../components/custom/Typography";
import { GlobalContext } from "../context";
import { db } from "../firebase";
const courses = [
  {
    title: "Web Development",
    value: "web_development",
    description:
      "Web development, also known as website development, refers to the tasks associated with creating, building, and maintaining websites and web applications that run online on a browser. It may, however, also include web design, web programming, and database management.",
  },
  {
    title: "Mobile App Development",
    value: "mobileapp_development",

    description:
      "Mobile application development is the process of creating software applications that run on a mobile device, and a typical mobile application utilizes a network connection to work with remote computing resources.",
  },
];
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
  console.log("all courses", allCourses);
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
        style={{ padding: 15 }}
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

            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 0,
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {userData?.firstName ? (
              <View
                style={{ flex: 0, alignItems: "center", flexDirection: "row" }}
              >
                <Typography variant="h6">Welcome , </Typography>
                <Typography variant="h6" fontWeight={700}>
                  {userData?.firstName + " " + userData?.lastName}
                </Typography>
              </View>
            ) : (
              <ActivityIndicator color="#000" />
            )}
          </View>
          <Ionicons
            name="notifications-outline"
            size={28}
            color={themeState.mode === "dark" ? "#fff" : "#000"}
          />
        </View>
        <View
          style={{
            marginTop: 40,
            flex: 0,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 0, alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("quiz");
              }}
              style={{
                backgroundColor:
                  themeState.mode === "light" ? "#f7f7f7" : "#222",
                borderRadius: 40,
                width: 80,
                height: 80,
                flex: 0,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Ionicons
                name="ios-book-outline"
                size={28}
                color={themeState.mode === "light" ? "#000" : "#aaa"}
              />
            </TouchableOpacity>
            <Typography variant="h6">Quiz</Typography>
          </View>
          <View style={{ flex: 0, alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor:
                  themeState.mode === "light" ? "#f7f7f7" : "#222",
                borderRadius: 40,
                width: 80,
                height: 80,
                flex: 0,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <MaterialIcons
                name="event"
                size={28}
                color={themeState.mode === "light" ? "#000" : "#aaa"}
              />
            </TouchableOpacity>
            <Typography variant="h6">Task</Typography>
          </View>
          <View style={{ flex: 0, alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor:
                  themeState.mode === "light" ? "#f7f7f7" : "#222",
                borderRadius: 40,
                width: 80,
                height: 80,
                flex: 0,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <AntDesign
                name="edit"
                size={28}
                color={themeState.mode === "light" ? "#000" : "#aaa"}
              />
            </TouchableOpacity>
            <Typography variant="h6">Note</Typography>
          </View>
          <View style={{ flex: 0, alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor:
                  themeState.mode === "light" ? "#f7f7f7" : "#222",
                borderRadius: 40,
                width: 80,
                height: 80,
                flex: 0,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Feather
                name="more-horizontal"
                size={24}
                color={themeState.mode === "light" ? "#000" : "#aaa"}
              />
            </TouchableOpacity>
            <Typography variant="h6">Other</Typography>
          </View>
        </View>

        <View style={styles.Category}>
          <View style={styles.TopCoursesHeader}>
            <Typography variant="h5" fontWeight={600}>
              Top Course
            </Typography>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Allcourse", { data: allCourses });
              }}
            >
              <Typography variant="body2" fontWeight={600} color="#407BFF">
                See All
              </Typography>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            style={styles.CategoryContent}
            showsHorizontalScrollIndicator={false}
          >
            {courses.map((cur, index) => (
              <TouchableOpacity
                style={{
                  backgroundColor:
                    themeState.mode === "light" ? "#f7f7f7" : "#222",
                  maxHeight: 250,
                  width: 300,
                  borderRadius: 6,
                  padding: 15,
                  marginRight: 9,
                }}
                key={index}
                onPress={() => {
                  const filteredArray = allCourses.filter(
                    (obj) => obj.key === cur.value
                  );

                  navigation.navigate("Course", {
                    data: filteredArray,
                  });
                }}
              >
                <View style={{ flex: 0, justifyContent: "space-between" }}>
                  <View>
                    <Typography variant="h4" fontWeight={700}>
                      {cur.title}
                    </Typography>
                    <View style={{ marginTop: 10 }}>
                      <Typography color="#aaa">{cur.description}</Typography>
                    </View>
                  </View>
                </View>
                {/* <CourseCard
                  description={cur.courseDescription}
                  url={cur.image}
                  author={cur.authorName}
                  rating={4.8}
                  category={cur.category}
                  title={cur.courseTitle}
                /> */}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.Category}>
          <View style={styles.TopCoursesHeader}>
            <Typography variant="h5" fontWeight={600}>
              Your Course
            </Typography>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Allcourse", { data: allCourses });
              }}
            >
              <Typography variant="body2" fontWeight={600} color="#407BFF">
                See All
              </Typography>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal style={styles.CategoryContent}>
            {course?.map((cur, index) => (
              <TouchableOpacity
                style={{
                  backgroundColor:
                    themeState.mode === "light" ? "#f7f7f7" : "#222",

                  minHeight: 400,
                  width: Dimensions.get("screen").width - 30,
                  borderRadius: 6,
                  padding: 15,
                }}
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
                <View>
                  <Typography fontWeight={700} variant="h4">
                    Html / Css
                  </Typography>
                  <View
                    style={{
                      flex: 0,
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      marginTop: 30,
                    }}
                  >
                    <View>
                      <Typography variant="h6">Your Personal Task</Typography>
                      <View style={{ marginTop: 10 }}>
                        <Typography variant="h6">2/2 done</Typography>
                      </View>
                    </View>
                    <View>
                      <Typography variant="h6">Your Personal Task</Typography>
                      <View style={{ marginTop: 10 }}>
                        <Typography variant="h6">2/2 done</Typography>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{ marginTop: 40 }}>
                  <Typography variant="h6">Author</Typography>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Typography variant="h6">Jimoh Akeem Olawale</Typography>
                </View>
                <View
                  style={{
                    flex: 0,
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 5,
                    marginTop: 20,
                  }}
                >
                  <Ionicons name="ios-warning-outline" size={24} color="#000" />
                  <Typography variant="body1">
                    Please complete your task
                  </Typography>
                </View>
                <View
                  style={{
                    width: "100%",
                    padding: 0.3,
                    backgroundColor: "#f7f7f7",
                    marginTop: 30,
                  }}
                ></View>
                <View style={{ marginTop: 30 }}>
                  <Progress.Bar
                    progress={0.3}
                    width={Dimensions.get("screen").width - 60}
                  />
                  <View style={styles.row}>
                    <Typography variant="h6">Course Progress</Typography>
                    <Typography variant="h6">30%</Typography>
                  </View>
                </View>
                {/* <CourseCard
                  description={cur.courseDescription}
                  url={cur.image}
                  author={cur.authorName}
                  rating={4.8}
                  category={cur.category}
                  title={cur.courseTitle}
                /> */}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: {},
  ImageSlider: {},
  Category: {
    marginTop: 10,
  },
  CategoryHeader: {
    flex: 0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  TopCoursesHeader: {
    flex: 0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 60,
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
