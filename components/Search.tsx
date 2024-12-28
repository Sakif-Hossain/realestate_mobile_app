import icons from "@/constants/icons";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Search() {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  const debounceSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500
  );

  const handleSearch = (text: string) => {
    // setSearch(text);
    debounceSearch(text);
  };

  const handleFilter = () => {
    console.log("filter button clicked");
  };

  return (
    <View className="bg-accent-100 flex flex-row items-center justify-between w-full px-4 rounded-2xl border border-primary-100 mt-5 py-2 ">
      <View className="flex-1 flex flex-row items-center justify-start gap-2 z-50">
        <Image source={icons.search} className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything..."
          className="text-sm font-normal text-black-300 flex-1"
        />
      </View>
      <TouchableOpacity onPress={handleFilter} className="ml-2">
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
}
