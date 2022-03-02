import React from 'react';
import { View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Item, Input, Button, Icon, CheckBox } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Title } from 'react-native-paper';
import { Subheading } from 'react-native-paper';




export default function SignUp({ navigation }) {
  return (

    <View style={{ backgroundColor: "#21b464" }}>

      <ScrollView>


        <Button iconLeft transparent light style={{ marginTop: 30, marginLeft: 10 }}
          onPress={() => navigation.navigate("SearchScreen")} >
          <Icon name='arrow-back' color="black" />

        </Button>



        <Title style={{ marginLeft: 15, color: "white", fontSize: 35, marginTop: 40, paddingTop: 20 }}>Create an account

          <Title style={{ color: "yellow", fontSize: 39 }}>.</Title>

        </Title>


        {/*<Title style={{marginLeft: 30, color:"white", fontSize:30, marginTop:15, paddingTop:20}}>Welcome to Garden

<Title style={{color:"yellow", fontSize:39}}>.</Title>



  </Title>*/}




        <View style={{ marginTop: 30 }}>

          <Text style={{ marginLeft: 25, marginBottom: 5, color: "white" }}>Email Address</Text>
          <Item style={{ marginBottom: 20, marginRight: 24, marginLeft: 15, backgroundColor: "white" }} rounded>
            <Input style={{ fontSize: 15 }} placeholder='' />
          </Item>


          <Text style={{ marginLeft: 25, marginBottom: 5, color: "white" }}>First Name</Text>
          <Item style={{ marginBottom: 20, marginRight: 24, marginLeft: 15, backgroundColor: "white" }} rounded>
            <Input style={{ fontSize: 15 }} placeholder='' />
          </Item>


          <Text style={{ marginLeft: 25, marginBottom: 5, color: "white" }}>Last Name</Text>
          <Item style={{ marginBottom: 20, marginRight: 24, marginLeft: 15, backgroundColor: "white" }} rounded>
            <Input style={{ fontSize: 15 }} placeholder='' />
          </Item>



          <Text style={{ marginLeft: 25, marginBottom: 5, color: "white" }}>Phone Number</Text>
          <Item style={{ marginBottom: 20, marginRight: 24, marginLeft: 15, backgroundColor: "white" }} rounded>
            <Input style={{ fontSize: 15 }} placeholder='' />
          </Item>


          <Text style={{ marginLeft: 25, marginBottom: 5, color: "white" }}>Password</Text>
          <Item style={{ marginBottom: 20, marginRight: 24, marginLeft: 15, backgroundColor: "white" }} rounded>
            <Input style={{ fontSize: 15 }} placeholder='' />
          </Item>


          <Text style={{ marginLeft: 25, marginBottom: 5, color: "white" }}>Confirm Password</Text>
          <Item style={{ marginBottom: 20, marginRight: 24, marginLeft: 15, backgroundColor: "white" }} rounded>
            <Input style={{ fontSize: 15 }} placeholder='' />
          </Item>


          <TouchableOpacity style={{ position: "absolute" }} onPress={() => navigation.navigate("LogIn")} >
            <Text style={{ position: "absolute", top: 555, textAlign: "left", color: "#148dff", fontSize: 12, marginLeft: 22 }}>Already have an account?</Text>
          </TouchableOpacity>






          <Text style={{ padding: 20, fontSize: 12 }}> Garden may keep me informed with personalized emails about products and services.By clicking create account, I agree that i have read and accepted the Terms of Use and Privacy Policy.</Text>

          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <CheckBox style={{ marginLeft: 9 }} checked={true} />
            <Text style={{ fontSize: 12, marginLeft: 12, marginTop: 4 }}>I agree to the Terms and Conditions and Privacy Policy.</Text>
          </View>





          <Button style={{ marginLeft: 38, paddingLeft: 90, paddingRight: 90, paddingTop: 30, paddingBottom: 30, marginBottom: 40 }} rounded dark>
            <Text style={{ color: "white", textAlign: "center", paddingBottom: 20, fontSize: 16 }}>Create account</Text>
          </Button>



        </View>









      </ScrollView>
    </View>
  )
}
