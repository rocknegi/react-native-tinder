import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import {
  Profile,
  RootStackParamList,
  Routes,
  useAuthTypes,
} from "../hooks/types";

import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Swiper from "react-native-deck-swiper";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-rn";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

import { useAuth } from "../hooks/useAuth";
import { db } from "../firebase";
import { generateId } from "../lib/generateId";

const HomeScreen = () => {
  type navigationType = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<navigationType>();
  const { logout, user }: useAuthTypes = useAuth();

  const [profiles, setProfiles] = useState<Array<Profile>>([]);
  const [userImage] = useState<string>(user?.photoURL!);

  const swipeRef = useRef<any>(null);

  // Subscriber for checking if profile exist or not
  useEffect(
    () =>
      onSnapshot(doc(db, "users", user?.uid!), (snapshot) => {
        if (!snapshot.exists()) navigation.navigate(Routes.modal);
      }),
    []
  );

  // Subscriber for get all the users data except the logged in user
  useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      // update a card manually

      //   await updateDoc(doc(db, "users", "6wus6XMNdoZbYQxmp9SP"), {
      //     id: "6wus6XMNdoZbYQxmp9SP",
      //     displayName: "alexandra daddario",
      //     photoURL:
      //       "https://assets.cdn.moviepilot.de/files/edd51e04695e8c4a8cf4b7cf70a116bf3c62bdc3bf07107d79f3fdb29961/copyright/constance_0014.jpg",
      //     job: "Singer",
      //     age: 34,
      //     timestamp: serverTimestamp(),
      //   });

      const passes = await getDocs(
        collection(db, "users", user?.uid!, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const swipes = await getDocs(
        collection(db, "users", user?.uid!, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      //Don't show user the persons that he has already swiped left / right
      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          const temp: any = snapshot.docs
            .filter((doc) => doc.id !== user?.uid)
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
          setProfiles(temp);
        }
      );
    };
    fetchCards();

    return unsub;
  }, [db]);
  const swipeLeft = (cardIndex: number) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log("You swiped PASS on", userSwiped.displayName);

    setDoc(
      doc(db, "users", user?.uid!, "passes", userSwiped.id.toString()),
      userSwiped
    );
  };
  const swipeRight = async (cardIndex: number) => {
    if (!profiles[cardIndex]) return;

    const userSwiped: Profile = profiles[cardIndex];

    const loggedInUserData: DocumentData = await getDoc(
      doc(db, "users", user?.uid!)
    );

    const loggedInProfile = loggedInUserData.data();

    await setDoc(
      doc(db, "users", user?.uid!, "swipes", userSwiped.id.toString()),
      userSwiped
    );

    //Check if the user swiped on you
    const documentSnapshot = await getDoc(
      doc(db, "users", userSwiped.id.toString(), "swipes", user?.uid!)
    );
    if (documentSnapshot.exists()) {
      //user has matched with you before you matched
      // Create a match
      console.log("Hooray, you matched with", userSwiped.displayName);

      // create a MATCH
      setDoc(
        doc(db, "matches", generateId(user?.uid!, userSwiped.id.toString())),
        {
          users: {
            [user?.uid!]: loggedInProfile,
            [userSwiped.id]: userSwiped,
          },
          usersMatched: [user?.uid!, userSwiped.id],
          timestamp: serverTimestamp(),
        }
      );
      navigation.navigate(Routes.match, {
        loggedInProfile,
        userSwiped,
      });
    } else {
      //user has swiped as first interaction between the two or didnt't
      // get swiped on...

      console.log("You swiped on", userSwiped.displayName, userSwiped.job);
    }
  };
  return (
    <SafeAreaView style={tw("flex-1 mt-2 bg-white")}>
      {/* Header */}

      <View style={tw("mt-6 p-2 flex-row items-center justify-between")}>
        <TouchableOpacity onPress={logout}>
          <Image
            style={tw("h-10 w-10 rounded-full")}
            source={{ uri: userImage ? userImage : user?.photoURL }}
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
          cards={profiles}
          onSwipedLeft={(cardIndex) => swipeLeft(cardIndex)}
          onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
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
          renderCard={(card) =>
            card ? (
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
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  tw(
                    "relative bg-white h-3/4 rounded-xl justify-center items-center"
                  ),
                  styles.cardShadow,
                ]}
              >
                <Text style={tw("font-bold pb-5")}> No more profiles </Text>
                <Image
                  style={tw("h-24 w-24")}
                  source={{ uri: "https://links.papareact.com/6gb" }}
                />
              </View>
            )
          }
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
