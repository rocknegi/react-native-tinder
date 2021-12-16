import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import tw from "tailwind-rn";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";

import { useAuth } from "../hooks/useAuth";
import { RootStackParamList, Routes, useAuthTypes } from "../hooks/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const HomeScreen = () => {
  type navigationType = NativeStackNavigationProp<RootStackParamList, "Chat">;
  const navigation = useNavigation<navigationType>();
  const { logout, user }: useAuthTypes = useAuth();
  const swipeRef = useRef<any>(null);

  const DUMMY_DATA = [
    {
      id: 1,
      firstname: "Taylor",
      lastName: "Swift",
      job: "Singer",
      age: 24,
      photoURL:
        "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU1NDc3MTEyODE0MzE0NTcy/taylor-swift-attends-the-2016-vanity-fair-oscar-party-hosted-by-graydon-carter-at-wallis-annenberg-center-for-the-performing-arts-on-february-28-2016-in-beverly-hills-california-photo-by-anthony-harve.jpg",
    },
    {
      id: 2,
      firstname: "Olivia ",
      lastName: "Rodrigo",
      job: "Singer",
      age: 24,
      photoURL:
        "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTg0ODYwOTg5MDMwNjcxNDgw/gettyimages-1184956791.jpg",
    },
    {
      id: 3,
      firstname: "Dua ",
      lastName: "Lipa",
      job: "Singer",
      age: 24,
      photoURL:
        "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTg1NjUxMjM2MTY5NTkwMTY0/gettyimages-1356296274.jpg",
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

        <TouchableOpacity onPress={() => navigation.navigate(Routes.modal)}>
          <Image
            style={tw("h-14 w-14")}
            source={require("../assets/logo.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate(Routes.chat)}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>

      {/* Header end */}

      {/* Cards */}
      <View style={tw("flex-1 -mt-6")}>
        <Swiper
          ref={swipeRef}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          containerStyle={{ backgroundColor: "transparent" }}
          cards={DUMMY_DATA}
          onSwipedLeft={() => console.log("swipe pass")}
          onSwipedRight={() => console.log("swipe match")}
          backgroundColor="#4FD0E9"
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          renderCard={(card) => (
            <View
              key={card.id}
              style={tw("relative bg-white h-3/4 rounded-xl")}
            >
              <Image
                style={tw("h-full w-full rounded-xl")}
                source={{ uri: card.photoURL }}
              />
              <View
                style={[
                  tw(
                    "absolute bottom-0 flex-row justify-between items-center bg-white w-full h-20 px-6 py-2 rounded-b-xl"
                  ),
                  styles.cardShadow,
                ]}
              >
                <View>
                  <Text style={tw("text-xl font-bold")}>
                    {card.firstname} {card.lastName}
                  </Text>
                  <Text>{card.job}</Text>
                </View>
                <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View style={tw("flex flex-row justify-evenly mb-2")}>
        <TouchableOpacity
          onPress={() => swipeRef?.current?.swipeLeft()}
          style={tw(
            "items-center justify-center rounded-full w-16 h-16 bg-red-200"
          )}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef?.current?.swipeRight()}
          style={tw(
            "items-center justify-center rounded-full w-16 h-16 bg-green-200"
          )}
        >
          <Entypo name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2.1,
  },
});
