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
import Swiper from "react-native-deck-swiper";

import { useAuth } from "../hooks/useAuth";
import { RootStackParamList, useAuthTypes } from "../hooks/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const HomeScreen = () => {
  type navigationType = NativeStackNavigationProp<RootStackParamList, "Chat">;
  const navigation = useNavigation<navigationType>();
  const { logout, user }: useAuthTypes = useAuth();

  const DUMMY_DATA = [
    {
      id: 1,
      firstname: "Rohit",
      lastName: "Negi",
      occupation: "SDE II",
      age: 24,
    },
    {
      id: 2,
      firstname: "Ro",
      lastName: "Negi",
      occupation: "SDE II",
      age: 24,
    },
    {
      id: 3,
      firstname: "rt",
      lastName: "Negi",
      occupation: "SDE II",
      age: 24,
    },
  ];

  return (
    <SafeAreaView style={tw("flex-1")}>
      {/* Header */}

      <View style={tw("mt-6 p-2 flex-row items-center justify-between")}>
        <TouchableOpacity onPress={logout}>
          <Image
            style={tw("h-10 w-10 rounded-full")}
            source={{ uri: user?.photoURL }}
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

      {/* Cards */}
      <View style={tw("flex-1 -mt-6")}>
        <Swiper
          containerStyle={{ backgroundColor: "transparent" }}
          cards={DUMMY_DATA}
          renderCard={(card) => (
            <View key={card.id} style={tw("bg-white h-3/4 rounded-xl")}>
              <Text>{card.firstname}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
