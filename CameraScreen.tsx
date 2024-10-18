import React, { useRef } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import {
  View,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Footer from "./Footer";
import { createStyles, iconSize } from "./Styles";

const CameraScreen = ({ navigation }) => {
  const Styles = createStyles(useColorScheme());
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const cameraViewRef = useRef(null);

  if (!cameraPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={Styles.container}>
        <Text style={Styles.message}>
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
    <View style={Styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView ref={cameraViewRef} style={styles.camera} facing="back" />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[Styles.roundButton, Styles.button]}
          onPress={takePicture}
        >
          <Icon name="add-a-photo" size={iconSize} color="white" />
        </TouchableOpacity>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 110,
  },
  cameraContainer: {
    flex: 7,
  },
  camera: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default CameraScreen;
