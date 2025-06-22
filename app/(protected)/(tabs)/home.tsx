import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
    const authContext = useContext(AuthContext);
    return (
        <SafeAreaView>
            <Text>hello</Text>
            <Button className="mt-6" onPress={() => {
                authContext.logOut();
            }}>
                <Text className="text-base text-white">LogOut</Text>
            </Button>
        </SafeAreaView>
    )
}

export default HomeScreen;