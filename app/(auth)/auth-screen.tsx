import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

const SCREEN_WIDTH = Dimensions.get("window").width;

const IMAGES = [
  require("@/assets/images/react-logo.png"),
  require("@/assets/images/react-logo.png"),
  require("@/assets/images/react-logo.png"),
];

const TEXTS = [
  {
    title: "Welcome to InTalk",
    subtitle: "Connect instantly and securely.",
  },
  {
    title: "Real-time Messaging",
    subtitle: "Fast, reliable conversations anytime.",
  },
  {
    title: "Built for Teams",
    subtitle: "Collaborate with your team effortlessly.",
  },
];

const AuthScreen = () => {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="flex-1 justify-between">
        {/* Top Section: Carousel + Text */}
        <View className="items-center mt-12">
          {/* Text */}
          <View className="items-center">
            <Text className="text-3xl font-bold dark:text-white text-center">
              {TEXTS[index].title}
            </Text>
            <Text className="text-lg font-medium dark:text-gray-300 text-center mt-4">
              {TEXTS[index].subtitle}
            </Text>
          </View>

          {/* Carousel */}
          <Carousel
            width={SCREEN_WIDTH}
            height={400}
            data={IMAGES}
            autoPlay
            loop
            autoPlayInterval={5000}
            onSnapToItem={setIndex}
            style={{ marginTop: 50 }}
            renderItem={({ item }) => (
              <Image
                source={item}
                style={{
                  width: "100%",
                  height: 400,
                  resizeMode: "contain",
                }}
              />
            )}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 1,
              parallaxScrollingOffset: 0,
              parallaxAdjacentItemScale: 0.9,
            }}
          />

          {/* Pagination Dots */}
          <View className="flex-row gap-6 justify-center my-16">
            {IMAGES.map((_, i) => (
              <View
                key={i}
                className={`w-3 h-3 rounded-full ${i === index ? "dark:bg-white bg-black" : "bg-gray-400"}`}
              />
            ))}
          </View>
        </View>

        {/* Bottom Fixed Buttons */}
        <View className="gap-4 px-10 mb-6">
          <Button className="bg-transparent" size="lg" onPress={() => {}}>
            <Text className="font-medium text-gray-500">
              Terms & Privacy Policy
            </Text>
          </Button>
          <Button
            variant="default"
            className="bg-blue-600 hover:text-white"
            size="lg"
            onPress={() => router.push("/(auth)/sign-up")}
          >
            <Text className="font-semibold text-white">Get Started</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
