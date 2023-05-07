import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Typography from "../../components/custom/Typography";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useContext } from "react";
import { GlobalContext } from "../../context";

import { useNavigation } from "@react-navigation/core";
import CourseCategoryCard from "../../components/CourseCategoryCard";
import { useState } from "react";
import { useEffect } from "react";
import { child, get, getDatabase, ref } from "firebase/database";
import { app } from "../../firebase";
function Allcourses({ route }) {
  const [allCourses, setAllCourses] = useState();
  const GetCourses = () => {
    const dbRef = ref(getDatabase(app));
    get(child(dbRef, `courses`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const obj = snapshot.val();

          const arr = Object.keys(obj).map((key) => ({
            ...obj[key],
            key,
          }));
          const array = arr.reverse();
          setAllCourses(array);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    GetCourses();
  }, []);

  const data = allCourses;
  console.log(data);
  const { themeState } = useContext(GlobalContext);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: themeState.value }}>
      <ScrollView
        style={{
          padding: 18,
          backgroundColor: themeState.value,
          height: "100%",
        }}
      >
        <View style={styles.header}>
          <AntDesign
            name="arrowleft"
            size={24}
            color={themeState.mode === "dark" ? "#fff" : "#102660"}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Typography variant="h5" fontWeight={700} color="#102660">
            Course
          </Typography>
          <Text></Text>
        </View>
        <View style={{ marginTop: 40 }}>
          {data?.map((cur, index) => (
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
              <CourseCategoryCard
                image={cur.image}
                key={index}
                title={cur.courseTitle}
                description={cur.courseDescription}
                coursecode={cur.Coursecode}
                userKey={cur.userkey}
                postKey={cur.key}
              />
            </TouchableOpacity>
          ))}
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
});
export default Allcourses;
