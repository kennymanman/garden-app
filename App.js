import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/Navigation/AppNavigator';
//import DrawerContent from "./src/Navigation/DrawerContent"
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        
        
        <AppNavigator />
        
      </NavigationContainer>
    </PaperProvider>
  );
}