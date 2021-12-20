import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import tw from "tailwind-rn";
import { useAuthTypes } from "../hooks/types";
import { useAuth } from "../hooks/useAuth";
import Modal from "react-native-modal";
const Loader = () => {
  const { loading }: useAuthTypes = useAuth();
  return loading ? (
    <View style={tw("flex-1 absolute justify-center items-center")}>
      <Modal backdropOpacity={0.6} isVisible={loading}>
        <View style={tw("flex-1 justify-center items-center")}>
          <View style={styles.modalView}>
            <ActivityIndicator size={50} color="#FF5864" />
          </View>
        </View>
      </Modal>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Loader;
