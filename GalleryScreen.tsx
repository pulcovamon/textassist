import { useCallback, useState } from "react";
import { View, ActivityIndicator, useColorScheme } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { createStyles } from "./Styles";

export default function GalleryScreen({ navigation }) {
  const Styles = createStyles(useColorScheme());
  const [loading, setLoading] = useState<boolean>(true);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.4,
    });

    console.log(result);

    if (!result.canceled) {
      setLoading(false);
      navigation.navigate("Result", { imageUri: result.assets[0].uri });
    } else {
      navigation.navigate("Home");
    }
  };

  useFocusEffect(
    useCallback(() => {
      pickImage();
    }, [])
  );

  return (
    <View style={Styles.container}>
      {loading ? (
        <>
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={Styles.loading}
          />
        </>
      ) : (
        <View />
      )}
    </View>
  );
}
