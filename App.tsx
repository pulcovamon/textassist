import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import HomeScreen from "./HomeScreen";
import CameraScreen from "./CameraScreen";
import ResultScreen from "./ResultScreen";
import GalleryScreen from "./GalleryScreen";

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    'Atkinson-Hyperlegible': require('./assets/fonts/Atkinson-Hyperlegible.ttf'),
    'Atkinson-Hyperlegible-bold': require('./assets/fonts/Atkinson-Hyperlegible-bold.ttf'),
  });

  console.log(fontsLoaded);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ headerShown: false }}
        />
       <Stack.Screen
          name="Gallery"
          component={GalleryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
