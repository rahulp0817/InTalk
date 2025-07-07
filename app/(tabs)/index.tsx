import ChatScreen from "@/components/Chats/ChatScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-white dark:border-b-gray-900 flex-1 px-4 mt-2">
      <ChatScreen/>
    </SafeAreaView>
  );
}