import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export const Filter = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectCategory, setSelectCatagory] = useState(params.filter || "All");

  const handleCategory = (category: string) => {
    if (selectCategory === category) {
      return;
    }

    setSelectCatagory(category);
    router.setParams({ filter: category });
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleCategory(item.category)}
          className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${
            selectCategory === item.category
              ? "bg-primary-300"
              : "bg-primary-100 border border-primary-200"
          }`}
        >
          <Text
            className={`text-sm ${
              selectCategory === item.category
                ? "text-white font-bold mt-0.5"
                : "text-black-300 font-normal"
            }`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
