import {
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import Typography from "./custom/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import Avatar from "./custom/Avatar";
import { useContext, useState } from "react";
import { GlobalContext } from "../context";

function CourseCard({ category, description, rating, url, author, title }) {
  const [liked, setLiked] = useState(false);
  const { themeState, themeDispatch } = useContext(GlobalContext);
  return (
    <View
      style={{
        flex: 0,
        marginRight: 14,
        backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
      }}
    >
      {url ? (
        <Image style={styles.image} source={{ uri: url }} />
      ) : (
        <Image
          style={{
            width: 270,
            height: 220,
            borderTopRightRadius: 10,
            resizeMode: "contain",
            borderTopLeftRadius: 10,
            backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
          }}
          source={require("../assets/img/file.png")}
        />
      )}
      <View
        style={{
          background: themeState.mode === "dark" ? "#222" : "#fff",
          padding: 10,
          width: 270,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      >
        <View style={styles.contentheader}>
          <View style={{ flex: 0, alignItems: "center", flexDirection: "row" }}>
            {liked ? (
              <MaterialIcons
                name="favorite"
                size={24}
                color="black"
                style={{ marginRight: 8 }}
                onPress={() => {
                  setLiked(!liked);
                }}
              />
            ) : (
              <MaterialIcons
                style={{ marginRight: 8 }}
                name="favorite-border"
                size={24}
                color="black"
                onPress={() => {
                  setLiked(!liked);
                }}
              />
            )}

            <Typography active={false} variant="body1" fontWeight={700}>
              {title}
            </Typography>
          </View>
          <View style={{ flex: 0, alignItems: "center", flexDirection: "row" }}>
            <Entypo
              name="star"
              size={18}
              color="#f90"
              style={{ marginRight: 4 }}
            />
            <Typography color="#102660" active={false}>
              {rating}
            </Typography>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Typography variant="body1" color="#102660" active={false}>
            {category}
          </Typography>
          <Typography variant="h6" color="#102660" active={false}>
            {description}
          </Typography>
        </View>
        <View
          style={{
            marginTop: 10,
            flex: 0,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <Avatar src={require("../assets/img/avatar.jpg")} />
          <Typography
            variant="h6"
            fontWeight={700}
            color="#102660"
            active={false}
          >
            {author}
          </Typography>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  contentheader: {
    marginTop: 5,
    flex: 0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 270,
    height: 220,
    borderTopRightRadius: 10,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
  },
});
export default CourseCard;
