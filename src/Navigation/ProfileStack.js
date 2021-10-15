import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native'
import ProfileScreen from "../screens/ProfileScreen";
import AuthStack from "../Navigation/AuthStack"
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticatedUserContext } from '../Providers/AuthenticatedUserProvider';

import { ActivityIndicator } from 'react-native';
import Firebase from '../config/firebase';
import { createStackNavigator } from "@react-navigation/stack";



const auth = Firebase.auth();



export default function ProfileStack() {


const { user, setUser } = useContext(AuthenticatedUserContext); 


const ProfileStack = createStackNavigator();

function ProfileStackScreen () {
return (
      
    <ProfileStack.Navigator  >

    <ProfileStack.Screen name="Profilepage" component={ProfileScreen} />
    

    </ProfileStack.Navigator>

  );
}





return (

  <NavigationContainer independent={true}>
  {user ? <ProfileStackScreen /> : <AuthStack />}
  </NavigationContainer>
)

  

} 

