import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useRef, useState } from "react";
import { Animated, TextInput, TouchableOpacity, View } from "react-native";
import {
  moderateScale,
  ScaledSheet,
  verticalScale,
} from "react-native-size-matters";
import { GlobalContext } from "../../context";
import SelectMenu from "./SelectMenu";
import { Ionicons } from "@expo/vector-icons";
import Typography from "./Typography";
import Colors from "../../theme/colors";

const TextField = ({
  label,
  keyboardType,
  variant,
  color = "primary",
  value,
  type,
  helperText,
  onChangeText,
  onSubmitEditing = () => {},
  onFocus = () => {},
  onBlur = () => {},
  error,
  start,
  rounded,
  disabled = false,
  style = {},
  inputStyles = {},
  gutterBottom = 0,
  end,
  options,
  ...props
}) => {
  const { themeState } = useContext(GlobalContext);
  const colors = Colors(themeState.value);
  const [focused, setFocused] = useState(false);

  const labelAnim = useRef(new Animated.Value(0)).current;

  const height = moderateScale(variant === "text" ? 50 : 45);

  React.useEffect(() => {
    if (focused || value || start) {
      Animated.timing(labelAnim, {
        toValue: verticalScale(variant === "text" ? 2 : 4),
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(labelAnim, {
        toValue: height / moderateScale(variant === "text" ? 2.5 : 3.2),
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [focused, start, value]);
  const styles = ScaledSheet.create({
    root: {
      marginBottom: gutterBottom + "@vs",
      width: "100%",
      ...style,
    },
    container: {
      height: height,
      overflow: "hidden",

      backgroundColor:
        variant === "outlined" || variant === "text"
          ? "#fff0"
          : focused
          ? colors.white[3]
          : colors.white[4],
      flexDirection: "row",
      borderColor: error
        ? colors.error.main
        : focused
        ? colors[color].main
        : colors.textSecondary.main,
      borderWidth: error ? 1 : variant === "outlined" ? (focused ? 2 : 0.5) : 0,
      borderBottomWidth: variant === "text" ? 0.5 : undefined,
      width: "100%",
      borderRadius: variant === "text" ? 0 : rounded ? 30 : 7,
      alignItems: "center",
      ...inputStyles,
    },
    input: {
      fontSize: "14@s",
      flex: 1,
      alignSelf: "stretch",
      paddingLeft: variant === "text" ? 0 : moderateScale(15),
      paddingRight: moderateScale(10),
      paddingTop: "11@vs",
      color: colors.black[1],
      zIndex: 10,
      // backgroundColor: "#284",
    },
    inputText: {
      fontSize: "14@ms",
      flex: 1,
      paddingLeft: variant === "text" ? 0 : moderateScale(15),
      paddingTop: "13@ms",
    },
    label: {
      position: "absolute",
      left: variant === "text" ? 0 : moderateScale(15),
      fontSize: focused || value ? "10@s" : "13@s",
      color: focused ? colors[color].main : colors.textSecondary.main,
    },
    helperText: {
      paddingHorizontal: "15@s",
      flex: 1,
      color: focused ? colors[color].dark : colors.textSecondary.main,
      paddingTop: "4@ms",
    },
    error: {
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5,
      flexDirection: "row",
      alignItems: "center",
    },
    errorText: {
      fontSize: 12,
      marginLeft: 10,
    },
  });
  const formProps =
    type === "email"
      ? {
          textContentType: "emailAddress",
          keyboardType: "email-address",
          autoCapitalize: "none",
          autoCompleteType: "email",
        }
      : type === "number"
      ? {
          keyboardType: "numeric",
        }
      : type === "tel"
      ? {
          textContentType: "telephoneNumber",
          keyboardType: "phone-pad",
        }
      : type === "search"
      ? {
          keyboardType: "web-search",
          returnKeyType: "search",
          autoCapitalize: "none",
        }
      : type === "password"
      ? {
          secureTextEntry: true,
          autoCompleteType: "password",
          autoCapitalize: "none",
          textContentType: "password",
        }
      : {};
  return (
    <>
      <View style={styles.root}>
        <TouchableOpacity
          onPress={() => setFocused(true)}
          style={styles.container}
        >
          <Animated.Text style={{ ...styles.label, top: labelAnim }}>
            {label}
          </Animated.Text>
          {start}
          {options ? (
            <View
              style={{ flex: 1, alignItems: "center", flexDirection: "row" }}
            >
              {options.find((cur) => cur.value === value)?.start && (
                <View
                  style={{
                    paddingTop: variant !== "outlined" ? ms(13) : 0,
                    paddingRight: 10,
                  }}
                >
                  {options.find((cur) => cur.value === value)?.start}
                </View>
              )}

              <Typography style={styles.inputText}>
                {options.find((cur) => cur.value === value)?.label}
              </Typography>
            </View>
          ) : (
            <TextInput
              onFocus={() => {
                onFocus();
                setFocused(true);
              }}
              onBlur={() => {
                onBlur();
                setFocused(false);
              }}
              value={value}
              onChangeText={onChangeText}
              keyboardType={keyboardType}
              editable={!disabled}
              selectTextOnFocus={!disabled}
              onSubmitEditing={onSubmitEditing}
              {...formProps}
              {...props}
              style={styles.input}
            />
          )}
          {end && <View style={{ marginRight: 20 }}>{end}</View>}
          {options && (
            <View style={{ marginRight: 20 }}>
              <Ionicons
                name="chevron-down"
                color={colors.textSecondary.main}
                size={24}
              />
            </View>
          )}
        </TouchableOpacity>
        {helperText && (
          <Typography
            color="textSecondary"
            style={styles.helperText}
            variant="caption"
          >
            {helperText}
          </Typography>
        )}
        {error && (
          <View style={styles.error}>
            <MaterialIcons name="error" color={colors.error.main} size={16} />
            <Typography style={styles.errorText} color="error">
              {error}
            </Typography>
          </View>
        )}
      </View>
      {options && (
        <SelectMenu
          options={options}
          value={value}
          open={focused}
          onClose={() => setFocused(false)}
          label={label}
          helperText={helperText}
          onChange={onChangeText}
        />
      )}
    </>
  );
};

export const TextField2 = ({
  label,
  keyboardType,
  variant,
  color = "primary",
  value,
  type,
  helperText,
  onChangeText,
  onSubmitEditing = () => {},
  onFocus = () => {},
  onBlur = () => {},
  error,
  start,
  rounded,
  disabled = false,
  style = {},
  inputStyles = {},
  gutterBottom = 8,
  end,
  options,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const colors = Colors;
  const labelAnim = useRef(new Animated.Value(0)).current;

  const height = moderateScale(50);

  React.useEffect(() => {
    if (focused || value || start) {
      Animated.timing(labelAnim, {
        toValue: verticalScale(5),
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(labelAnim, {
        toValue: height / moderateScale(3),
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [focused, start, value]);
  const { themeState } = React.useContext(GlobalContext);
  const styles = ScaledSheet.create({
    root: {
      marginBottom: gutterBottom + "@vs",
      ...style,
    },
    container: {
      height: height,
      overflow: "hidden",
      backgroundColor: "#f2f2f2",
      flexDirection: "row",

      borderColor: error
        ? colors(themeState.value).error.main
        : focused
        ? colors(themeState.value)[color].main
        : colors(themeState.value).white[5],
      borderWidth: error ? 1 : focused ? 2 : 0,
      width: "100%",
      borderRadius: rounded ? 30 : 7,
      alignItems: "center",
      ...inputStyles,
    },
    input: {
      fontSize: "14@s",
      flex: 1,
      alignSelf: "stretch",
      paddingLeft: moderateScale(15),
      paddingRight: moderateScale(10),

      color: "#000",
      zIndex: 10,

      // backgroundColor: "#284",
    },
    inputText: {
      flex: 1,
      fontSize: "14@ms",
      color: "#000",
      paddingLeft: 30,
      paddingTop: variant !== "outlined" ? "13@ms" : 0,
    },
    label: {
      position: "absolute",
      left: moderateScale(15),
      fontSize: focused || value ? "10@s" : "13@s",
      color: focused ? colors(themeState.value)[color].main : "#aaa",
    },
    helperText: {
      paddingHorizontal: "15@s",
      color: focused ? colors(themeState.value)[color].dark : "#aaa",
      paddingTop: "4@ms",
    },
    error: {
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5,
      flexDirection: "row",
      alignItems: "center",
    },
    errorText: {
      fontSize: 12,
      marginLeft: 10,
    },
  });
  const formProps =
    type === "email"
      ? {
          textContentType: "emailAddress",
          keyboardType: "email-address",
          autoCapitalize: "none",
          autoCompleteType: "email",
        }
      : type === "number"
      ? {
          keyboardType: "numeric",
        }
      : type === "tel"
      ? {
          textContentType: "telephoneNumber",
          keyboardType: "phone-pad",
        }
      : type === "search"
      ? {
          keyboardType: "web-search",
          returnKeyType: "search",
          autoCapitalize: "none",
        }
      : type === "password"
      ? {
          secureTextEntry: true,
          autoCompleteType: "password",
          autoCapitalize: "none",
          textContentType: "password",
        }
      : {};
  return (
    <>
      <View style={styles.root}>
        <TouchableOpacity
          onPress={() => setFocused(true)}
          style={styles.container}
        >
          <Animated.Text style={{ ...styles.label, top: labelAnim }}>
            {label}
          </Animated.Text>
          {start}
          <View
            style={{
              flex: 0,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            {options ? (
              <View style={{ paddingLeft: 10 }}>
                <Typography style={styles.inputText}>
                  {options.find((cur) => cur.value === value)?.label}
                </Typography>
              </View>
            ) : (
              <TextInput
                onFocus={() => {
                  onFocus();
                  setFocused(true);
                }}
                onBlur={() => {
                  onBlur();
                  setFocused(false);
                }}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                editable={!disabled}
                selectTextOnFocus={!disabled}
                onSubmitEditing={onSubmitEditing}
                {...formProps}
                {...props}
                style={styles.input}
              />
            )}

            {options && (
              <MaterialIcons
                size={26}
                color="#aaa"
                style={{ marginRight: 10 }}
                name="keyboard-arrow-down"
              />
            )}

            {end && <View style={{ marginRight: 20 }}>{end}</View>}
          </View>
        </TouchableOpacity>
        {helperText && (
          <Typography
            color="textSecondary"
            style={styles.helperText}
            variant="caption"
          >
            {helperText}
          </Typography>
        )}
        {error && (
          <View style={styles.error}>
            <MaterialIcons
              name="error"
              color={colors(themeState.value).error.main}
              size={16}
            />
            <Typography style={styles.errorText} color="error">
              {error}
            </Typography>
          </View>
        )}
      </View>
      {options && (
        <SelectMenu
          options={options}
          value={value}
          open={focused}
          onClose={() => setFocused(false)}
          label={label}
          helperText={helperText}
          onChange={onChangeText}
        />
      )}
    </>
  );
};

export default TextField;
