import { Card, FeaturedCard } from "@/components/Cards";
import { Filter } from "@/components/Filters";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Link } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="px-5">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row items-center">
            <Image source={images.avatar} className="size-12 rounded-full" />
            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-xs font-normal text-black-100">Hello,</Text>
              <Text className="text-base font-medium text-black-200">
                Sheikh
              </Text>
            </View>
          </View>
          <Image source={icons.bell} className="size-6" />
        </View>
        <Search />
        <View className="my-5">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-bold text-black-300">Featured</Text>
            <TouchableOpacity>
              <Text className="text-base font-semibold text-primary-300">
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row gap-5 mt-5">
            <FeaturedCard />
            <FeaturedCard />
            <FeaturedCard />
          </View>
        </View>

        <View className="flex flex-row items-center justify-between">
          <Text className="text-xl font-bold text-black-300">
            Recomendation
          </Text>
          <TouchableOpacity>
            <Text className="text-base font-semibold text-primary-300">
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <Filter />
        <View className="flex flex-row gap-5 mt-5">
          <Card />
          <Card />
        </View>
      </View>
    </SafeAreaView>
  );
}
