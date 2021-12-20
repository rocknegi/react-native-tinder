import React from "react";
import { SafeAreaView } from "react-native";

import ChatList from "../components/ChatList";
import Header from "../components/Header";

const ChatScreen = () => {
  return (
    <SafeAreaView
      style={{
        marginTop: "8%",
      }}
    >
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;
