import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import Footer from "./Footer";
import Icon from "react-native-vector-icons/MaterialIcons";
import { API_KEY } from 'react-native-dotenv';

const ResultScreen = ({ navigation, route }) => {
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
    <View style={styles.container}>
      {loading ? (
        <>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loading}
          />
        </>
      ) : (
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={minusTextSize} style={styles.button}>
              <Icon name="remove" size={60} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={plusTextSize} style={styles.button}>
              <Icon name="add" size={60} color="white" />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <Text
              style={[
                styles.resultText,
                {
                  fontSize: textSize ? textSize : 32,
                  lineHeight: textSize ? 2 * textSize : 64,
                  fontFamily: "Atkinson Hyperlegible",
                },
              ]}
            >
              {ocrResult}
            </Text>
          </ScrollView>
        </>
      )}
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80,
  },
  image: {
    width: "100%",
    height: "80%",
  },
  loading: {
    marginTop: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 60,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#6200EE",
    width: 80,
    height: 80,
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
  resultText: {
    padding: 10,
    textAlign: "center",
    fontFamily: "Atkinson Hyperlegible",
    fontWeight: "bold",
  },
});

export default ResultScreen;
