import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, ActivityIndicator } from 'react-native-paper';
import InitScreen from './screens/InitScreen';
import { useFonts } from './hooks/useFonts';
import { AppRegistry, StyleSheet,  } from 'react-native';

AppRegistry.registerComponent('adopt-a-friend', () => App);

export default function App() {
  const fontLoaded = useFonts();

  if (!fontLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <PaperProvider>
        <InitScreen />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
})