import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import tw from "tailwind-rn";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

import { useAuth } from "../hooks/useAuth";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { logout, user }: any = useAuth();

  return (
    <SafeAreaView>
      {/* Header */}

      <View style={tw("mt-6 p-2 flex-row items-center justify-between")}>
        <TouchableOpacity onPress={logout}>
          <Image
            style={tw("h-10 w-10 rounded-full")}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={tw("h-14 w-14")}
            source={require("../assets/logo.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>

      {/* Header end */}
    </SafeAreaView>
  );
};

export default HomeScreen;
