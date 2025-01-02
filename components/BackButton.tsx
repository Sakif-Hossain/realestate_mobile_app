import icons from "@/constants/icons";
import { router } from "expo-router";
import { Image, TouchableOpacity } from "react-native";

export const BackButton = () => (
  <TouchableOpacity
    onPress={() => router.back()}
    className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
  >
    <Image source={icons.backArrow} className="size-5" />
  </TouchableOpacity>
);
