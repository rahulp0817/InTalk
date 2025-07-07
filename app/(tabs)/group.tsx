import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/AuthStore";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Group = () => {
    const logOut = useAuthStore((s) => s.logOut);
    return (
        <SafeAreaView>
            <Button className="mt-6 mx-6" onPress={logOut}>
                <Text className="text-base text-white">LogOut</Text>
            </Button>
        </SafeAreaView>
    )
}

export default Group;