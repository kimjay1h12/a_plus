import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FlatList, Modal } from "react-native";

import Typography from "../../components/custom/Typography";
import { GlobalContext } from "../../context";
import { ResizeMode, Video } from "expo-av";
import { Image } from "react-native";
import Button from "../../components/custom/Button";
import VideoPlayer from "../../components/VideoPlayer";
import { removeObjectsWithoutParameter } from "../../utility";
import PDFPreloader from "../../components/custom/PdfPreview";

function Course({ route }) {
  const [loading, setLoading] = useState(false);
  const data = route.params.data;

  const { themeState } = useContext(GlobalContext);
  const navigation = useNavigation();
  const [active, setActive] = useState(false);
  const [fileUri, setFileUri] = useState("");
  const [array, setArray] = useState([]);
  useEffect(() => {
    data.forEach((obj) => {
      const arr = Object?.keys(obj).map((key) => ({ ...obj[key] }));
      const dat = removeObjectsWithoutParameter(arr, "courseTitle");

      console.log("data", dat);
      setArray(dat);
    });
  }, [data]);

  const [isFullModeVisible, setFullModeVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoPlayerRef = useRef(null);
  const documents = [
    {
      title: "Lecture 1",
      url: "",
    },
    {
      title: "Lecture 2",
      url: "",
    },
    {
      title: "Lecture 3",
      url: "",
    },
  ];
  const videoData = [
    {
      id: 1,
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      title: "Video 1",
    },
    {
      id: 2,
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      title: "Video 2",
    },
    // Add more videos to the data array
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.videoThumbnail,
          {
            borderColor: themeState.mode === "light" ? "#000" : "#aaa",
          },
        ]}
        onPress={() => {
          setSelectedVideo(item.url);
          setFullModeVisible(true);
        }}
      >
        <Image
          source={require("../../assets/img/video3.png")}
          style={{ width: 200, height: 250, resizeMode: "contain" }}
        />
        <View
          style={{
            flex: 0,
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingRight: 2,
          }}
        >
          <AntDesign
            name="playcircleo"
            size={24}
            color={themeState.mode === "light" ? "#000" : "#aaa"}
          />
        </View>
        {/* You can use custom video thumbnail images here */}
      </TouchableOpacity>
    );
  };
  const closeFullMode = () => {
    setFullModeVisible(false);
    setSelectedVideo(null);
  };
  const cancelFullMode = () => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.dismissFullscreenPlayer();
    }
  };
  const onChangeFullscreen = (event) => {
    const { isFullscreen } = event.nativeEvent;
    if (!isFullscreen) {
      closeFullMode();
    }
  };

  const onFullscreenPlayerDidDismiss = () => {
    closeFullMode();
  };
  console.log("dataaaa", data);
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
            size={28}
            color={themeState.mode === "dark" ? "#fff" : "#000"}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Typography variant="h5" fontWeight={700}>
            {array[0]?.courseCategory}
          </Typography>
          <Text></Text>
        </View>

        <View style={{ marginTop: 50 }}>
          {/* <Typography variant="h6">
            HTML is the standard markup language for Web pages. With HTML you
            can create your own Website. HTML is easy to learn - You will enjoy
            it!
          </Typography>

          <Typography variant="h6">
            In this HTML course, you will find more than 20 documents and 40
            Videos to help you
          </Typography> */}
        </View>
        {array?.map((cur, i) => (
          <View key={i}>
            <View
              style={{
                flex: 0,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#000",
                borderStyle: "solid",
                marginTop: 40,
              }}
            >
              <Typography variant="h5" fontWeight={700}>
                {cur.courseTitle}
              </Typography>
            </View>

            <View style={styles.Switch}>
              <TouchableOpacity
                style={
                  active
                    ? styles.SwitchButtonNotActive
                    : styles.SwitchButtonActive
                }
                onPress={() => {
                  setActive(!active);
                }}
              >
                <Text
                  style={
                    active
                      ? styles.SwitchButtonText
                      : styles.SwitchButtonTextNotActive
                  }
                >
                  Documents
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  active
                    ? styles.SwitchButtonActive
                    : styles.SwitchButtonNotActive
                }
                onPress={() => {
                  setActive(!active);
                }}
              >
                <Text
                  style={
                    active
                      ? styles.SwitchButtonTextActive
                      : styles.SwitchButtonText
                  }
                >
                  Videos
                </Text>
              </TouchableOpacity>
            </View>
            {active ? (
              <View
                style={{
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    flex: 0,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography fontWeight={700} variant="h5">
                    Videos
                  </Typography>
                </View>
                <View>
                  <View style={styles.container}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      {cur.videos?.map((item, i) => (
                        <TouchableOpacity
                          key={i}
                          style={[
                            styles.videoThumbnail,
                            {
                              borderColor:
                                themeState.mode === "light" ? "#000" : "#aaa",
                            },
                          ]}
                          onPress={() => {
                            setSelectedVideo(item);
                            setFullModeVisible(true);
                          }}
                        >
                          <Video
                            ref={videoPlayerRef}
                            source={{ uri: item }}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: 15,
                            }}
                            useNativeControls
                            resizeMode={ResizeMode.COVER}
                            isLooping
                          />

                          {/* You can use custom video thumbnail images here */}
                        </TouchableOpacity>
                      ))}
                    </ScrollView>

                    {/* Full Mode Video View */}
                    {/* <Modal visible={isFullModeVisible} animationType="fade">
                      <View style={styles.fullModeContainer}>
                        <Video
                          ref={videoPlayerRef}
                          source={{ uri: selectedVideo }}
                          style={styles.fullModeVideo}
                          useNativeControls
                          resizeMode={ResizeMode.CONTAIN}
                          isLooping
                          shouldPlay={isFullModeVisible}
                          paused={!isFullModeVisible}
                        />
                        <TouchableOpacity
                          style={styles.cancelButton}
                          onPress={closeFullMode}
                        >
                          <Text style={styles.cancelButtonText}>
                            Cancel Full Mode
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </Modal> */}
                  </View>
                </View>
              </View>
            ) : (
              <View style={{ marginTop: 20 }}>
                <View>
                  <View
                    style={{
                      flex: 0,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Typography fontWeight={700} variant="h5">
                      Documents
                    </Typography>
                  </View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {cur.document?.map((item, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.videoThumbnail,
                          {
                            borderColor:
                              themeState.mode === "light" ? "#000" : "#aaa",
                            padding: 10,
                          },
                        ]}
                        onPress={() => {
                          Linking.openURL(item);
                        }}
                      >
                        <PDFPreloader pdfUrl={item} />
                        <View
                          style={{
                            flex: 0,
                            alignItems: "center",
                            flexDirection: "column",
                            justifyContent: "center",
                            paddingRight: 2,
                          }}
                        >
                          <View style={{ marginBottom: 3 }}>
                            <Typography variant="h6" fontWeight={700}>
                              {item.title}
                            </Typography>
                          </View>
                        </View>
                        {/* You can use custom video thumbnail images here */}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            )}
          </View>
        ))}
        <View style={{ marginTop: 40, marginBottom: 40 }}>
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.ButtonText}>Take Quiz</Text>
          </TouchableOpacity>
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
  ButtonText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 20,
    fontWeight: "700",
  },
  SwitchButtonText: {
    color: "#000",
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 20,
    fontWeight: "700",
  },
  SwitchButtonTextActive: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 20,
    fontWeight: "700",
  },
  SwitchButtonTextNotActive: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 20,
    fontWeight: "700",
  },
  Switch: {
    flex: 0,
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  Button: {
    height: 50,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#407BFF",

    borderRadius: 5,

    border: "none",
  },
  SwitchButton: {
    height: 50,
    width: "50%",
    flex: 0,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#f7f7f7",
  },
  SwitchButtonNotActive: {
    height: 50,
    width: "50%",
    flex: 0,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#f7f7f7",
  },
  SwitchButtonActive: {
    height: 50,
    width: "50%",
    flex: 0,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#407BFF",
  },
  Button: {
    height: 50,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#407BFF",

    borderRadius: 5,
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 30,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  cancelButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  videoThumbnail: {
    minWidth: 200,
    minHeight: 250,
    marginRight: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 20,
  },
  fullModeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  fullModeVideo: {
    width: "100%",
    height: "100%",
  },
});
export default Course;
