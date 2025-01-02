import { BackButton } from "@/components/BackButton";
import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => {};
  textStyle?: string;
  showArrow?: boolean;
}

// Component to create rows for each setting
const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogOut = async () => {
    const result = await logout();

    if (result) {
      Alert.alert("Success", "You have successfully logged out");
      refetch();
    } else {
      Alert.alert("Error", "An error occured when logging out");
    }
  };

  const handleEdit = () => {
    console.log("Edit button pressed");
    return true;
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-5"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <BackButton />
          <Text className="text-xl font-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>

        <View className="flex flex-col items-center relative mt-10">
          <Image
            source={{ uri: user?.avatar }}
            className="size-52 relative rounded-full"
          />
          <TouchableOpacity
            onPress={handleEdit}
            className="absolute bottom-14 right-24"
          >
            <Image source={icons.edit} className="size-11" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold mt-2">{user?.name}</Text>
        </View>

        <View className="flex flex-col mt-10">
          <SettingsItem
            icon={icons.calendar}
            title="My Booking"
            showArrow={true}
          ></SettingsItem>
          <SettingsItem
            icon={icons.wallet}
            title="Payments"
            showArrow={true}
          ></SettingsItem>
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          <SettingsItem
            icon={icons.logout}
            textStyle="text-dager"
            showArrow={false}
            onPress={handleLogOut}
            title="Log out"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
