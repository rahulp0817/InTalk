import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { View } from "react-native";

const OnboardingScreen = () => {
    return (
        <View className="px-6">
            <Text className="text-2xl font-bold self-center mt-10">
                Screen 1
            </Text>
            <Text className="text-lg text-center mt-4">
                Click on next!.
            </Text>
            <Button className="mt-6" onPress={() => router.push('/(onboarding)/final-screen')}>
                <Text className="text-base text-white">Next</Text>
            </Button>
        </View>
    )
}

export default OnboardingScreen;