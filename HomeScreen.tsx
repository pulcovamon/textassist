import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Footer from "./Footer";
import Header from "./Header";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Camera")}
      >
        <Icon name="photo-camera" size={60} color="white" />
        <Text style={styles.buttonText}>Kamera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Gallery")}
      >
        <Icon name="collections" size={60} color="white" />
        <Text style={styles.buttonText}>Galerie</Text>
      </TouchableOpacity>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    padding: 0,
    margin: 0,
  },
  button: {
    backgroundColor: "#6200EE",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: "65%",
  },
  buttonContainer: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 38,
    marginLeft: 10,
    fontFamily: "Atkinson-Hyperlegible",
  },
});


export default HomeScreen;
