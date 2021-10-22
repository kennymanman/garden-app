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

import {Title, Body, Subtitle} from "native-base"

import ErrorMessage from "../Components/ErrorMessage";
import Button from "../Components/Button";
import InputField from "../Components/InputField";
import Firebase from "../config/firebase";
import { signIn } from "../../API/firebaseMethods";
import Green from "../Svg/Green.svg"
import Cheetos from "../Svg/Cheetos.svg"


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
      <SafeAreaView>
      <StatusBar style="dark-content" />

<Green style={{position:"absolute"}}/>


      <Text style={{ fontSize: 52,
    fontWeight: "600",
    color: "black",
    alignSelf: "center",
    paddingBottom: 2,
    fontFamily:"recoleta-black",
    paddingTop:120
    
    }}>Garden<Text style={{color:"orange", fontSize:55}}>.</Text></Text>

    <Subtitle style={{paddingBottom: 12}}>Groceries at your doorstep</Subtitle>

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

<Cheetos style={{position:"absolute", marginTop:240}} />



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
        titleSize={20}
        containerStyle={{
          marginBottom: 24,
        }}
      />


<Subtitle style={{fontSize:12}}>Don't have an account?</Subtitle>

<TouchableOpacity  onPress={() => navigation.navigate("Signup")}>
<Title style={{marginTop:7}}>SignUp</Title>
</TouchableOpacity>

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
  }
 
});

