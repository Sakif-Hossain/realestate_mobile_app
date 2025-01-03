import icons from "@/constants/icons";
import images from "@/constants/images";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Comment } from "@/components/Comment";
import { useAppwrite } from "@/lib/useAppwrite";
import { getPropertyById } from "@/lib/appwrite";

// Create dummy gallery data
const dummyGallery = [
  {
    $id: "1",
    image: "https://picsum.photos/400/400?random=1",
  },
  {
    $id: "2",
    image: "https://picsum.photos/400/400?random=2",
  },
  {
    $id: "3",
    image: "https://picsum.photos/400/400?random=3",
  },
  {
    $id: "4",
    image: "https://picsum.photos/400/400?random=4",
  },
];

enum FacilitiesType {
  Parking = "Parking",
  Gym = "Gym",
  WiFi = "WiFi",
  PetFriendly = "Pet-friendly",
  Laundry = "Laundry",
  SwimmingPool = "Swimming-Pool",
}

const facilitiesIcons = {
  [FacilitiesType.Parking]: icons.carPark,
  [FacilitiesType.Gym]: icons.dumbell,
  [FacilitiesType.WiFi]: icons.wifi,
  [FacilitiesType.PetFriendly]: icons.dog,
  [FacilitiesType.Laundry]: icons.laundry,
  [FacilitiesType.SwimmingPool]: icons.swim,
};

enum Type {
  House = "House",
  Townhomes = "Townhomes",
  Condos = "Condos",
  Duplexes = "Duplexes",
  Studios = "Studios",
  Villa = "Villa",
  Apartments = "Apartments",
  Others = "Others",
}

const BOTTOM_BAR_HEIGHT = 120;

//property details
export const Details = ({
  title,
  type,
  rating,
  reviews,
  bed,
  bath,
  sqf,
}: {
  title: string;
  type: Type;
  rating: number;
  reviews: number;
  bed: number;
  bath: number;
  sqf: number;
}) => {
  return (
    <View className="px-5 mt-7 flex gap-2">
      <Text className="font-extrabold text-black text-2xl">{title}</Text>

      <View className="flex flex-row items-center gap-3">
        <View className="flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
          <Text className="text-xs font-bold text-primary-300">{type}</Text>
        </View>

        <View className="flex flex-row items-center gap-2">
          <Image source={icons.star} className="size-5" />
          <Text className="text-black-200 text-sm mt-1 font-medium">
            {rating}
          </Text>

          <Text className="text-black-200 text-sm mt-1 font-medium">
            {`(${reviews} ${reviews <= 0 ? "review" : "reviews"} )`}
          </Text>
        </View>
      </View>

      <View className="flex flex-row gap-2 items-center">
        <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
          <Image source={icons.bed} className="size-4" />
        </View>
        <Text className="text-black-300 text-sm font-medium ml-2">{`${bed} ${
          bed <= 1 ? "bed" : "beds"
        }`}</Text>

        <View className="flex ml-2 flex-row items-center justify-center bg-primary-100 rounded-full size-10">
          <Image source={icons.bath} className="size-4" />
        </View>
        <Text className="text-black-300 text-sm font-medium ml-2">{`${bath} ${
          bed <= 1 ? "bath" : "baths"
        }`}</Text>

        <View className="flex ml-2 flex-row items-center justify-center bg-primary-100 rounded-full size-10">
          <Image source={icons.area} className="size-4" />
        </View>
        <Text className="text-black-300 text-sm font-medium ml-2">
          {sqf} sqft
        </Text>
      </View>
    </View>
  );
};

