import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Typography from "../components/custom/Typography";
import { Feather } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { GlobalContext } from "../context";
import CourseCategoryCard from "../components/CourseCategoryCard";
import { child, get, getDatabase, ref } from "firebase/database";
import { app } from "../firebase";
import { useEffect } from "react";
function Search() {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
    // perform search logic here
  };
  const [searchParam, setSearchParam] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigation = useNavigation();
  const { themeState } = useContext(GlobalContext);
  const Search = () => {
    const dbRef = ref(getDatabase(app));
    get(child(dbRef, `courses`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const obj = snapshot.val();
          const arr = Object.keys(obj).map((key) => obj[key]);
          const array = arr.reverse();
          console.log(arr);
          const res = array.filter((word) =>
            word?.courseTitle?.includes(searchParam)
          );
          const res1 = array.filter((word) =>
            word?.Coursecode?.includes(searchParam)
          );
          setSearchResult([...res, ...res1]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    if (searchParam === "") {
      setSearchResult();
    } else {
      Search();
    }
  }, [searchParam]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeState.value }}>
      <ScrollView
        style={{ padding: 15 }}
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.header}>
          <AntDesign
            name="arrowleft"
            size={34}
            color={themeState.mode === "dark" ? "#fff" : "#407BFF"}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Typography variant="h5" fontWeight={700} color="#407BFF">
            Search
          </Typography>
          <Text></Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
            borderRadius: 10,
            paddingVertical: 18,
            paddingHorizontal: 12,
            borderWidth: 1,
            marginTop: 40,
          }}
        >
          <Feather name="search" size={20} color="#407BFF" />
          <TextInput
            style={{
              flex: 1,
              marginLeft: 10,
              color: themeState.mode === "dark" ? "#222" : "#fff",
            }}
            placeholder="Course Name and course code"
            placeholderTextColor={
              themeState.mode === "dark" ? "#fff" : "#407BFF"
            }
            value={searchParam}
            onChangeText={(e) => {
              setSearchParam(e);
            }}
          />
        </View>
        <View style={{ marginTop: 40 }}>
          {searchResult?.map((cur, index) => (
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
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderWidth: 1,
    marginTop: 40,
  },
  header: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" ? 24 : 0,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: "#407BFF",
  },
});
export default Search;
