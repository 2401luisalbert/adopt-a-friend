import React from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import { View, StyleSheet } from "react-native";

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} size="large" color="#1e90ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop:10,
    paddingBottom:50
  },
});

export default Loader;
