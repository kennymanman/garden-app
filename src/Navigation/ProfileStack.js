import React, { useContext } from "react";
import ProfileScreen from "../screens/ProfileScreen";
import AuthStack from "../Navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthenticatedUserContext } from "../Providers/AuthenticatedUserProvider";
import Firebase from "../config/firebase";
import { createStackNavigator } from "@react-navigation/stack";
import Details from "../screens/Details";
import OrderScreen from "../screens/OrderScreen";
import Grocerylist from "../screens/Grocerylist";
import Password from "../screens/Password";
import HelpScreen from "../screens/HelpScreen";
import HomeScreen from "../screens/HomeScreen";
import OrderDetail from "../screens/OrderDetail";


export default function ProfileStack() {
  const { user, setUser } = useContext(AuthenticatedUserContext);

  const ProfileStack = createStackNavigator();

  function ProfileStackScreen() {
    return (
      <ProfileStack.Navigator headerMode={"none"}>
        <ProfileStack.Screen name="My Profile" component={ProfileScreen} />

        <ProfileStack.Screen name="Details" component={Details} />

        <ProfileStack.Screen name="My Orders" component={OrderScreen} />

        <ProfileStack.Screen name="OrderDetail" component={OrderDetail} />

        <ProfileStack.Screen name="My Grocery List" component={Grocerylist} />

        <ProfileStack.Screen name="Change my Password" component={Password} />

        <ProfileStack.Screen name="Help & Support" component={HelpScreen} />


        <ProfileStack.Screen name="HomeScreen" component={HomeScreen} />


      </ProfileStack.Navigator>
    );
  }

  return (
    <NavigationContainer independent={true}>
      {user ? <ProfileStackScreen /> : <AuthStack />}
    </NavigationContainer>
  );
}
