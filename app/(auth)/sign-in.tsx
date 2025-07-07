import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/AuthStore";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
    const { logIn } = useAuthStore();
    console.log("signin");

    return (
        <SafeAreaView className="px-6">
            <Text className="text-2xl font-bold self-center mt-10">
                Sign In
            </Text>
            <Text className="text-lg text-center mt-4">
                Please log in to continue.
            </Text>
            <Button className="mt-6 rounded-full py-2" variant="default" size={"lg"} onPress={logIn}>
                <Text className="text-base text-white">Sign In</Text>
            </Button>
        </SafeAreaView>
    )
}

export default SignIn;