import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import Video from "react-native-video";

const VideosGallery = () => {
  const [isFullModeVisible, setFullModeVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoPlayerRef = useRef(null);

  const videoData = [
    { id: 1, url: "https://example.com/video1.mp4", title: "Video 1" },
    { id: 2, url: "https://example.com/video2.mp4", title: "Video 2" },
    // Add more videos to the data array
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.videoThumbnail}
        onPress={() => {
          setSelectedVideo(item.url);
          setFullModeVisible(true);
        }}
      >
        {/* You can use custom video thumbnail images here */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={videoData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />

      {/* Full Mode Video View */}
      <Modal visible={isFullModeVisible} animationType="fade">
        <TouchableOpacity
          style={styles.fullModeContainer}
          onPress={() => setFullModeVisible(false)}
        >
          <Video
            ref={videoPlayerRef}
            source={{ uri: selectedVideo }}
            style={styles.fullModeVideo}
            controls
            resizeMode="contain"
            paused={!isFullModeVisible}
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "#f0f0f0",
  },
  videoThumbnail: {
    width: "50%",
    aspectRatio: 16 / 9,
    marginBottom: 10,
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

export default VideosGallery;
