import { SplashScreen, Stack } from "expo-router";
// Import your global CSS file
import "./global.css";

import { useFonts } from "expo-font";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "rubik-bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "rubik-extrabold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "rubik-semibold": require("../assets/fonts/Rubik-SemiBold.ttf"),
    "rubik-light": require("../assets/fonts/Rubik-Light.ttf"),
    "rubik-medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "rubik-regular": require("../assets/fonts/Rubik-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
