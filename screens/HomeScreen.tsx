import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../hooks/useAuth";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { logout }: { logout?: () => void } = useAuth();

  return (
    <View>
      <Text>Home screen</Text>
      <Button
        title="go to chat screen"
        onPress={() => navigation.navigate("Chat")}
      />
      <Text>Home screen</Text>
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
};

export default HomeScreen;
