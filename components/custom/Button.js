import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet, moderateScale } from "react-native-size-matters";
import { GlobalContext } from "../../context";
import colors from "../../theme/colors";
import Typography from "./Typography";

export function LinkButton({
  title,
  style = {},
  color = "blue",
  fontSize = 12,
  disabled,
  onPress = () => {},
}) {
  const { themeState } = React.useContext(GlobalContext);

  const styles = ScaledSheet.create({
    text: {
      fontSize: moderateScale(fontSize),
      fontWeight: "700",
      color: disabled ? "#777" : colors(themeState.value)[color].main,
    },
  });
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text style={{ ...styles.text, ...style }}>{title}</Text>
    </TouchableOpacity>
  );
}

export const IconButton = ({
  style = {},
  color = "dark",
  disabled,
  icon,
  elevation,
  bg = false,
  size = 24,
  badge,
  containerStyles = {},
  onPress = () => {},
}) => {
  const { themeState } = React.useContext(GlobalContext);

  const styles = ScaledSheet.create({
    container: {
      alignSelf: "flex-start",
      flexGrow: 0,
      backgroundColor: bg
        ? colors(themeState.value).white[1]
        : elevation > 0
        ? colors(themeState.value).white[1]
        : null,
      padding: "5@ms",
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: {
        height: 1,
        width: 0,
      },
      shadowRadius: elevation,
      elevation: elevation,
      borderRadius: 50,
    },
    text: {
      color: disabled ? "#777" : colors(themeState.value)[color].main,
    },
    badge: {
      borderRadius: 20,
      height: 20,
      width: 20,
      backgroundColor: colors(themeState.value).primary.main,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 0,
      right: 0,
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.3}
      style={{ ...styles.container, ...containerStyles }}
    >
      <MaterialIcons
        style={{ ...styles.text, ...style }}
        name={icon}
        size={size}
      />

      {badge > 0 && (
        <View style={styles.badge}>
          <Typography fontWeight={700} style={{ fontSize: 10, color: "#fff" }}>
            {badge}
          </Typography>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function Button({
  elevation = 0,
  onPress = () => {},
  disabled = false,
  title,
  loading,
  size,
  rounded = false,
  gutterBottom,
  style = {},
  fullWidth = false,
  translucent = false,
  color = "primary",
  variant = "contained",
  start,
  end,
  textStyles = {},
}) {
  const { themeState } = React.useContext(GlobalContext);
  const styles = ScaledSheet.create({
    con: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:
        variant === "text" || variant === "outlined"
          ? null
          : translucent
          ? translucent === "dark"
            ? colors(themeState.value).white[3] + "2"
            : colors(themeState.value).black[3] + "2"
          : loading
          ? colors(themeState.value)[color].light
          : disabled
          ? colors(themeState.value).white[4]
          : colors(themeState.value)[color].main,
      borderRadius: rounded ? 30 : 10,
      elevation: variant === "text" ? 0 : elevation,
      paddingVertical: size === "small" ? 8 : "13@ms",
      paddingHorizontal: size === "small" ? "10@ms" : "18@ms",
      borderColor: colors(themeState.value)[color].main,
      borderWidth: variant === "outlined" ? 1 : 0,
      shadowColor: "#000",
      shadowRadius: elevation,
      marginBottom: gutterBottom,
      shadowOffset: {
        height: elevation / 2,
        width: 0,
      },
      shadowOpacity: variant === "text" ? 0 : 0.1,
      width: fullWidth ? "100%" : null,
      ...style,
    },
    text: {
      color: disabled
        ? variant === "text" || variant === "outlined"
          ? colors(themeState.value).black[1]
          : colors(themeState.value)[color].text
        : colors(themeState.value)[color][
            variant === "text" || variant === "outlined" ? "main" : "text"
          ],
      fontWeight: variant === "outlined" ? "700" : "600",
      fontSize: size === "small" ? "12@ms" : "16@ms",
      ...textStyles,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={styles.con}>
      {start}
      {loading && (
        <ActivityIndicator
          size="small"
          color={colors(themeState.value)[color].text}
          style={{ marginRight: 10 }}
        />
      )}
      <Text style={styles.text}>{title}</Text>
      {end}
    </TouchableOpacity>
  );
}
