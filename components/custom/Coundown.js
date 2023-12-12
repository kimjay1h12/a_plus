import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Typography from "./Typography";

const CountdownTimer = ({ initialTime, onTimerComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    let interval = null;
    if (timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      onTimerComplete();
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeRemaining, onTimerComplete]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Typography>Remain Time</Typography>
      <Typography style={styles.timerText}>
        {formatTime(timeRemaining)}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CountdownTimer;
