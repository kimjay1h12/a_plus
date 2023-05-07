import React, { useRef, useEffect } from "react";
import { Animated, Text, View } from "react-native";

const Amination = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,

      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      animation="bounceInLeft"
      // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};
export default Amination;
