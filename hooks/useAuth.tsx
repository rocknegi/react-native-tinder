import React, { createContext, useContext, useEffect, useState } from "react";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "@env";

import { auth } from "../firebase";

//Create a context
const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: {} }) => {
  const [error, setError] = useState<any>();
  const [user, setUser] = useState<{}>();

  useEffect(
    () =>
      // Subcribe to firebase OAuth + cleanup
      onAuthStateChanged(auth, () => {
        if (auth.currentUser) setUser(auth.currentUser);
        else setUser({});
      }),
    []
  );
  const config = {
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const res = await Google.logInAsync(config);

      if (res.type !== "success") return;

      const { idToken, accessToken } = res;
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      await signInWithCredential(auth, credential);
    } catch (error) {
      setError(error);
    }
  };
  return (
    <AuthContext.Provider
      // Global store
      value={{
        user: user,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