//agent details
export const Agent = ({
  name,
  email,
  phone,
  avatar,
}: {
  name: string;
  email: string;
  phone: number;
  avatar: any;
}) => {
  return (
    <View className="flex px-5 w-full border-t border-primary-200 pt-7 mt-5">
      <Text className="font-bold text-black text-xl">Agent</Text>

      <View className="flex flex-row mt-5 items-center justify-between">
        <View className="flex flex-row items-center">
          <Image source={{ uri: avatar }} className="size-14 rounded-full" />

          <View className="flex flex-col items-start justify-center ml-3">
            <Text className="text-lg text-black-300 text-start font-bold">
              {name}
            </Text>
            <Text className="text-lg text-black-100 text-start font-rubik-bold">
              {email}
            </Text>
          </View>
        </View>

        <View className="flex flex-row gap-3 items-center">
          <TouchableOpacity onPress={() => {}} className="">
            <Image source={icons.chat} className="size-9" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} className="">
            <Image source={icons.phone} className="size-9" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

//overview
export const Overview = ({ description }: { description: string }) => {
  return (
    <View className="px-5 mt-7 flex gap-2">
      <Text className="text-black font-bold text-xl">Overview</Text>
      <Text className="text-black-200 text-base font-normal mt-2">
        {description}
      </Text>
    </View>
  );
};

//facilities
export const Facilities = ({ facilities }: { facilities: string[] }) => {
  if (!facilities) {
    return null;
  }

  return (
    <View className="mt-7">
      <Text className="text-black-300 text-xl font-bold">Facilities</Text>

      {facilities.length > 0 && (
        <View className="flex flex-row flex-wrap items-start justify-start mt-2 gap-5">
          {facilities.map((item, index) => {
            const facilityType = Object.values(FacilitiesType).find(
              (type) => type === item
            );
            return (
              <View
                key={index}
                className="flex flex-1 flex-col items-center min-w-16 max-w-20 gap-2"
              >
                <View className="size-14 bg-primary-100 rounded-full flex items-center justify-center">
                  <Image
                    source={facilitiesIcons[facilityType as FacilitiesType]}
                    className="size-5"
                  />
                </View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="text-black text-sm text-center font-normal mt-1.5"
                >
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

//gallery
export const Gallery = ({ gallery }: { gallery: any[] }) => {
  if (!gallery) {
    return null;
  }
  return (
    gallery.length > 0 && (
      <View className="px-5 mt-7">
        <Text className="text-black-300 text-xl font-bold">Gallery</Text>
        <FlatList
          data={gallery}
          contentContainerStyle={{ paddingRight: 20 }}
          keyExtractor={(item) => item.$id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.image }}
              className="size-40 rounded-xl"
            />
          )}
          contentContainerClassName="flex gap-4 mt-3"
        />
      </View>
    )
  );
};

//location
export const Location = ({
  address,
  geoLocation,
}: {
  address: string;
  geoLocation: string;
}) => {
  return (
    <View className="px-5 mt-7">
      <Text className="text-black-300 text-xl font-bold">Location</Text>
      <View className="flex flex-row gap-2 items-center">
        <Image source={icons.location} className="size-5" />
        <Text className="">{address}</Text>
      </View>
      <Image source={images.map} className="h-52 w-full mt-5 rounded-xl" />
    </View>
  );
};

//reviews
export const Reviews = ({
  rating,
  reviews,
}: {
  rating: number;
  reviews: any[];
}) => {
  if (!reviews) return null;
  return (
    <View className="px-5 mt-7">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Image source={icons.star} className="size-6" />
          <Text className="text-black-300 text-lg font-bold ml-2">
            {rating}
          </Text>
          <Text className="text-black-300 text-lg font-bold ml-1">{`(${
            reviews.length
          } ${reviews.length <= 1 ? "review" : "reviews"})`}</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-base font-semibold text-primary-300">
            See All
          </Text>
        </TouchableOpacity>
      </View>
      {reviews.map((review) => (
        <Comment
          key={review.$id}
          name={review.name}
          avatar={review.avatar}
          review={review.review}
          likes={10}
          createdAt={review.$createdAt}
        />
      ))}
    </View>
  );
};

const Property = () => {
  const windowHeight = Dimensions.get("window").height;
  const [isFavourite, setIsFavourite] = React.useState(false);

  const { id } = useLocalSearchParams<{ id?: string }>();

  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: { id: id! },
  });

  function handleFavourite() {
    setIsFavourite(!isFavourite);
    // You can add more logic here, such as updating a backend or local storage
  }
  function handleSend() {
    // Logic to handle sending property details, e.g., sharing via social media or messaging
    console.log("Property details sent!");
    // You can add more logic here, such as integrating with a sharing API or opening a share dialog
  }
  function handleBooking() {
    return () => {
      // Logic to handle booking the property
      console.log("Property booked!");
      // You can add more logic here, such as updating a backend or navigating to a confirmation screen
    };
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingBottom: BOTTOM_BAR_HEIGHT,
        }}
      >
        {/* Image Section */}
        <View style={{ height: windowHeight / 2 }}>
          <Image
            source={{ uri: property?.image }}
            className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
            resizeMode="cover"
          />
          <Image
            source={images.whiteGradient}
            className="absolute top-0 w-full z-40"
          />
          <View className="flex flex-row items-center w-full justify-between z-50">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex flex-row rounded-full size-11 items-center justify-center"
            >
              <Image source={icons.backArrow} className="size-8" />
            </TouchableOpacity>

            <View className="flex flex-row gap-3 items-center">
              <TouchableOpacity onPress={handleFavourite}>
                <Image
                  source={icons.heart}
                  className="size-8"
                  tintColor={"#191D31"}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSend}>
                <Image source={icons.send} className="size-8" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View className="pb-10">
          <Details
            title={property?.name}
            type={property?.type}
            rating={property?.rating}
            reviews={property?.reviews.length}
            bed={property?.bedrooms}
            bath={property?.bathrooms}
            sqf={property?.area}
          />

          <Agent
            name={property?.agent.name}
            email={property?.agent.email}
            phone={property?.agent.phone_number}
            avatar={property?.agent.avatar}
          />

          <Overview description={property?.description} />

          <View className="px-5">
            <Facilities facilities={property?.facilities} />
          </View>
        </View>

        <Gallery gallery={property?.gallery} />

        <Location
          address={property?.address}
          geoLocation={property?.geolocation}
        />
        <Reviews
          rating={property?.rating}
          reviews={property?.reviews}
          // name={property?.reviews}
          // avatar=""
          // comment="xyz"
          // likes={102}
        />
      </ScrollView>

      <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <View className="flex flex-col items-start">
            <Text className="text-black-200 text-xs font-rubik-medium">
              Price
            </Text>
            <Text
              numberOfLines={1}
              className="text-primary-300 text-start text-2xl font-rubik-bold"
            >
              ${property?.price}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleBooking()}
            className="flex-1 flex flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400"
          >
            <Text className="text-white text-lg text-center font-rubik-bold">
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Property;
