import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useContext } from "react";
import { GlobalContext } from "../../context";
import Typography from "../../components/custom/Typography";
import { useNavigation } from "@react-navigation/core";
import { Categories } from "../../utility";

function AllCategories() {
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
            color="#fff"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Typography variant="h5" fontWeight={700} color="#407BFF">
            Category
          </Typography>
          <Text></Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 50,
          }}
        >
          {Categories.map((cur, index) => (
            <TouchableOpacity key={index}>
              <View style={styles.CategoryCard}>
                <Text style={{ marginBottom: 10 }}>
                  <Entypo name="book" size={34} color="#407BFF" />
                </Text>
                <Typography
                  active={false}
                  variant="h6"
                  fontWeight={600}
                  color={themeState.mode === "dark" ? "#fff" : "#407BFF"}
                >
                  {cur}
                </Typography>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: {},
  header: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
  },
  CategoryCard: {
    backgroundColor: "#fff",
    minHeight: 120,
    shadowColor: "#fff",
    flex: 0,
    marginTop: 20,
    width: 110,
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    marginRight: 10,
  },
});
export default AllCategories;
