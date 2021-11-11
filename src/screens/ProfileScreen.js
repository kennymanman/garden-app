import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Firebase from "../config/firebase";
import IconButton from "../Components/IconButton";
import { AuthenticatedUserContext } from "../Providers/AuthenticatedUserProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Header, Left, Right, Title, Body, Subtitle } from "native-base";
import { Button } from "react-native-elements";
import { loggingOut } from "../../API/firebaseMethods";
import Flower from "../Svg/Flower.svg"
import Star from "../Svg/Star.svg"
import Arrowdown from "../Svg/Arrowdown.svg"
import Bingcross from "../Svg/Bingcross.svg"
import Cactus from "../Svg/Cactus.svg"

const auth = Firebase.auth();




export default function ProfileScreen({ navigation }) {
  const { user, setUser } = useContext(AuthenticatedUserContext);

  //Copy this to enable signout function..
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Header style={{ marginTop: 3 }}>
        <Left></Left>

        <Body>
          <Title style={{ width: 300 }}>My Profile</Title>
        </Body>
        <Right></Right>
      </Header>

<Star />

<Bingcross style={{position:"absolute", marginTop:140, alignSelf:"flex-end"}}/>
      <View style={{ margin: 25 }}>
        <Text style={{ fontSize: 16, textAlign: "center", fontFamily:"recoleta-black" }}>
          Welcome {user?.email || ""}
        </Text>

{/*<Flower  style={{position:"absolute", left:195, top:70}}/> */}

<View style={{ height: 2,  borderBottomWidth: 1, borderBottomColor: '#CED0CE', marginTop:20}} />

        <TouchableOpacity onPress={() => navigation.navigate("Details")}>
          <View style={{ flexDirection: "row", marginTop: 32}}>
            <MaterialCommunityIcons
              name="card-account-details-star-outline"
              size={26}
              color="black"
            />

            <Title style={{ marginLeft: 30, paddingTop: 6, fontSize: 15 }}>
              My Details
            </Title>
          </View>
        </TouchableOpacity>

        <View style={{ height: 1.5,  borderBottomWidth: 1, borderBottomColor: '#CED0CE', marginTop:15}} />

        <TouchableOpacity onPress={() => navigation.navigate("My Orders")}>
          <View style={{ flexDirection: "row", marginTop: 32 }}>
            <Feather name="shopping-bag" size={24} color="black" />
            <Title style={{ marginLeft: 30, paddingTop: 6, fontSize: 15 }}>
              Order History
            </Title>
          </View>
        </TouchableOpacity>

    <View style={{ height: 1.5,  borderBottomWidth: 1, borderBottomColor: '#CED0CE', marginTop:15}} />

{/*<Arrowdown  style={{position:"absolute", marginTop:150, left:260}}/>*/}



        <TouchableOpacity
          onPress={() => navigation.navigate("My Grocery List")}
        >
          <View style={{ flexDirection: "row", marginTop: 32 }}>
            <MaterialCommunityIcons
              name="format-list-checks"
              size={26}
              color="black"
            />

            <Title style={{ marginLeft: 30, paddingTop: 6, fontSize: 15 }}>
              Grocery List
            </Title>
          </View>
        </TouchableOpacity>
        <View style={{ height: 1.5,  borderBottomWidth: 1, borderBottomColor: '#CED0CE', marginTop:15}} />


        <TouchableOpacity onPress={() => navigation.navigate("Change my Password")}>
        <View style={{ flexDirection: "row", marginTop: 32 }}>
          <MaterialCommunityIcons
            name="account-key-outline"
            size={26}
            color="black"
          />
          <Title style={{ marginLeft: 30, paddingTop: 6, fontSize: 15 }}>
            Change Password
          </Title>
        </View>
       </TouchableOpacity>
       <View style={{ height: 1.5,  borderBottomWidth: 1, borderBottomColor: '#CED0CE', marginTop:15}} />

{/*<Bingcross style={{position:"absolute", left:270}} /> */}


        <TouchableOpacity onPress={() => navigation.navigate("Help & Support")}>
          <View style={{ flexDirection: "row", marginTop: 32 }}>
            <MaterialCommunityIcons name="help-box" size={26} color="black" />

            <Title style={{ marginLeft: 30, paddingTop: 6, fontSize: 15 }}>
              Help & Support
            </Title>
          </View>
        </TouchableOpacity>

        <View style={{ height: 1.5,  borderBottomWidth: 1, borderBottomColor: '#CED0CE', marginTop:15}} />

{/*<Cactus style={{position:"absolute", marginTop:290, left:200}} />*/}

        <TouchableOpacity onPress={loggingOut}>
          <View style={{ flexDirection: "row", marginTop: 50 }}>
            <MaterialCommunityIcons
              name="exit-to-app"
              size={26}
              color="black"
            />
            <Title style={{ marginLeft: 30, paddingTop: 6, fontSize: 15 }}>
              Log Out
            </Title>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
