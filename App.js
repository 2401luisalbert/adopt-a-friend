import React from 'react';
import { PaperProvider, ActivityIndicator } from 'react-native-paper';
import { useFonts } from './hooks/useFonts';
import { AppRegistry} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigate from './components/navigation/StackNavigate';

AppRegistry.registerComponent('adopt-a-friend', () => App);

export default function App() {
  const fontLoaded = useFonts();

  if (!fontLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <StackNavigate />
      </NavigationContainer>
    </PaperProvider>
  );
}