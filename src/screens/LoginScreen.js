import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button as RNButton,
  Alert,
} from "react-native";

import ErrorMessage from "../Components/ErrorMessage";
import Button from "../Components/Button";
import InputField from "../Components/InputField";
import Firebase from "../config/firebase";
import { signIn } from "../../API/firebaseMethods";

const auth = Firebase.auth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [loginError, setLoginError] = useState("");

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLogin = async () => {
    // const res = signIn(email, password);

    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      console.log("Response of login----", response);
      // return true;
    } catch (err) {
      Alert.alert("There is something wrong!", err.message);
      // return false;
    }

    // try {
    //   if (email !== "" && password !== "") {
    //     await auth.signInWithEmailAndPassword(email, password);
    //   }
    // } catch (error) {
    //   setLoginError(error.message);
    // }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <Text style={styles.title}>Login</Text>

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
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        leftIcon="lock"
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType="password"
        rightIcon={rightIcon}
        value={password}
        onChangeText={(text) => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />

      {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}

      <Button
        onPress={onLogin}
        backgroundColor="green"
        title="Login"
        tileColor="#fff"
        titleSize={20}
        containerStyle={{
          marginBottom: 24,
        }}
      />

      <RNButton
        onPress={() => navigation.navigate("Signup")}
        title="Go to Signup"
        color="black"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0000",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
    alignSelf: "center",
    paddingBottom: 24,
  },
});
