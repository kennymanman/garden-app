import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import { Container, Header, Content, Item, Input, Button, Icon } from 'native-base';
//import { TouchableOpacity } from 'react-native-gesture-handler';





export default function LogIn({ navigation }) {
  return (

    <View>
      <ScrollView>
        <ImageBackground

          source={require('../img/run.png')}

          style={{
            height: 800,
            width: 375,
            position: 'relative', // because it's parent

            top: 0,

          }}

        />




        <Text style={{ marginLeft: 25, marginBottom: 5, color: "white", position: "absolute", top: 369 }}>Email Address</Text>
        <Item style={{ marginBottom: 20, marginRight: 24, marginLeft: 15, backgroundColor: "white", position: "absolute", top: 389 }} rounded>
          <Input style={{ fontSize: 15 }} placeholder='' />
        </Item>




        <Text style={{ marginLeft: 25, marginBottom: 5, color: "white", position: "absolute", top: 455 }}>Password</Text>
        <Item style={{ marginBottom: 20, marginRight: 24, marginLeft: 15, backgroundColor: "white", position: "absolute", top: 479 }} rounded>
          <Input style={{ fontSize: 15 }} placeholder='' />
        </Item>



        <TouchableOpacity style={{ position: "absolute" }} onPress={() => navigation.navigate("SignUp")} >
          <Text style={{ position: "absolute", top: 540, textAlign: "left", color: "#148dff", fontSize: 12, marginLeft: 22 }}>Create an account?</Text>
        </TouchableOpacity>



        <Button style={{ marginLeft: 69, paddingLeft: 90, paddingRight: 90, paddingTop: 30, paddingBottom: 30, marginBottom: 40, position: "absolute", marginTop: 570 }} rounded dark>
          <Text style={{ color: "white", textAlign: "center", paddingBottom: 20, fontSize: 16 }}>Log In</Text>
        </Button>

      </ScrollView>


    </View>
  )
}
