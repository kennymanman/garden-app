import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import ProfileScreen from "../screens/ProfileScreen";
import AuthStack from "../Navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthenticatedUserContext } from "../Providers/AuthenticatedUserProvider";

import { ActivityIndicator } from "react-native";
import Firebase from "../config/firebase";
import { createStackNavigator } from "@react-navigation/stack";
import Details from "../screens/Details";
import OrderScreen from "../screens/OrderScreen";
import Grocerylist from "../screens/Grocerylist";
import Password from "../screens/Password";
import HelpScreen from "../screens/HelpScreen";

const auth = Firebase.auth();

export default function ProfileStack() {
  const { user, setUser } = useContext(AuthenticatedUserContext);

  const ProfileStack = createStackNavigator();

  function ProfileStackScreen() {
    return (
      <ProfileStack.Navigator headerMode={"none"}>
        <ProfileStack.Screen name="My Profile" component={ProfileScreen} />

        <ProfileStack.Screen name="Details" component={Details} />

        <ProfileStack.Screen name="My Orders" component={OrderScreen} />

        <ProfileStack.Screen name="My Grocery List" component={Grocerylist} />

        <ProfileStack.Screen name="Change my Password" component={Password} />

        <ProfileStack.Screen name="Help & Support" component={HelpScreen} />
      </ProfileStack.Navigator>
    );
  }

  return (
    <NavigationContainer independent={true}>
      {user ? <ProfileStackScreen /> : <AuthStack />}
    </NavigationContainer>
  );
}
