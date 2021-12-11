import { StatusBar } from "expo-status-bar";
import React from "react";
import tw from "tailwind-rn";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={tw("flex-1 justify-center items-center")}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
