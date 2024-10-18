// Footer.js
import React from "react";
import {
  View,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { createStyles, iconSize } from "./Styles";

const Footer = ({ navigation }) => {
  const Styles = createStyles(useColorScheme());
  return (
    <View style={Styles.footerContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="home" size={iconSize} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Camera")}
      >
        <Icon name="photo-camera" size={iconSize} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Gallery")}
      >
        <Icon name="image" size={iconSize} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 10,
  },
});

export default Footer;
