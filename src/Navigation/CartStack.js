import React from 'react'
import { View, Text } from 'react-native'
import CartScreen from '../screens/CartScreen'
import Details from "../screens/Details"
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from '../screens/ProfileScreen';



const Stack = createStackNavigator();

export default function CartStack() {
    return (
       

        <Stack.Navigator headerMode={"none"} >
        <Stack.Screen name='CartScreen' component={CartScreen} />
        <Stack.Screen name='Details' component={Details} />
        <Stack.Screen name='My Profile' component={ProfileScreen} />
      </Stack.Navigator>
    )
}
