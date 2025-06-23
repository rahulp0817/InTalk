import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Text, View } from "react-native";

const SignIn = () => {
    const authContext = useContext(AuthContext);
    console.log("signin");

    return (
        <View className="px-6">
            <Text className="text-2xl font-bold self-center mt-10">
                Sign In
            </Text>
            <Text className="text-lg text-center mt-4">
                {authContext.isLoggedIn ? "You are logged in!" : "Please log in to continue."}
            </Text>
            <Button className="mt-6" onPress={() => {
                authContext.logIn();
            }}>
                <Text className="text-base text-white">Sign In</Text>
            </Button>
        </View>
    )
}

export default SignIn;