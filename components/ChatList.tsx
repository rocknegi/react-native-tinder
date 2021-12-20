import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import tw from "tailwind-rn";
import { db } from "../firebase";
import { useAuthTypes, Profile } from "../hooks/types";
import { useAuth } from "../hooks/useAuth";
import ChatRow from "./ChatRow";
import Loader from "./Loader";

const ChatList = () => {
  const [matches, setMatches] = useState<any>([]);
  const { user, showLoader }: useAuthTypes = useAuth();

  useEffect(() => {
    showLoader!(true);
    let subscribe;
    try {
      subscribe = onSnapshot(
        query(
          collection(db, "matches"),
          where("usersMatched", "array-contains", user?.uid)
        ),
        (snapshot) => {
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
          showLoader!(false);
        }
      );
    } catch (error) {
      console.error(error);
      showLoader!(false);
    }

    return subscribe;
  }, [user]);
  //   console.log(matches);
  return (
    <>
      <Loader />
      {matches.length > 0 ? (
        <FlatList
          style={tw("h-full")}
          data={matches}
          key={matches.id}
          renderItem={({ item }) => <ChatRow matchDetails={item} />}
        />
      ) : (
        <Text style={tw("text-center text-lg")}>
          {" "}
          No matches at the moment{" "}
        </Text>
      )}
    </>
  );
};

export default ChatList;
