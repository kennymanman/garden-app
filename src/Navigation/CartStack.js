import React from 'react'
import { View, Text } from 'react-native'
import CartScreen from '../screens/CartScreen'
import Details from "../screens/Details"
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from '../screens/ProfileScreen';
import Checkout from '../screens/Checkout';
import Offers from '../screens/Offers';
import showClosed from '../screens/showClosed';


const Stack = createStackNavigator();

export default function CartStack() {
  return (


    <Stack.Navigator headerMode={"none"} >
      <Stack.Screen name='CartScreen' component={CartScreen} />
      <Stack.Screen name='Offers' component={Offers} />
      <Stack.Screen name='Details' component={Details} />
      <Stack.Screen name='My Profile' component={ProfileScreen} />
      <Stack.Screen name='Checkout' component={Checkout} />
    </Stack.Navigator>
  )
}
