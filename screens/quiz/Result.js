import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import Typography from "../../components/custom/Typography";
import { View } from "react-native";
import { Image } from "react-native";
import { GlobalContext } from "../../context";
import { TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import Button from "../../components/custom/Button";

function Result({ route, navigation }) {
  const data = route.params;
  console.log(data, "results");
  const { themeState } = useContext(GlobalContext);
  return (
    <SafeAreaView
      style={{ flex: 1, padding: 10, backgroundColor: themeState.value }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Image
          style={{
            width: "100%",
            maxHeight: Dimensions.get("screen").height - 300,
            resizeMode: "contain",
          }}
          source={require("../../assets/img/result.png")}
        />
        <View
          style={{
            flex: 0,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: themeState.mode === "light" ? "#f7f7f7" : "#222",
              width: "45%",
              height: 80,
              flex: 0,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
              borderRadius: 5,
              padding: 10,
            }}
          >
            <Typography variant="h5">Total Scores</Typography>
            <Typography variant="h5">{data.score}</Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: themeState.mode === "light" ? "#f7f7f7" : "#222",
              width: "45%",
              height: 80,
              flex: 0,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
              borderRadius: 5,
              padding: 10,
            }}
          >
            <Typography variant="h5">Questions</Typography>
            <Typography variant="h5">{data.totalQuestions}</Typography>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: Dimensions.get("screen").width - 20,
            flex: 0,
            gap: 8,
          }}
        >
          <Button
            title="Retake Quiz"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Button
            title="Go Home"
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Result;
