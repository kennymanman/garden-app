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
import Toast from 'react-native-simple-toast';
import Green from "../Svg/Green.svg"
import Cheetos from "../Svg/Cheetos.svg"


const auth = Firebase.auth();

export default function ChangePasswordScreen({ navigation }) {
    const [email, setEmail] = useState("user@gmail.com");
    const [oldpassword, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
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


    const changePassword = async () => {
        if (!email) {
            Alert.alert("Email field is required.");
        } else if (!oldpassword) {
            Alert.alert("Enter old password");
        } else if (!newpassword) {
            Alert.alert("Enter new password");
        } else {
            Firebase.auth()
                .signInWithEmailAndPassword(email, oldpassword)
                .then(function (user) {
                    console.log('user get', user)
                    Alert.alert(user.message)
                    Firebase.auth().currentUser.updatePassword(newpassword).then(function (data) {
                        //console.log('update password')
                        Alert.alert('Your password is updated');
                        //Do something

                    }).catch(function (err) {
                        console.log('update password error', err)
                        Alert.alert(err.message)
                    });

                }).catch(function (err) {
                    console.log('user get error', err)
                    Alert.alert(err.message)
                });
        }
    }


    return (
        <View style={styles.container}>
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
                    placeholder="Old password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={passwordVisibility}
                    textContentType="password"
                    rightIcon={rightIcon}
                    value={oldpassword}
                    onChangeText={(text) => setOldPassword(text)}
                    handlePasswordVisibility={handlePasswordVisibility}
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
                    placeholder="New password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={passwordVisibility}
                    textContentType="password"
                    rightIcon={rightIcon}
                    value={newpassword}
                    onChangeText={(text) => setNewPassword(text)}
                    handlePasswordVisibility={handlePasswordVisibility}
                />
                {/* <Cheetos style={{ position: "absolute", marginTop: 240 }} /> */}

                {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}

                <Button
                    onPress={changePassword}
                    backgroundColor="black"
                    title="Change Password"
                    tileColor="#fff"
                    titleSize={18}
                />

                <Subtitle
                    onPress={() => navigation.navigate("Login")}
                    style={{ fontSize: 13, color: 'black', marginTop: 20, alignSelf: 'center' }}>Back To Login</Subtitle>
                <View style={styles.borderStyle} />

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
        borderBottomWidth: 1,
        borderColor: 'white',
        alignSelf: 'center',
        width: '20%',
        marginTop: 7
    },
    signupTextStyle: {
        marginLeft: 2,
        bottom: 3,
        fontSize: 15,
        color: "orange"
    }

});