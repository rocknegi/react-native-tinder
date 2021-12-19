import { RouteProp, useRoute } from "@react-navigation/native";
import { TwitterAuthProvider } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import tw from "tailwind-rn";
import Header from "../components/Header";
import ReceiverMessage from "../components/ReceiverMessage";
import SenderMessage from "../components/SenderMessage";
import { db } from "../firebase";
import { RootStackParamList, useAuthTypes } from "../hooks/types";
import { useAuth } from "../hooks/useAuth";
import { getMatchedUserInfo } from "../lib/getMatchesUserInfo";

const MessageScreen = () => {
  const { user }: useAuthTypes = useAuth();
  type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Message">;
  const { params } = useRoute<ProfileScreenRouteProp>();
  const { matchDetails } = params;

  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<any>([]);

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user?.uid,
      displayName: user?.displayName,
      photoURL: matchDetails.users[user?.uid!].photoURL,
      message: input,
    });
    setInput("");
  };

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [matchDetails, db]
  );
  return (
    <SafeAreaView
      style={{
        marginTop: "8%",
        flex: 1,
      }}
    >
      <Header
        title={getMatchedUserInfo(matchDetails?.users, user?.uid).displayName}
        callEnabled={true}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw("flex-1")}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <FlatList
              data={messages}
              inverted={true}
              style={tw("pl-4")}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) =>
                item.userId === user?.uid ? (
                  <SenderMessage message={item} />
                ) : (
                  <ReceiverMessage message={item} />
                )
              }
            />
          </>
        </TouchableWithoutFeedback>

        <View
          style={tw(
            "flex-row justify-between  items-center border-t border-gray-200 px-5 py-2"
          )}
        >
          <TextInput
            style={tw("h-10 text-lg")}
            placeholder="Send Message.."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button onPress={sendMessage} title="Send" color="#FF5864" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;
