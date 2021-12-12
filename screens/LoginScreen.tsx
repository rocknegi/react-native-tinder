import React from "react";
import {
  View,
  Text,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from "react-native";
import { useAuth } from "../hooks/useAuth";

interface Params {
  signInWithGoogle?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

const LoginScreen = () => {
  const { signInWithGoogle, loading }: any = useAuth();
  return (
    <View>
      <Text>{loading ? "Loading..." : "Login to the app"}</Text>
      <Button title="login" onPress={signInWithGoogle} />
    </View>
  );
};

export default LoginScreen;
