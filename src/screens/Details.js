import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Alert, StyleSheet } from "react-native";
import { Header, Left, Right, Title, Body, Subtitle } from "native-base";
import { Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import InputField from "../Components/InputField";
import { AuthenticatedUserContext } from "../Providers/AuthenticatedUserProvider";
import { getUser } from "../../API/firebaseMethods";
import * as firebase from "firebase";
import "firebase/firestore";
import CustomLoader from "../Components/CustomLoader";


export default function Details({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(AuthenticatedUserContext);


  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const db = firebase.firestore();
      await db
        .collection("users")
        .doc(user.uid)
        .get()
        .then((snapshot) => {
          let info = snapshot.data();
          setEmail(info?.email || "");
          setFirstName(info?.firstName || "");
          setLastName(info?.lastName || "");
          setPhone(info?.phone || "");
          setAddress(info?.address || "");
          console.log("Doc----", info);
          // console.log(JSON.parse(doc._document.data.toString()));
        })
        .catch((e) => {
          Alert.alert("There is something wrong!", e.message);
        });
    } catch (err) {
      console.log("Error in get products---", err);
      Alert.alert("There is something wrong!", err.message);
    } finally {
      setLoading(false);
    }
  };


  const updateUserDetails = async () => {
    if (!firstName) {
      Alert.alert("First name is required");

    } else if (!phone || phone.length < 10) {
      Alert.alert("Enter valid phone number.");
    } else if (!address) {
      Alert.alert("Address field is required.");
    } else {
      setUpdating(true);
      const db = firebase.firestore();
      try {
        db.collection("users")
          .doc(user.uid)
          .update({
            // email: user?.email || "",
            lastName,
            firstName,
            phone,
            address,
          })
          .then((res) => {
            console.log("Res------", res);
            Alert.alert("Success!", "Profile Updated Successfully!");
            getUserDetails();
            navigation.goBack();
          });
      } catch (error) {
        console.log("Error in Update----", error);
      } finally {
        setUpdating(false);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Left>
          <Button
            type="clear"
            style={{ paddingLeft: 9 }}
            icon={<Feather name="arrow-left" size={25} color="white" />}
            onPress={() => navigation.goBack()}
          />
        </Left>

        <Body>
          <Title style={{ textAlign: "center" }}>My Details</Title>
        </Body>

        <Right></Right>
      </Header>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 15 }}
        snapToEnd={false}>

        <Subtitle style={styles.textStyle1}>Information provided here will be used for delivery and phone </Subtitle>
        <Subtitle style={styles.textStyle2}>number displayed here will be used as contact information.</Subtitle>

        <InputField
          inputStyle={{
            fontSize: 14,
          }}
          containerStyle={{
            backgroundColor: "#fff",
            marginTop: 30,
          }}
          leftIcon="nature-people"
          placeholder="First Name"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />

        <InputField
          inputStyle={{
            fontSize: 14,
          }}
          containerStyle={{
            backgroundColor: "#fff",
            marginTop: 20,
          }}
          leftIcon="human-handsdown"
          placeholder="Last Name"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />

        <InputField
          inputStyle={{
            fontSize: 14,
          }}
          editable={false}
          containerStyle={{
            backgroundColor: "#fff",
            marginTop: 20,
          }}
          leftIcon="email-multiple-outline"
          placeholder="Email Address"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <InputField
          inputStyle={{
            fontSize: 14,
          }}
          containerStyle={{
            backgroundColor: "#fff",
            marginTop: 20,
          }}
          leftIcon="phone-ring-outline"
          placeholder="Phone Number"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />

        <InputField
          inputStyle={{
            fontSize: 14,
          }}
          containerStyle={{
            backgroundColor: "#fff",
            marginBottom: 20,
            marginTop: 20,
          }}
          leftIcon="map-marker-circle"
          placeholder="Delivery Address"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        <Subtitle style={styles.textStyle}>Please ensure that address or location provided is within Lagos</Subtitle>
        <Subtitle style={styles.textStyle}>state as Garden only operates in Lagos state for now. </Subtitle>

        <Button
          buttonStyle={{
            backgroundColor: "black",
            marginTop: 25,
            marginBottom: 20
          }}
          loading={updating}
          onPress={updateUserDetails}
          style={{
            borderRadius: 45,
            backgroundColor: "black",
            alignSelf: "center",
          }}
          title="Save Changes"
          type="solid"
        />
      </ScrollView>
      {loading ? <CustomLoader /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: "flex-start",
    fontSize: 11,
    color: 'grey'
  },
  textStyle1: {
    marginTop: 15,
    alignSelf: "center",
    fontSize: 11,
    color: 'grey'
  },
  textStyle2: {
    alignSelf: "center",
    fontSize: 11,
    color: 'grey'
  }
})
