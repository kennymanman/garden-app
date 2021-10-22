import React, {useState, useEffect} from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigation from './src/Navigation/AppNavigator';
import {CartProvider} from "./src/screens/CartContext"
import { MenuProvider } from 'react-native-popup-menu'
import { AuthenticatedUserProvider } from "./src/Providers/AuthenticatedUserProvider"

import * as font from 'expo-font';
import { AppLoading } from 'expo-font';


export default function App() {


  useEffect(() => {
    font.loadAsync({
    'recoleta-bold': require('./assets/fonts/Recoleta-Bold.ttf'),
    'recoleta-black': require('./assets/fonts/Recoleta-Black.ttf'),

    })
    },[])



  
  return (
    



    <AuthenticatedUserProvider>
<MenuProvider>
<CartProvider>
    <PaperProvider>
      <NavigationContainer>
        
        <MainTabNavigation />
        
        

      </NavigationContainer>
    </PaperProvider>
    </CartProvider>
 </MenuProvider>   
   </AuthenticatedUserProvider> 
    
  );
}