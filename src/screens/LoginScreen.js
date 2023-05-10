import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button as RNButton,
  Alert,
  SafeAreaView,
  TouchableOpacity
} from "react-native";

import { Title, Body, Subtitle } from "native-base"

import ErrorMessage from "../Components/ErrorMessage";
import Button from "../Components/Button";
import InputField from "../Components/InputField";
import Firebase from "../config/firebase";
import { signIn } from "../../API/firebaseMethods";
import Green from "../Svg/Green.svg"
import Cheetos from "../Svg/Cheetos.svg"
import { getConfiguration } from "../Components/configuration";


const auth = Firebase.auth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("mobileteam@gmail.com");
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
    const db = Firebase.firestore();
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      console.log("Response of login----", response);
      const current = auth.currentUser.uid;
      let token = await getConfiguration('fcmToken');
      console.log('get fcm token', token)

      await db.collection("users").doc(current).update({ expoToken: token });

      // return true;
    } catch (err) {
      Alert.alert("There is something wrong!", err.message);
      // return false;
    }
  };

  return (
    <View style={styles.container} >
      <SafeAreaView>
        <StatusBar style="dark-content" />

        <Green style={{ position: "absolute" }} />


        <Text style={{
          fontSize: 52,
          fontWeight: "600",
          color: "black",
          alignSelf: "center",
          paddingBottom: 2,
          fontFamily: "recoleta-black",
          paddingTop: 120

        }}>Garden<Text style={{ color: "orange", fontSize: 55 }}>.</Text></Text>

        <Subtitle style={{ paddingBottom: 12 }}>Groceries at your doorstep</Subtitle>

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

        <Cheetos style={{ position: "absolute", marginTop: 240 }} />



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
          backgroundColor="black"
          title="Login"
          tileColor="#fff"
          titleSize={18}
          containerStyle={{
            marginBottom: 12
          }}
        />
        <Subtitle
          onPress={() => navigation.navigate("ChangePassword")}
          style={{ fontSize: 13, marginLeft: 1, color: 'black' }}>Change Password</Subtitle>

        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>

          <Subtitle style={{ fontSize: 12, color: 'black' }}>Don't have an account?</Subtitle>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Title style={styles.signupTextStyle}>SignUp</Title>
          </TouchableOpacity>
        </View>
        <View style={styles.borderStyle} />
        {/*<RNButton 
        onPress={() => navigation.navigate("Signup")}
        title="Signup"
        color="black"
      />*/}

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faedcd",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  borderStyle: {
    borderWidth: 0.6,
    borderColor: 'white',
    alignSelf: 'center',
    width: '40%',
    marginTop: 5
  },
  signupTextStyle: {
    marginLeft: 2,
    bottom: 3,
    fontSize: 15,
    color: "orange"
  }

});

