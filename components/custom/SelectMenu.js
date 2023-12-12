import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import colors from "../../theme/colors";
import Typography from "./Typography";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "./Button";
import { GlobalContext } from "../../context";
import TextField from "./TextField";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SelectMenu = ({
  open = false,
  onClose,
  value,
  options = [],
  onChange,
  disableAutoClose = false,
  label,
  secondary,
  helperText,
}) => {
  const { bottom } = useSafeAreaInsets();
  const { themeState } = React.useContext(GlobalContext);
  const [search, setSearch] = useState("");
  const styles = ScaledSheet.create({
    root: {
      backgroundColor: themeState.mode === "dark" ? "#000" : "#f7f7f7",
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: "10@ms",
      marginTop: 90,
    },
    header: {
      paddingTop: "80@ms",
      marginBottom: "20@vs",
    },

    option: {
      paddingHorizontal: "10@s",
      paddingVertical: "10@vs",
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: "10@vs",
    },
    footer: {
      paddingBottom: 30,
      paddingHorizontal: "15@ms",
      paddingTop: "15@ms",
    },
  });
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={{
          ...styles.option,
          backgroundColor: themeState.mode === "dark" ? "#222" : "#fff",
        }}
        onPress={() => {
          onChange(item?.value);
          if (!disableAutoClose) onClose();
        }}
        key={item.label}
      >
        {item.start && <View style={{ marginRight: 10 }}>{item.start}</View>}
        <View style={{ flex: 1 }}>
          <Typography>{item.label}</Typography>
          {item.secondary ? (
            <Typography
              variant="body2"
              style={{
                marginTop: 2,
              }}
            >
              {item.secondary}
            </Typography>
          ) : null}
        </View>
        {value === item.value && (
          <MaterialIcons
            name="check"
            color={colors(themeState.value).blue.light}
            size={24}
            style={{ marginLeft: "auto" }}
          />
        )}
      </TouchableOpacity>
    ),
    [value, colors]
  );
  return (
    <SafeAreaView>
      <Modal visible={open} animationType="slide" onRequestClose={onClose}>
        <View style={styles.root}>
          <View style={styles.content}>
            <FlatList
              removeClippedSubviews
              keyExtractor={(item) => item.value}
              renderItem={renderItem}
              data={options
                .filter((item) =>
                  search.length > 1
                    ? item.label.toLowerCase().indexOf(search.toLowerCase()) >
                      -1
                    : item
                )
                .sort((a, b) => a.label.localeCompare(b.label))}
            />
          </View>
          <View style={styles.footer}>
            <Button
              color="error"
              variant="outlined"
              fullWidth
              title="Close"
              onPress={onClose}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SelectMenu;
