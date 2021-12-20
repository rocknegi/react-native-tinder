import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "@env";

import { auth } from "../firebase";

//Create a context
const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: {} }) => {
  const [error, setError] = useState<any>();
  const [user, setUser] = useState<{}>();
  const [loadingInitial, setInitialLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(
    () =>
      // Subcribe to firebase OAuth + cleanup
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          setInitialLoading(false);
        } else setUser("");
        setLoading(false);
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
    setLoading(true);
    try {
      const res = await Google.logInAsync(config);

      if (res.type !== "success") return;

      const { idToken, accessToken } = res;
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      await signInWithCredential(auth, credential);
    } catch (error) {
      setError(error);
      console.log(error);
    }
    setLoading(false);
  };

  const logout = () => {
    setLoading(true);

    try {
      signOut(auth);
      setUser("");
    } catch (error) {
      setError(error);
    }
    setLoading(false);
    console.log(user);
  };

  const showLoader = (value: boolean) => {
    setLoading(value);
  };

  const memoedvalue = useMemo(
    () => ({
      user,
      loading,
      error,
      signInWithGoogle,
      logout,
      showLoader,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider
      // Global store
      value={memoedvalue}
    >
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
