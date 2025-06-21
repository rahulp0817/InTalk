import React from "react";
import { useColorScheme } from "@/lib/useColorScheme";
import { useSelector } from "react-redux";
import { StatusBar } from "react-native";

const CustomStatusBar = () => {
  const { isDarkColorScheme } = useColorScheme();
  const isInternetAvailable = useSelector(
    (state: any) => state.app.isInternetAvailable
  );
  return (
    <>
     <StatusBar
        backgroundColor={
          !isInternetAvailable
            ? "#FF0000"
            : isDarkColorScheme
            ? "#09090A"
            : "#FFFFFF"
        }
      />
    </>
  );
};

export default CustomStatusBar;
