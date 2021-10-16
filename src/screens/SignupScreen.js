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
} from "react-native";

import ErrorMessage from "../Components/ErrorMessage";
import Button from "../Components/Button";
import InputField from "../Components/InputField";
import Firebase from "../config/firebase";
import { registration } from "../../API/firebaseMethods";

const auth = Firebase.auth();

export default function SignupScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
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
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Create new account</Text>

          <InputField
            inputStyle={{
              fontSize: 14,
            }}
            containerStyle={{
              backgroundColor: "#fff",
              marginBottom: 20,
            }}
            leftIcon="account-tie"
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
            leftIcon="account-tie"
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
            leftIcon="email"
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <InputField
            inputStyle={{ fontSize: 14 }}
            containerStyle={{ backgroundColor: "#fff", marginBottom: 20 }}
            leftIcon="cellphone-basic"
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
            leftIcon="earth"
            placeholder="Address"
            autoCapitalize="none"
            autoFocus={true}
            value={address}
            onChangeText={(text) => setAddress(text)}
          />

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
            backgroundColor="#f57c00"
            title="Signup"
            tileColor="#fff"
            titleSize={20}
            containerStyle={{
              marginBottom: 24,
            }}
          />
          <RNButton
            onPress={() => navigation.navigate("LoginScreen")}
            title="Go to Login"
            color="#fff"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#707070",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    alignSelf: "center",
    paddingBottom: 24,
  },
});
