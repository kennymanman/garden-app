import React, { useContext, useEffect,useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../Providers/AuthenticatedUserProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Header, Left, Right, Title, Body, Subtitle } from "native-base";
import { loggingOut } from "../../API/firebaseMethods";
import Star from "../Svg/Star.svg"
import Bingcross from "../Svg/Bingcross.svg"


export default function ProfileScreen({ navigation }) {
  const [first, setFirst] = useState("");
  const { user, setUser } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    //const user = firebase.auth().currentUser;

    Firebase.firestore().doc(`users/${user.uid}`)
      .get()
      .then((doc) => {
          console.log('firestore document', doc.data())
          setFirst(doc.data().firstName)
        
      })
      .catch(e => console.log(e));
    // Update the document title using the browser API
  });

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
      <Header>
        <Left></Left>

        <Body>
          <Title style={{ right: '25%', }}>My Profile</Title>
        </Body>
        <Right></Right>
      </Header>

      <Star style={{ marginTop: 10, marginLeft: 15 }} />

      <Bingcross style={{ position: "absolute", marginTop: 70, alignSelf: "flex-end" }} />
      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 18, textAlign: "center", fontFamily: "recoleta-black", bottom: 50 }}>
          Welcome {first}
        </Text>
        {/*<Flower  style={{position:"absolute", left:195, top:70}}/> */}

        <View style={styles.borderStyle} />
        <TouchableOpacity onPress={() => navigation.navigate("Details")}>
          <View style={styles.boxStyle}>
            <MaterialCommunityIcons
              name="card-account-details-star-outline"
              size={26}
              style={styles.iconStyle}
            />

            <Title style={styles.textStyle}>
              My Details
            </Title>

            <MaterialCommunityIcons
              name="chevron-right"
              size={26}
              color="gray"
              style={{ marginLeft: 177, marginTop: 1 }}
            />

          </View>
        </TouchableOpacity>

        <View style={styles.borderStyle} />
        <TouchableOpacity onPress={() => navigation.navigate("My Orders")}>
          <View style={styles.boxStyle}>
            <Feather name="shopping-bag" size={24} style={styles.iconStyle} />
            <Title style={styles.textStyle}>
              Order History
            </Title>

            <MaterialCommunityIcons
              name="chevron-right"
              size={26}
              color="gray"
              style={{ marginLeft: 157, marginTop: 1 }}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.borderStyle} />
        {/*<Arrowdown  style={{position:"absolute", marginTop:150, left:260}}/>*/}



        <TouchableOpacity
          onPress={() => navigation.navigate("My Grocery List")}
        >
          <View style={styles.boxStyle}>
            <MaterialCommunityIcons
              name="format-list-checks"
              size={26}
              style={styles.iconStyle}
            />

            <Title style={styles.textStyle}>
              Grocery List
            </Title>

            <MaterialCommunityIcons
              name="chevron-right"
              size={26}
              color="gray"
              style={{ marginLeft: 165, marginTop: 1 }}
            />

          </View>
        </TouchableOpacity>
        <View style={styles.borderStyle} />
        {/*
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
*/}
        {/*<Bingcross style={{position:"absolute", left:270}} /> */}


        <TouchableOpacity onPress={() => navigation.navigate("Help & Support")}>
          <View style={styles.boxStyle}>
            <MaterialCommunityIcons name="help-box" size={26} style={styles.iconStyle} />

            <Title style={styles.textStyle}>
              Help & Support
            </Title>

            <MaterialCommunityIcons
              name="chevron-right"
              size={26}
              color="gray"
              style={{ marginLeft: 142, marginTop: 1 }}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.borderStyle} />
        {/*<Cactus style={{position:"absolute", marginTop:290, left:200}} />*/}

        <TouchableOpacity onPress={loggingOut}>
          <View style={styles.boxStyle}>
            <MaterialCommunityIcons
              name="exit-to-app"
              size={26}
              style={styles.iconStyle}
            />
            <Title style={styles.textStyle}>
              Log Out
            </Title>

            <MaterialCommunityIcons
              name="chevron-right"
              size={26}
              color="gray"
              style={{ marginLeft: 194, marginTop: 1 }}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.borderStyle} />


        <Subtitle style={{ marginTop: 15 }}>Groceries at your doorstep.</Subtitle>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxStyle: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10
  },
  borderStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#CED0CE',
    marginTop: 20
  },
  iconStyle: {
    marginTop: 3,
    color: 'black'
  },
  textStyle: {
    marginLeft: 25,
    color: 'black',
    paddingTop: 6,
    fontSize: 15
  },
})
