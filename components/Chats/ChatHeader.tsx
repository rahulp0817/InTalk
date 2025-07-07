import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/lib/useColorScheme";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

const ChatHeader = () => {
  const [hasError, setHasError] = useState(false);
  const { isDarkColorScheme } = useColorScheme();

  const iconColor = isDarkColorScheme ? "#FFFFFF" : "#000000";

  return (
    <View className="flex-row items-center justify-between">
      <Image
        source={
          hasError
            ? require("@/assets/images/fallback-user.jpg")
            : require("@/assets/images/user.jpg")
        }
        style={styles.logo}
        onError={() => setHasError(true)}
      />
      <View className="flex-row gap-6">
        <IconSymbol size={28} name="magnifyingglass" color={iconColor} />
        <IconSymbol size={28} name="qrcode.viewfinder" color={iconColor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 42,
    height: 42,
    resizeMode: "cover",
    borderRadius: 24,
    marginRight: 12,
  },
});

export default ChatHeader;
