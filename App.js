import EXAppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import GameProvider from "./context/GameProvider";
import GameScreen from "./screens/GameScreen";
import AudioManager from "./src/AudioManager";
import { useResolvedValue } from "./src/hooks/useResolvedValue";
import ModelLoader from "./src/ModelLoader";

import LandingScreen from "./screens/LandingScreen";

console.ignoredYellowBox = [
  "WebGL",
  "THREE.WebGLRenderer",
  "THREE.WebGLProgram",
];

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function App() {
  return (
    <AssetLoading>
      <SafeAreaProvider>
        <GameProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="LandingScreen" component={LandingScreen}
                options={{ headerShown: false }} />

{/* // Single play on the local machine */}

              <Stack.Screen name="GameScreen" component={() => {
                return <GameScreen gameMode={0} />;
              }} options={{ headerShown: false }} />

{/* // Two players on the local machine */}

              <Stack.Screen name="GameScreen_1" component={() => {
                return <GameScreen gameMode={1} />;
              }} options={{ headerShown: false }} />

{/* // Two players via network */}

              <Stack.Screen name="GameScreen_2" component={() => {
                return <GameScreen gameMode={2} />;
              }} options={{ headerShown: false }} />

            </Stack.Navigator>
          </NavigationContainer>
        </GameProvider>
      </SafeAreaProvider>
    </AssetLoading>
  );
}

function AssetLoading({ children }) {
  const [fontLoaded] = useFonts({
    retro: require("./assets/fonts/retro.ttf"),
  });

  const [audioLoaded, audioLoadingError] = useResolvedValue(() =>
    AudioManager.setupAsync()
  );

  const [modelsLoaded, modelLoadingError] = useResolvedValue(() =>
    ModelLoader.loadModels()
  );

  console.log("Loading:", {
    fonts: fontLoaded,
    audio: audioLoaded,
    models: modelsLoaded,
  });

  if (modelLoadingError) {
    return (
      <ErrorScreen
        message={modelLoadingError.message}
        stack={modelLoadingError.stack}
      />
    );
  }
  if (audioLoadingError) {
    return (
      <ErrorScreen
        message={audioLoadingError.message}
        stack={audioLoadingError.stack}
      />
    );
  }
  if (modelsLoaded && fontLoaded && audioLoaded) {
    return children;
  }

  return <EXAppLoading />;
}

const ErrorScreen = ({ message, stack }) => (
  <View style={styles.errorContainer}>
    <ScrollView style={styles.error} contentContainerStyle={{}}>
      <Text style={styles.errorTitle}>This is a fatal error 👋 </Text>
      <Text style={styles.errorText}>{message}</Text>
      {stack && (
        <Text
          style={[
            styles.errorText,
            { fontSize: 12, opacity: 0.8, marginTop: 4 },
          ]}
        >
          {stack}
        </Text>
      )}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  splash: {
    backgroundColor: "#87C6FF",
    resizeMode: "contain",
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    maxWidth: 300,
    maxHeight: "50%",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#9e0000",
  },
  errorTitle: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  errorText: {
    fontSize: 24,
    color: "white",
  },
});
