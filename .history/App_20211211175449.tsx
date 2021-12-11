import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, Text, View } from "react-native";
import tw from "tailwind-rn";

export default function App() {
  return (
    <View style={tw("flex-1 justify-center items-center")}>
      <StatusBar style="dark" />
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button onPress={() => console.log("")} title="Click me" />
    </View>
  );
}
