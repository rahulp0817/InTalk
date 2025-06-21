import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "./CustomStatusBar";

const CustomSafeAreaView = ({ children }: any) => {
  return (
    <SafeAreaView className="w-full h-full bg-background">
      <CustomStatusBar />
      {children}
    </SafeAreaView>
  );
};

export default CustomSafeAreaView;
