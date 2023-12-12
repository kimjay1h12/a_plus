import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Video } from "expo-av";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  View,
} from "react-native";
import { ScaledSheet, vs } from "react-native-size-matters";
const VideoPlayer = ({ uri, videoStyles = {}, isCurrent, style }) => {
  const videoRef = useRef();
  const [isBuffering, setIsBuffering] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sizes, setSizes] = useState({ height: vs(250), width: 0 });

  // useEffect(() => {
  //   if (isCurrent) {
  //     videoRef.current?.playAsync();
  //   } else {
  //     videoRef.current?.pauseAsync();
  //   }
  // }, [isCurrent]);

  useFocusEffect(
    useCallback(() => {
      if (isCurrent) {
        videoRef.current?.playAsync();
      } else {
        videoRef.current?.pauseAsync();
      }
      return () => {
        videoRef.current?.pauseAsync();
      };
    }, [isCurrent])
  );

  const onPlaybackStatusUpdate = (status) => {
    // console.log("stat", status);
    setIsBuffering(status.isBuffering);
    setIsMuted(status.isMuted);
    setIsPlaying(status.isPlaying);
  };

  const styles = ScaledSheet.create({
    root: {
      overflow: "hidden",
      maxHeight: Dimensions.get("window").height / 1.3,
      ...style,
    },
    controls: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
    buffer: {
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      position: "absolute",
      backgroundColor: "#0002",
    },
    control_buttons: {
      paddingHorizontal: 10,
      paddingVertical: 15,
      marginTop: "auto",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });
  return (
    <View style={styles.root}>
      <Video
        style={{ height: sizes.height, width: "100%", ...videoStyles }}
        resizeMode="cover"
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        onLoadStart={() => setIsBuffering(true)}
        onLoad={() => setIsBuffering(false)}
        source={{ uri }}
        onReadyForDisplay={(e) => {
          const { width, height } = e.naturalSize;
          setSizes({
            height: height * (Dimensions.get("screen").width / width),
            width: width,
          });
        }}
        isLooping
        ref={videoRef}
      />
      <View style={styles.controls}>
        {isBuffering && (
          <View style={styles.buffer}>
            <ActivityIndicator size="large" color="#eee" />
          </View>
        )}
        <Ionicons
          style={{ alignSelf: "flex-end", marginTop: 10, marginRight: 10 }}
          name="videocam"
          color="#fff"
          size={28}
        />

        <View style={styles.control_buttons}>
          <TouchableOpacity
            onPress={() =>
              videoRef.current[isPlaying ? "pauseAsync" : "playAsync"]()
            }
          >
            <Ionicons
              color="#fff"
              size={24}
              name={isPlaying ? "pause" : "play"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => videoRef.current.setIsMutedAsync(!isMuted)}
          >
            <Ionicons
              color="#fff"
              size={24}
              name={isMuted ? "volume-off" : "volume-high"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default VideoPlayer;
