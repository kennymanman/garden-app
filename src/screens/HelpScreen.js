import React from 'react'
import { View, Text, ImageBackground, ScrollView } from 'react-native'
import { Button } from "react-native-elements"
import { Ionicons } from '@expo/vector-icons'
import {Header, Left, Right, Title, Body, Subtitle} from "native-base"
import { Feather } from '@expo/vector-icons';
import Center from "../Svg/Center.svg"
import Downpoint from "../Svg/Downpoint"
import Shine from "../Svg/Shine.svg"
import Green from "../Svg/Green.svg"
import Orang from "../Svg/Orang.svg"



export default function HelpScreen({navigation}) {
return (

<View>
<Header style={{marginTop: 3}}>
<Left>
    
<Button  type="clear" style={{paddingLeft:9}}
icon ={<Feather name="arrow-left"
size={20}
color="black"     />}
onPress={() => navigation.goBack()} />  
    
</Left>
            
<Body>
<Title   style={{width:300, textAlign:"center"}}>Help & Support</Title>
</Body>
    
<Right>
</Right>
</Header>



<ScrollView


>

<Shine style={{position:"absolute"}}/>
<Text style={{textAlign:"center", fontSize:33, marginTop:30}}>Need Help ?</Text>


<Center style={{position:"absolute", marginTop:51, marginLeft:40}} />



<Text style={{textAlign:"center", fontSize:18, marginTop:80}}>Contact Us</Text>

<Downpoint style={{ marginTop:80, marginLeft:170}} />


<Title style={{marginTop:15}}>Call Us</Title>
<Subtitle style={{fontSize:11}}>We at the Garden Support team are here to help guide you through </Subtitle>
<Subtitle>issues you may be experiencing. Feel free to call us.</Subtitle>
<Title>081-123-456-78</Title>
<Green/>

<Title>Or</Title>

<Title>Email</Title>
<Subtitle>Reach us through email. Any issues or questions you may have will </Subtitle>
<Subtitle>be replied to shortly.</Subtitle>
<Title>contact@garden.com</Title>
<Orang style={{marginLeft:250}} />

</ScrollView>

     </View>
  );
}
