import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-rn";
import Loader from "../components/Loader";
import { useAuthTypes } from "../hooks/types";

import { useAuth } from "../hooks/useAuth";

const LoginScreen = () => {
  const navigation = useNavigation();

  const { signInWithGoogle, loading }: useAuthTypes = useAuth();
  return (
    <>
      <Loader />
      <View style={tw("flex-1")}>
        <ImageBackground
          source={{ uri: "https://tinder.com/static/tinder.png" }}
          resizeMode="cover"
          style={tw("flex-1")}
        >
          <TouchableOpacity
            style={[
              tw("absolute bottom-40 w-52 bg-white p-4 rounded-2xl"),
              { marginHorizontal: "25%" },
            ]}
            onPress={signInWithGoogle}
          >
            <Text style={tw("font-semibold text-center")}>
              Sign in & get swiping
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </>
  );
};

export default LoginScreen;
