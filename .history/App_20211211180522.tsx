import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, Text, View } from "react-native";
import tw from "tailwind-rn";
import StackNavigator from "./navigation/StackNavigator";

export default function App() {
  return <StackNavigator />;
}
