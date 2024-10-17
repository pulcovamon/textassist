import React, { useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Button, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Footer from "./Footer";

const CameraScreen = ({ navigation }) => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const cameraViewRef = useRef(null);

  if (!cameraPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Potřebujeme Vaše povolení k přístupu ke kameře.
        </Text>
        <Button onPress={requestCameraPermission} title="Povolit přístup" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraViewRef.current) {
      cameraViewRef.current.takePictureAsync({
        imageType: "jpg",
        quality: 0.4,
        onPictureSaved: async (picture) => {
          console.log(`Captured image: ${picture.uri}`);
          navigation.navigate("Result", { imageUri: picture.uri });
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView ref={cameraViewRef} style={styles.camera} facing="back" />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Icon name="add-a-photo" size={60} color="white" />
        </TouchableOpacity>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 90,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6200EE",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 60,
    color: "white",
  },
  cameraContainer: {
    flex: 7,
  },
  camera: {
    flex: 1,
    backgroundColor: "black",
  },
  message: {},
});

export default CameraScreen;
