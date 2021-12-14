import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import LoginScreen from "../screens/LoginScreen";
import { useAuth } from "../hooks/useAuth";
import { RootStackParamList, useAuthTypes } from "../hooks/types";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const { user }: useAuthTypes = useAuth();
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="Chat" component={ChatScreen} />
        </>
      ) : (
        <RootStack.Screen name="Login" component={LoginScreen} />
      )}
    </RootStack.Navigator>
  );
};

export default StackNavigator;
