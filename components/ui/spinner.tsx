import { useColorScheme } from "@/lib/useColorScheme";
import clsx from "clsx";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const Spinner = ({
  size = "large",
  color = null,
  viewClass = "",
  spinnerClass = "",
}: any) => {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <View className={`flex items-center justify-center ${viewClass}`}>
      <ActivityIndicator
        size={size}
        color={color ? color : isDarkColorScheme ? "#fff" : "#000"}
        className={clsx("self-center", spinnerClass)}
      />
    </View>
  );
};

export default Spinner;
