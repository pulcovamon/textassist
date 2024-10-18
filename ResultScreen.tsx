import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
} from "react-native";
import axios from "axios";
import Footer from "./Footer";
import Icon from "react-native-vector-icons/MaterialIcons";
import { API_KEY } from "react-native-dotenv";
import { createStyles, iconSize } from "./Styles";

const ResultScreen = ({ navigation, route }) => {
  const Styles = createStyles(useColorScheme());
  const { imageUri } = route.params;
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [textSize, setTextSize] = useState<number>(26);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOcrResult = async () => {
      try {
        const result = await getOcrResult(imageUri);
        const parsedText = result.ParsedResults[0].ParsedText;
        setOcrResult(parsedText);
        console.log(`Detected text: ${parsedText}`);
        if (parsedText.trim() === "") {
          throw Error("Empty result!");
        }
      } catch (error) {
        console.log(error);
        setOcrResult("Nepodařilo se najít žádný text. Zkuste to znova.");
      } finally {
        setLoading(false);
      }
    };

    fetchOcrResult();
  }, [imageUri]);

  const getOcrResult = async (imageUri: string) => {
    const endpoint = "https://api.ocr.space/parse/image";

    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      name: "photo.jpg",
      type: "image/jpeg",
    });
    formData.append("language", "cze");

    const headers = {
      apikey: API_KEY,
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await axios.post(endpoint, formData, { headers });
      return response.data;
    } catch (error) {
      throw Error(`Error occured: ${error}`);
    }
  };

  const plusTextSize = () => {
    if (textSize && textSize <= 50) {
      setTextSize(textSize + 6);
    }
  };

  const minusTextSize = () => {
    if (textSize && textSize >= 20) {
      setTextSize(textSize - 6);
    }
  };

  return (
    <View style={Styles.container}>
      {loading ? (
        <View style={Styles.contentContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={Styles.loading}
          />
        </View>
      ) : (
        <View style={Styles.contentContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={minusTextSize}
              style={[Styles.button, Styles.roundButton]}
            >
              <Icon name="remove" size={iconSize} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={plusTextSize}
              style={[Styles.button, Styles.roundButton]}
            >
              <Icon name="add" size={iconSize} color="white" />
            </TouchableOpacity>
          </View>
          <ScrollView style={Styles.contentContainer}>
            <Text
              style={[
                Styles.resultText,
                {
                  fontSize: textSize ? textSize : 32,
                  lineHeight: textSize ? 2 * textSize : 64,
                },
              ]}
            >
              {ocrResult}
            </Text>
          </ScrollView>
        </View>
      )}
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 60,
    marginBottom: 10,
  },
});

export default ResultScreen;
