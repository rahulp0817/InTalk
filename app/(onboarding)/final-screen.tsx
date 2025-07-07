import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/AuthStore";
import { View } from "react-native";

const FinalScreen = () => {
    const { completedOnboarding } = useAuthStore();
    return (
        <View className="px-6">
            <Text className="text-2xl font-bold self-center mt-10">
                Screen Last
            </Text>
            <Text className="text-lg text-center mt-4">
                Last Form to Complete!.
            </Text>
            <Button className="mt-6" onPress={completedOnboarding}>
                <Text className="text-base text-white">Completed</Text>
            </Button>
        </View>
    )
}

export default FinalScreen;