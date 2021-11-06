import React from 'react'
import { View, Text } from 'react-native'
import { Header, Left, Right, Title, Body, Subtitle } from "native-base";
import { Button } from "react-native-elements"
import { Feather } from "@expo/vector-icons";
import Green from "../Svg/Green.svg"
import Flower from "../Svg/Flower.svg"
import Outlinecloud from "../Svg/Outlinecloud.svg"


export default function Checkout({navigation}) {
    return (
        <View>

<Header style={{ marginTop: 3 }}>

<Left>
<Button
type="clear"
style={{ paddingLeft: 9 }}
icon={<Feather name="arrow-left" size={20} color="black" />}
onPress={() => navigation.goBack()}
          />


</Left>
<Body>
<Title style={{ width: 300, textAlign: "center" }}>Payment Checkout</Title>
 </Body>
<Right></Right>
</Header>

<Outlinecloud style={{position:"absolute", marginTop:170}} />
<Flower style={{position:"absolute", marginTop:90, alignSelf:"flex-end"}}/>

<Button  //Checkout Button
buttonStyle={{
backgroundColor: "black"
}}

title="Pay on Delivery"
style={{marginBottom:30,
width:300,
marginTop:130,
alignSelf: "center",
height:100}}
/>



<Title >Or</Title>

<Green style={{position:"absolute", marginTop:400}} />

<Button  //Checkout Button
buttonStyle={{
backgroundColor: "black"
}}

title="Pay with Card"
style={{marginBottom:10,
width:300,
marginTop:80,
alignSelf: "center",
height:100}}
/>



        </View>
    )
}
