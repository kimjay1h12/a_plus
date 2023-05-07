import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";

const { width } = Dimensions.get("window");

const data = [
  { id: "1", image: require("../assets/img/edu1.jpg") },
  { id: "2", image: require("../assets/img/edu2.jpg") },
  { id: "3", image: require("../assets/img/edu3.jpg") },
];

const ImageSlider = () => {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const currentIndex = event.nativeEvent.contentOffset.x / slideSize;
    setIndex(currentIndex);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const nextIndex = (index + 1) % data.length;
  //     flatListRef.current.scrollToIndex({ index: nextIndex });
  //     setIndex(nextIndex);
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [index]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image source={item.image} style={styles.image} resizeMode="cover" />
        )}
        onScrollToIndexFailed={({ index, averageItemLength }) => {
          // Layout doesn't know the exact location of the requested element.
          // Falling back to calculating the destination manually
          flatListRef.current?.scrollToOffset({
            offset: index * averageItemLength,
            animated: true,
          });
        }}
      />
      <View style={styles.pagination}>
        {data.map((_, i) => (
          <Text
            key={i}
            style={
              i === index ? styles.paginationActiveText : styles.paginationText
            }
          >
            ⬤
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width,
    height: 270,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    marginBottom: 30,
  },
  paginationText: {
    color: "white",
    margin: 3,
    opacity: 0.5,
  },
  paginationActiveText: {
    color: "white",
    margin: 3,
    opacity: 1,
  },
});

export default ImageSlider;
