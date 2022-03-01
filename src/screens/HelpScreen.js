import React from 'react'
import { View, Text, ImageBackground, ScrollView } from 'react-native'
import { Button } from "react-native-elements"
import { Ionicons } from '@expo/vector-icons'
import { Header, Left, Right, Title, Body, Subtitle } from "native-base"
import { Feather } from '@expo/vector-icons';
import Center from "../Svg/Center.svg"
import Downpoint from "../Svg/Downpoint"
import Shine from "../Svg/Shine.svg"
import Green from "../Svg/Green.svg"
import Orang from "../Svg/Orang.svg"



export default function HelpScreen({ navigation }) {
  return (

    <View>
      <Header>
        <Left>

          <Button type="clear" style={{ paddingLeft: 9 }}
            icon={<Feather name="arrow-left"
              size={25}
              color="white" />}
            onPress={() => navigation.goBack()} />

        </Left>

        <Body>
          <Title style={{ textAlign: "center" }}>Help & Support</Title>
        </Body>

        <Right>
        </Right>
      </Header>

      <ScrollView >

        <Shine style={{ position: "absolute", margin: 15 }} />
        <Text style={{ textAlign: "center", fontSize: 33, marginTop: 30 }}>Need Help?</Text>

        <Center style={{ position: "absolute", marginTop: 51, marginLeft: 40 }} />

        <Text style={{ textAlign: "center", fontSize: 18, marginTop: 80 }}>Contact Us</Text>

        <Downpoint style={{ marginTop: 80, marginLeft: 170 }} />

        <Title style={{ marginTop: 20, left: 15, color: 'black' }}>Call Us</Title>
        <Subtitle style={{ fontSize: 11, left: 15, marginTop: 5, color: 'grey' }}>We at the Garden Support team are here to help guide you through </Subtitle>
        <Subtitle style={{ fontSize: 11, left: 15, color: 'grey' }}>issues you may be experiencing. Feel free to call us.</Subtitle>
        <Title style={{ marginTop: 5, left: 15, color: 'grey', fontSize: 15 }}>081-123-456-78</Title>
        <Green style={{ marginLeft: 10 }} />
        <View style={{ marginLeft: 15, marginRight: 15, bottom: 70 }}>
          <Title style={{ color: 'black', bottom: 30 }}>Or</Title>

          <Title style={{ color: 'black' }}>Email</Title>
          <Subtitle style={{ color: 'grey', marginTop: 5, fontSize: 11 }}>Reach us through email. Any issues or questions you may have will </Subtitle>
          <Subtitle style={{ color: 'grey', fontSize: 11 }}>be replied to shortly.</Subtitle>
          <Title style={{ color: 'grey', marginTop: 5, fontSize: 15 }}>contact@garden.com</Title>
        </View>
        <Orang style={{ bottom: 50, marginLeft: '60%' }} />

      </ScrollView>

    </View>
  );
}
