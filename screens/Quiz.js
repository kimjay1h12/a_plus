import React, { useContext } from "react";

import { useForm, Controller } from "react-hook-form";
import { RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Typography from "../components/custom/Typography";
import CountdownTimer from "../components/custom/Coundown";
import { AntDesign } from "@expo/vector-icons";
import { GlobalContext } from "../context";
const courses = [
  {
    label: "Web Development",
    routes: "web",
  },
  {
    label: "Cyber Security",
    routes: "cyber",
  },
  {
    label: "Mobile Development",
    routes: "mobile",
  },
];

const Quiz = ({ navigation }) => {
  const { themeState } = useContext(GlobalContext);
  const { control, handleSubmit, setValue, formState } = useForm();
  const onSubmit = (data) => {
    let score = 0;
    quizData.forEach((question) => {
      if (data[question.question] === question.correctAnswer) {
        score++;
      }
    });
    navigation.navigate("ResultScreen", {
      score,
      totalQuestions: quizData.length,
    });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, padding: 5, backgroundColor: themeState.value }}
    >
      <View style={styles.container}>
        <View
          style={{
            flex: 0,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 40,
          }}
        >
          <AntDesign
            name="arrowleft"
            size={30}
            color={themeState.mode === "dark" ? "#fff" : "#000"}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Typography variant="h5" fontWeight={700} style={styles.header}>
            Quiz
          </Typography>
          <Typography variant="h5" fontWeight={700} style={styles.header}>
            8:00S
          </Typography>
        </View>
        <View>
          {courses.map((cur, i) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("questions", {
                  value: cur.routes,
                })
              }
              key={i}
              style={{
                backgroundColor:
                  themeState.mode === "light" ? "#f7f7f7" : "#222",

                height: 80,
                flex: 0,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
                borderRadius: 5,
              }}
            >
              <Typography variant="h5">{cur.label}</Typography>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  quizContainer: {
    flex: 1,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 0.4,
    borderStyle: "solid",
    borderColor: "#aaa",
    borderRadius: 10,
  },
  radioButtonLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: "#aaa",
    padding: 15,
    borderRadius: 8,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default Quiz;
