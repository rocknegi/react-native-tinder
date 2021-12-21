import React from "react";
import StackNavigator from "./navigation/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/useAuth";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      {/* HOC 
      wraps the whole app so every child has the access to the 
      global store
      */}
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
