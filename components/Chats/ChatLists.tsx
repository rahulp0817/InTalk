import { useState } from "react";
import { Dimensions, Image, RefreshControl, View } from "react-native";
import {
    DataProvider,
    LayoutProvider,
    RecyclerListView,
} from "recyclerlistview";
import { Text } from "../ui/text";

const getWindowWidth = () => Dimensions.get("window").width;

const chatData = [
  {
    id: "1",
    sender: "Alice",
    message: "Hey, how are you?",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:30:00Z",
  },
  {
    id: "2",
    sender: "Bob",
    message: "All good! What about you?",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:31:00Z",
  },
  {
    id: "3",
    sender: "Alice",
    message: "Doing great! Thanks for asking 😊",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:32:00Z",
  },
  {
    id: "4",
    sender: "Alice",
    message: "Hey, how are you?",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:30:00Z",
  },
  {
    id: "5",
    sender: "Bob",
    message: "All good! What about you?",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:31:00Z",
  },
  {
    id: "6",
    sender: "Alice",
    message: "Doing great! Thanks for asking 😊",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:32:00Z",
  },
  {
    id: "7",
    sender: "Alice",
    message: "Hey, how are you?",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:30:00Z",
  },
  {
    id: "8",
    sender: "Bob",
    message: "All good! What about you?",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:31:00Z",
  },
  {
    id: "9",
    sender: "Alice",
    message: "Doing great! Thanks for asking 😊",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:32:00Z",
  },
  {
    id: "10",
    sender: "Alice",
    message: "Hey, how are you?",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:30:00Z",
  },
  {
    id: "11",
    sender: "Bob",
    message: "All good! What about you?",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:31:00Z",
  },
  {
    id: "12",
    sender: "Alice",
    message: "Doing great! Thanks for asking 😊",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:32:00Z",
  },
  {
    id: "13",
    sender: "Alice",
    message: "Hey, how are you?",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:30:00Z",
  },
  {
    id: "14",
    sender: "Bob",
    message: "All good! What about you?",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:31:00Z",
  },
  {
    id: "15",
    sender: "Alice",
    message: "Doing great! Thanks for asking 😊",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:32:00Z",
  },
  {
    id: "16",
    sender: "Alice",
    message: "Hey, how are you?",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:30:00Z",
  },
  {
    id: "17",
    sender: "Bob",
    message: "All good! What about you?",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:31:00Z",
  },
  {
    id: "18",
    sender: "Alice",
    message: "Doing great! Thanks for asking 😊",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:32:00Z",
  },
  {
    id: "19",
    sender: "Alice",
    message: "Hey, how are you?",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:30:00Z",
  },
  {
    id: "20",
    sender: "Bob",
    message: "All good! What about you?",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:31:00Z",
  },
  {
    id: "22",
    sender: "Alice",
    message: "Doing great! Thanks for asking 😊",
    image: "https://example.com/images/you.jpg",
    timestamp: "2025-07-06T12:32:00Z",
  },
];

const ChatRenderer = ({ chat }: { chat: (typeof chatData)[0] }) => {
  const [hasError, setHasError] = useState(!chat.image);

  const getRandomColor = (name: string) => {
    const colors = ["#f97316", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <View className="p-2 my-1 bg-gray-100 rounded-xl">
      <View className="flex-row items-start space-x-2 my-1 gap-2">
        {hasError || !chat.image ? (
          <View
            className="w-12 h-12 rounded-full items-center justify-center"
            style={{ backgroundColor: getRandomColor(chat.sender) }}
          >
            <Text className="text-white font-bold text-lg">
              {chat.sender.charAt(0).toUpperCase()}
            </Text>
          </View>
        ) : (
          <Image
            source={{ uri: chat.image }}
            className="w-12 h-12 bg-gray-500 rounded-full"
            onError={() => setHasError(true)}
          />
        )}

        <View className="flex-1">
          <View className="items-center flex-row justify-between">
            <Text className="font-semibold text-lg">{chat.sender}</Text>
            <Text className="text-xs text-gray-500 mt-1">
              {new Date(chat.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
          <Text className="text-sm">{chat.message}</Text>
        </View>
      </View>
    </View>
  );
};

const chatLayoutProvider = new LayoutProvider(
  () => "CHAT",
  (_type, dim) => {
    dim.width = getWindowWidth();
    dim.height = 74;
  }
);

const ChatListScreen = () => {
  const [dataProvider] = useState(
    new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(chatData)
  );
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);

    setRefreshing(false);
  };
  const rowRenderer = (
    type: string | number,
    data: (typeof chatData)[0],
    index: number,
    extendedState?: object
  ) => {
    return <ChatRenderer chat={data} />;
  };

  return (
    <View style={{ flex: 1, paddingTop: 24 }}>
      <RecyclerListView
        style={{ flex: 1 }}
        dataProvider={dataProvider}
        layoutProvider={chatLayoutProvider}
        rowRenderer={rowRenderer}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          contentContainerStyle: { paddingBottom: 100 },
          refreshControl: (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#999"
              colors={["#999"]}
            />
          ),
        }}
      />
    </View>
  );
};

export default ChatListScreen;
