import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

const Property = () => {
  const id = useLocalSearchParams();
  return (
    <View>
      <Text>Property</Text>
    </View>
  );
};

export default Property;
