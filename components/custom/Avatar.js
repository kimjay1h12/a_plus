import { Image, StyleSheet, View } from "react-native";

function Avatar({ src }) {
  return (
    <View>
      <Image source={src} style={styles.image} />
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
export default Avatar;
