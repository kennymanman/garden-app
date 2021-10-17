import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

const CustomLoader = ({ size }) => (
  <View style={styles.container}>
    <ActivityIndicator size={size || "large"} color={"green"} />
  </View>
);

export default CustomLoader;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
