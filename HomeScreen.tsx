import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Footer from "./Footer";
import Header from "./Header";
import { createStyles, iconSize } from "./Styles";

const HomeScreen = ({ navigation }) => {
  const Styles = createStyles(useColorScheme());
  return (
    <View style={Styles.container}>
      <Header />
      <View style={[Styles.buttonContainer, Styles.contentContainer]}>
        <TouchableOpacity
          style={[Styles.button, styles.button]}
          onPress={() => navigation.navigate("Camera")}
        >
          <Icon name="photo-camera" size={iconSize} color="white" />
          <Text style={Styles.buttonText}>Kamera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.button, styles.button]}
          onPress={() => navigation.navigate("Gallery")}
        >
          <Icon name="collections" size={iconSize} color="white" />
          <Text style={Styles.buttonText}>Galerie</Text>
        </TouchableOpacity>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    margin: 10,
    width: "65%",
  },
});

export default HomeScreen;
