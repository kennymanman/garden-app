import React, { useEffect, useContext, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import * as firebase from "firebase";
import SearchScreen from "../screens/SearchScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  createDrawerNavigator,
} from "@react-navigation/drawer";
import CatProducts from '../screens/CatProducts';
import Fruits from "../screens/Fruits";
import Vegetables from "../screens/Vegetables";
import Meat from "../screens/Meat";
import Bread from "../screens/Bread";
import Eggs from "../screens/Eggs";
import Cereal from "../screens/Cereal";
import Drinks from "../screens/Drinks";
import Alcohol from "../screens/Alcohol";
import Snacks from "../screens/Snacks";
import Spices from "../screens/Spices";
import Pantry from "../screens/Pantry";
import House from "../screens/House";
import Health from "../screens/Health";
import Kids from "../screens/Kids";
import { createStackNavigator } from "@react-navigation/stack";
import ProductPage from "../screens/ProductPage";
import DeliveryScreen from "../screens/DeliveryScreen";
import HelpScreen from "../screens/HelpScreen";
import DealsScreen from "../screens/DealsScreen";
import ProfileStack from "../Navigation/ProfileStack";
import SavedStack from "../Navigation/SavedStack";
import CartStack from "../Navigation/CartStack";
import HomeStack from "../Navigation/HomeStack";
import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../Providers/AuthenticatedUserProvider";


const auth = Firebase.auth();

// function CustomDrawerContent(props) {
//   //Icons and Images for Drawer Navigation
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={{ height: 50, width: 30, marginTop: 23 }}>
//         <Avatar.Image //Drawer Avatar
//           size={150}
//           source={require("../img/ral.jpg")}
//           style={{ marginLeft: 61, marginBottom: 10 }}
//         />

//         <Title style={{ width: 224, marginLeft: 57 }}>Rakeem Micheal </Title>
//       </View>

//       <DrawerContentScrollView {...props} style={{ marginTop: 130 }}>
//         <DrawerItemList {...props} />

//         <DrawerItem //First Drawer Item for Drawer Navigation
//           label="Home"
//           icon={({ color, size }) => (
//             <MaterialCommunityIcons name="tree" color={"black"} size={26} />
//           )}
//           component={MainTabNavigator}
//         />

//         <DrawerItem //Second Drawer Item for Drawer Navigation
//           label="Delivery Info"
//           icon={({ color, size }) => (
//             <MaterialCommunityIcons
//               name="account-card-details-outline"
//               color={"black"}
//               size={size}
//             />
//           )}
//           onPress={() => navigation.navigate("DeliveryScreen")}
//         />

//         <DrawerItem //Third Drawer Item for Drawer Navigation
//           label="My Orders"
//           icon={({ color, size }) => (
//             <MaterialCommunityIcons
//               name="package-variant"
//               color={"black"}
//               size={size}
//             />
//           )}
//         />

//         <DrawerItem //Fourth Drawer Item for Drawer Navigation
//           label="Need Help?"
//           icon={({ color, size }) => (
//             <Feather name="help-circle" color={"black"} size={size} />
//           )}
//           onPress={() => Linking.openURL("https://mywebsite.com/help")}
//         />

//         <DrawerItem
//           style={{ marginTop: 130 }} //Drawer Item Sign Out
//           label="Sign out"
//           icon={({ color, size }) => (
//             <MaterialCommunityIcons
//               name="exit-to-app"
//               color={"black"}
//               size={size}
//             />
//           )}
//           onPress={() => Linking.openURL("https://mywebsite.com/help")}
//         />
//       </DrawerContentScrollView>
//     </SafeAreaView>
//   );
// }

const Stack = createStackNavigator(); //Stack Navigation is required to connect all Screens together

function SearchScreenStack() {
  return (
    <Stack.Navigator headerMode={"none"}>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="CatProducts" component={CatProducts} />
      <Stack.Screen name="Fruits" component={Fruits} />
      <Stack.Screen name="Vegetables" component={Vegetables} />
      <Stack.Screen name="Meat" component={Meat} />
      <Stack.Screen name="Bread" component={Bread} />
      <Stack.Screen name="Eggs" component={Eggs} />
      <Stack.Screen name="Cereal" component={Cereal} />
      <Stack.Screen name="Drinks" component={Drinks} />
      <Stack.Screen name="Alcohol" component={Alcohol} />
      <Stack.Screen name="Snacks" component={Snacks} />
      <Stack.Screen name="Spices" component={Spices} />
      <Stack.Screen name="Pantry" component={Pantry} />
      <Stack.Screen name="House" component={House} />
      <Stack.Screen name="Health" component={Health} />
      <Stack.Screen name="Kids" component={Kids} />

      <Stack.Screen name="ProductPage" component={ProductPage} />
      <Stack.Screen name="DeliveryScreen" component={DeliveryScreen} />
      <Stack.Screen name="DealsScreen" component={DealsScreen} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />

    </Stack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator(); //Bottom Tab bar Navigation

function MainTabNavigator() {
  return (
    <Tab.Navigator //Tab bar Navigation Start
      initialRouteName="HomeStack"
      shifting={true}
      sceneAnimationEnabled={false}
      barStyle={{ backgroundColor: "#ffffff" }}
      labeled={false}
    >
      <Tab.Screen //Tab Bar First Icon
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="tree" color={color} size={28} />
          ),
        }}
      />

      <Tab.Screen //Tab Bar Second Icon
        name="SearchScreen"
        component={SearchScreenStack}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" color={color} size={20} />
          ),
        }}
      />

      <Tab.Screen //Tab Bar Third Icon
        name="SavedScreen"
        component={SavedStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="heart-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen //Tab Bar Fourth Icon
        name="CartScreen"
        component={CartStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="shopping-bag" size={22} color={color} />
          ),
          tabBarBadge: global.cartCount, //The Quantity Icon on the Tab Bar
        }}
      />

      <Tab.Screen //Tab Bar Fifth Icon
        name="ProfileScreen"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" size={23} color={color} />
          ),
        }}
      />
    </Tab.Navigator> //Tab Bar End
  );
}

//Note That the Bottom Tab Bar Navigation is nested inside the Drawer Navigation.

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(
      async (authenticatedUser) => {
        if (authenticatedUser) {
          setUser(authenticatedUser);
        } else {
          setUser(null);
        }
      }
    );

    if (auth.currentUser) {
      const id = auth.currentUser.uid
      fetch(id)
    }
  });
  

  const fetch = async (id) => {
    const allCartRes = await firebase.firestore().collection("cartItems").where('currentUserID', '==', id).get();
    console.log('get cartttttt', allCartRes.size)
    global.cartCount = allCartRes.size
  }


  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    // <Drawer.Navigator
    //   drawerContent={(props) => <CustomDrawerContent {...props} />}
    //   initialRouteName="Home"
    // >
    //   <Drawer.Screen name="Home" component={MainTabNavigator} />
    //   <Drawer.Screen name="delivery info" component={DeliveryScreen} />
    //   <Drawer.Screen name="need help?" component={HelpScreen} />
    //   <Drawer.Screen name="My orders" component={OrderScreen} />
    //   <Drawer.Screen name="Edit Profile" component={EditScreen} />

    //   {/*<Drawer.Screen name="Product page" component={ProductPage} />*/}
    //   <Drawer.Screen name="nat" component={SignUp} />
    //   <Drawer.Screen name="dat" component={LogIn} />
    // </Drawer.Navigator>
  );
}
