import React, { useContext } from "react";

import { useForm, Controller } from "react-hook-form";
import { RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Typography from "../../components/custom/Typography";
import CountdownTimer from "../../components/custom/Coundown";
import { AntDesign } from "@expo/vector-icons";
import { GlobalContext } from "../../context";
import { ScrollView } from "react-native";
import Button from "../../components/custom/Button";

const Questions = ({ navigation, route }) => {
  const data = route?.params?.value;

  console.log(data);
  const { themeState } = useContext(GlobalContext);
  const quizData =
    data === "web"
      ? [
          {
            question:
              "Which is a server-side technology that allows tracking of data for all users of an application?",
            options: [
              "View State",
              "Session State",
              "Control State",
              "Application State",
            ],
            correctAnswer: "Application State",
          },
          {
            question:
              "Which is a client-side technology that saves data on a web page between refreshes?  It saves the state of the form and controls between postback page refreshes",
            options: [
              "Application State",
              "Control State",
              "View State",
              "Session State",
            ],
            correctAnswer: "View State",
          },
          {
            question:
              "Which technology is a client-side technology and allows a control to continue functioning even when the ViewState property is turned off?",
            options: [
              "Application State",
              "Control State",
              "View State",
              "Session State",
            ],
            correctAnswer: "Control State",
          },
          {
            question: "What alters the layout of a web page?",
            options: ["XML", "XHTML", "CSS", "JavaScript"],
            correctAnswer: "CSS",
          },
          {
            question:
              "Which image tag is required for strict XHTML compliance?  It specifies text to be displayed whilst the image is loading which shows on the web page particularly if there is a slow connection and the image takes a long time to load",
            options: ["Jpg", "Img", "Src", "Alt"],
            correctAnswer: "Alt",
          },
          {
            question:
              "Which technologies can be used to initialise variables etc on a page?",
            options: [
              "Global.asax",
              "Page_Load",
              "Application_Start",
              "DTD Validation",
            ],
            correctAnswer: "Application_Start",
          },
          {
            question:
              "Which is a read-only control that a user cannot modify directly, but the contents of which may be changed programatically if required?",
            options: ["ListBox", "TextBox", "Label", "ComboBox"],
            correctAnswer: "Label",
          },
          {
            question: "What is used to make sure the user input is correct?",
            options: [
              "XHTML",
              "Validation",
              "Cross-page posting",
              "Javascript",
            ],
            correctAnswer: "Validation",
          },

          // Add more questions here
        ]
      : data === "cyber"
      ? [
          {
            question: "What are two types of network layer firewalls?",
            options: [
              "Stateful and stateless",
              "Dynamic and static",
              "Anomaly and signature",
              "Mandatory and discretionary",
            ],
            correctAnswer: "Stateful and stateless",
          },
          {
            question:
              "Which of the following attacks requires a carrier file to self-replicate?",
            options: ["Trojan", "Virus", "Worm", "Spam"],
            correctAnswer: "Virus",
          },
          {
            question: "Which of the following uses asymmetric key encryption?",
            options: ["AES", "PGP", "3DES", "RC5"],
            correctAnswer: "PGP",
          },
          {
            question:
              "Which of the following offers the strongest wireless signal encryption?",
            options: ["WEP", "WAP", "WIPS", "WPA"],
            correctAnswer: "WPA",
          },
          {
            question:
              "Which of the following describes asymmetric key encryption?",
            options: [
              "Consists of a private signing key and a public verification key",
              "The sender and receiver must securely share a key.",
              "Cannot be used for non-repudiation purposes",
              "Cannot be used for sender authentication",
            ],
            correctAnswer:
              "Consists of a private signing key and a public verification key",
          },
          {
            question: "Which of the following is NOT a type of virus?",
            options: ["Tunneling", "Boot sector", "Macro", "Wrapper"],
            correctAnswer: "Wrapper",
          },

          // Add more questions here
        ]
      : [
          ({
            question: "What are two types of network layer firewalls?",
            options: [
              "Stateful and stateless",
              "Dynamic and static",
              "Anomaly and signature",
              "Mandatory and discretionary",
            ],
            correctAnswer: "<script>",
          },
          {
            question:
              "Which of the following attacks requires a carrier file to self-replicate?",
            options: ["Trojan", "Virus", "Worm", "Spam"],
            correctAnswer: "Virus",
          }),

          // Add more questions here
        ];

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
  console.log(formState);

  return (
    <SafeAreaView
      style={{ flex: 1, padding: 15, backgroundColor: themeState.value }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
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
                    paddingRight: 18,
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
                              status={
                                value === option ? "checked" : "unchecked"
                              }
                              onPress={() => onChange(option)}
                            />
                            <Typography style={styles.radioButtonLabel}>
                              {option}
                            </Typography>
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
          <Button title="Submit" onPress={handleSubmit(onSubmit)} fullWidth />
        </View>
      </ScrollView>
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

export default Questions;
