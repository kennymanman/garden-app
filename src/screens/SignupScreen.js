import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button as RNButton,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

import ErrorMessage from "../Components/ErrorMessage";
import Button from "../Components/Button";
import InputField from "../Components/InputField";
import Firebase from "../config/firebase";
import { registration } from "../../API/firebaseMethods";
import { Title, Body, Subtitle } from "native-base"

import Bing from "../Svg/Bing.svg"
import Cactus from "../Svg/Cactus.svg"
import Yellow from "../Svg/Yellow.svg"
// import Orange from "../Svg/Orange.svg"


const auth = Firebase.auth();



export default function SignupScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("Mohali");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [signupError, setSignupError] = useState("");

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onHandleSignup = async () => {
    if (!firstName) {
      Alert.alert("First name is required");
    } else if (!email) {
      Alert.alert("Email field is required.");
    } else if (!phone || phone.length < 10) {
      Alert.alert("Enter valid phone number.");
    } else if (!address) {
      Alert.alert("Address field is required.");
    } else if (!password) {
      Alert.alert("Password field is required.");
    } else {
      // try {
      //   if (email !== "" && password !== "") {
      //     await auth.createUserWithEmailAndPassword(email, password);
      //   }
      // } catch (error) {
      //   setSignupError(error.message);
      // }
      const res = await registration(
        email,
        password,
        lastName,
        firstName,
        phone,
        address
      );

      console.log("Res-----", res);

      // setTimeout(() => {
      //   emptyState();
      // }, 3000);
      // if (res) {
      //   navigation.navigate("Loading");
      // }
    }
  };

  return (
    <View style={styles.container}>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar style="dark-content" />

        <ScrollView
          style={{ flex: 1, paddingTop: 55 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{
            fontSize: 24,
            fontWeight: "600",
            color: "black",
            alignSelf: "center",
            paddingBottom: 24,
            fontFamily: "recoleta-black",
            paddingTop: 20
          }}>Create a new account</Text>


          <Bing style={{ position: "absolute" }} />
          <InputField
            inputStyle={{
              fontSize: 14,
            }}
            containerStyle={{
              backgroundColor: "#fff",
              marginBottom: 20,
            }}
            leftIcon="nature-people"
            placeholder="First Name"
            autoCapitalize="none"
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
              marginBottom: 20,
            }}
            leftIcon="human-handsdown"
            placeholder="Last Name"
            autoCapitalize="none"
            autoFocus={true}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />

          <InputField
            inputStyle={{
              fontSize: 14,
            }}
            containerStyle={{
              backgroundColor: "#fff",
              marginBottom: 20,
            }}
            leftIcon="email-multiple-outline"
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          {/* <Orange style={{position:"absolute", marginTop:255, marginL¯eft:210}} /> */}

          <InputField
            inputStyle={{ fontSize: 14 }}
            containerStyle={{ backgroundColor: "#fff", marginBottom: 20 }}
            leftIcon="phone-ring-outline"
            placeholder="Phone Number"
            autoCapitalize="none"
            keyboardType="number-pad"
            returnKeyType="done"
            autoFocus={true}
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />

          <InputField
            inputStyle={{ fontSize: 14 }}
            containerStyle={{ backgroundColor: "#fff", marginBottom: 20 }}
            leftIcon="map-marker-circle"
            placeholder="Address"
            autoCapitalize="none"
            autoFocus={true}
            value={address}
            onChangeText={(text) => setAddress(text)}
          />


          <Yellow style={{ position: "absolute", marginTop: 379 }} />
          <Cactus style={{ position: "absolute", marginTop: 359 }} />

          <InputField
            inputStyle={{
              fontSize: 14,
            }}
            containerStyle={{
              backgroundColor: "#fff",
              marginBottom: 20,
            }}
            leftIcon="lock"
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType="password"
            rightIcon={rightIcon}
            value={password}
            onChangeText={(text) => setPassword(text)}
            handlePasswordVisibility={handlePasswordVisibility}
          />

          {signupError ? (
            <ErrorMessage error={signupError} visible={true} />
          ) : null}
          <Button
            onPress={onHandleSignup}
            backgroundColor="black"
            title="Signup"
            tileColor="#fff"
            titleSize={18}
            containerStyle={{
              marginBottom: 9,
            }}
          />

          <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
            <Subtitle style={{ fontSize: 12, marginLeft: 2 }}>Already have an account?</Subtitle>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Title style={{ marginLeft: 2, bottom: 5, fontSize: 17 }}>Log In</Title>
            </TouchableOpacity>
          </View>
          <View style={styles.borderStyle} />
          {/*
          <RNButton
            onPress={() => navigation.navigate("Login")}
            title="Go to Login"
            color="#fff"
          />
*/}

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faedcd",
    paddingTop: 0,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    alignSelf: "center",
    paddingBottom: 24,
  },
  borderStyle: {
    borderWidth: 0.6,
    borderColor: 'white',
    alignSelf: 'center',
    width: '40%',
    marginTop: 4
  }
});
