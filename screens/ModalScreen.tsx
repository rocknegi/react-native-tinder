import { doc, setDoc, serverTimestamp } from "@firebase/firestore";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import tw from "tailwind-rn";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { db } from "../firebase";
import { RootStackParamList, Routes, useAuthTypes } from "../hooks/types";
import { useAuth } from "../hooks/useAuth";

const Modal = () => {
  const { user }: useAuthTypes = useAuth();

  const [image, setImage] = useState<string>("");
  const [job, setJob] = useState<string>();
  const [age, setAge] = useState<string>();

  type navigationType = NativeStackNavigationProp<RootStackParamList, "Home">;
  const navigation = useNavigation<navigationType>();
  const incompleteForm = !image || !job || !age;

  const updateUserProfile = async () => {
    try {
      await setDoc(doc(db, "users", user?.uid!), {
        id: user?.uid,
        displayName: user?.displayName,
        photoURL: image,
        job,
        age,
        timestamp: serverTimestamp(),
      });
      navigation.navigate(Routes.home);
    } catch (error) {}
  };

  return (
    <SafeAreaView style={tw("flex-1 items-center pt-1")}>
      <Image
        style={tw("h-20 w-full")}
        resizeMode="contain"
        source={{ uri: "https://links.papareact.com/2pf" }}
      />

      <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
        Welcome {user?.displayName}
      </Text>

      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        Step 1: The Profile Pic
      </Text>
      <TextInput
        placeholder="Enter a profile pic URL"
        value={image}
        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>): void =>
          setImage(e.nativeEvent.text)
        }
      />

      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        Step 2: The Job
      </Text>
      <TextInput
        value={job}
        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>): void =>
          setJob(e.nativeEvent.text)
        }
        placeholder="Enter a occupation"
      />

      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        Step 3: The Age
      </Text>
      <TextInput
        value={age}
        keyboardType="numeric"
        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>): void =>
          setAge(e.nativeEvent.text)
        }
        placeholder="Enter your age"
        maxLength={2}
      />

      <TouchableOpacity
        onPress={updateUserProfile}
        disabled={incompleteForm}
        style={[
          tw("w-64 p-3 rounded-xl absolute bottom-10"),
          incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
        ]}
      >
        <Text style={tw("text-center text-white text-xl")}>Update Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Modal;
