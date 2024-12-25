import images from "@/constants/images";
import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureResponderEvent } from "react-native";
import icons from "@/constants/icons";

const SignIn = () => {
  function handleLogin(event: GestureResponderEvent): void {
    // Implement Google Sign-In logic here
    console.log("Google Sign-In button pressed");
    // Example: Redirect to Google Sign-In page or use Google Sign-In SDK
  }
  return (
    <SafeAreaView className="bg-accent-100 h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className="text-base text-center font-bold uppercase  text-black-200">
            Welcome to ReEstate
          </Text>
          <Text className="text-3xl text-center font-extrabold text-black-300 mt-2">
            Let's Get You Closer to {"\n"}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>
          <Text className="text-lg font-normal text-black-200 text-center mt-12">
            Login to ReState with Google
          </Text>
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-white shadow-md shadow-black-100 rounded-full w-fill py-4 mt-5"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-medium text-black-300 ml-2">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
