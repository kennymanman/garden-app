import React from 'react'
import { View, Text } from 'react-native'
import {Header, Left, Right, Title, Body, Subtitle} from "native-base"
import { Button } from "react-native-elements";
import { Feather } from '@expo/vector-icons';




export default function Details({navigation}) {
return (
<View>

<Header style={{marginTop: 3}}>
<Left>

<Button  type="clear" style={{paddingLeft:9}}
   icon ={<Feather name="arrow-left"
   size={20}
   color="black"     />}
            
  onPress={() => navigation.navigate("My Profile")} />  

</Left>
        
<Body>
<Title   style={{width:300, textAlign:"center"}}>My Details</Title>
</Body>


<Right>
</Right>


</Header>

<Text>My Details</Text>
</View>


    )
}
