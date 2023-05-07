import { useContext } from "react";
import { Text, View } from "react-native";
import { GlobalContext } from "../../context";

function Typography({
  children,
  variant = "body2",
  color,
  fontWeight = 400,
  active = { true: true },
}) {
  const fontSize = {
    h1: 50,
    h2: 37,
    h3: 32,
    h4: 27,
    h5: 22,
    h6: 17,
    body1: 15,

    body2: 12,
    caption: 10,
  };
  const { themeState } = useContext(GlobalContext);

  return (
    <View>
      <Text
        style={{
          fontSize: fontSize[variant],
          color: themeState.mode === "dark" ? "#fff" : "#102660",
          fontWeight: fontWeight.toString(),
          flex: 0,
        }}
      >
        {children}
      </Text>
    </View>
  );
}
export default Typography;
