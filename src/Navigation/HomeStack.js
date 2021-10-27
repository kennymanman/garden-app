import React from 'react'
import { View, Text } from 'react-native'
import HomeScreen from '../screens/HomeScreen'
import DealsScreen from '../screens/DealsScreen'
import ProductPage from '../screens/ProductPage'
import Grocerylist from '../screens/Grocerylist'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";




const Stack = createStackNavigator();

export default function HomeStack() {


   return (
        <Stack.Navigator headerMode={"none"}>
          
  
  
          
          <Stack.Screen name="HomeScreen" component={HomeScreen} />

          <Stack.Screen name="DealsScreen" component={DealsScreen} />

          <Stack.Screen name="ProductPage" component={ProductPage} />

          <Stack.Screen name="Grocerylist" component={Grocerylist} />
  
  
        </Stack.Navigator>
      );
    }





