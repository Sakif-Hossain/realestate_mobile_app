import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, View, Text } from "react-native";

export const Comment = ({
  name,
  avatar,
  review,
  likes,
}: {
  name: string;
  avatar: any;
  review: string;
  likes: number;
}) => {
  return (
    <View className="flex flex-col items-start">
      <View className="flex flex-row items-center mt-7">
        <Image source={images.avatar} className="size-14 rounded-full" />
        <Text className="text-base text-black-300 text-start font-bold ml-3">
          {name}
        </Text>
      </View>

      <Text className="text-black-200 text-base font-normal mt-2">
        {review}
      </Text>

      <View className="flex flex-row items-center w-full justify-between mt-4">
        <View className="flex flex-row items-center">
          <Image
            source={icons.heart}
            className="size-5"
            tintColor={"#0061FF"}
          />
          <Text className="text-black-300 text-sm font-medium ml-2">
            {likes}
          </Text>
        </View>
        <Text className="text-black-100 text-sm font-normal">6 days ago</Text>
      </View>
    </View>
  );
};
