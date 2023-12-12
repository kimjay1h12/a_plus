import React, { useContext } from "react";

import { useForm, Controller } from "react-hook-form";
import { RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Typography from "../components/custom/Typography";
import CountdownTimer from "../components/custom/Coundown";
import { AntDesign } from "@expo/vector-icons";
import { GlobalContext } from "../context";
const quizData = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<script>", "<javascript>", "<div>", "<text>"],
    correctAnswer: "<script>",
  },
  {
    question:
      "What is the correct JavaScript syntax to change the content of the HTML element below? <p >This is a demonstration.</p>",
    options: ["html", "javascript", "react", "js"],
    correctAnswer: "Jupiter",
  },
  // Add more questions here
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
    <SafeAreaView style={{ flex: 1, padding: 15 }}>
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
          <Typography variant="h4" fontWeight={700} style={styles.header}>
            Quiz
          </Typography>
          <CountdownTimer initialTime={500} onTimerComplete={onSubmit} />
        </View>

        <View style={styles.quizContainer}>
          {quizData.map((question, index) => (
            <View key={index} style={styles.questionContainer}>
              <View
                style={{
                  flex: 0,
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 2,
                  padding: 1,
                }}
              >
                <Typography variant="h6" fontWeight={700}>
                  ({index + 1})
                </Typography>
                <Typography variant="h6">{question.question}</Typography>
              </View>
              <View>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      {question.options.map((option) => (
                        <TouchableOpacity
                          onPress={() => onChange(option)}
                          key={option}
                          style={styles.radioButtonContainer}
                        >
                          <RadioButton
                            value={option}
                            status={value === option ? "checked" : "unchecked"}
                            onPress={() => onChange(option)}
                          />
                          <Text style={styles.radioButtonLabel}>{option}</Text>
                        </TouchableOpacity>
                      ))}
                    </>
                  )}
                  name={question.question}
                  defaultValue=""
                />
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.submitButtonText} disabled>
            Submit
          </Text>
        </TouchableOpacity>
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
