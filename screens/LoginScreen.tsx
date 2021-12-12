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
  const { signInWithGoogle }: any = useAuth();
  return (
    <View>
      <Text>Login</Text>
      <Button title="login" onPress={signInWithGoogle} />
    </View>
  );
};

export default LoginScreen;
