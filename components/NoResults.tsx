import images from "@/constants/images";
import { Image, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const NoResult = () => {
  return (
    <SafeAreaView>
      <View className="flex items-center my-5">
        <Image
          source={images.noResult}
          className="w-11/12 h-80"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-black-300 mt-5">
          No Result
        </Text>
        <Text className="text-base text-black-100 mt-2">
          We could not find any result
        </Text>
      </View>
    </SafeAreaView>
  );
};
