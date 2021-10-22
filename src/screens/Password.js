import React, { useContext, useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import {Header, Left, Right, Title, Body, Subtitle} from "native-base"
import { Button } from "react-native-elements";
import { Feather } from '@expo/vector-icons';

import * as font from 'expo-font';
import { AppLoading } from 'expo-font';




export default function Password({navigation}) {








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
<Title   style={{width:300, textAlign:"center"}}>Change my password</Title>
</Body>


<Right>
</Right>
</Header>
            <Text style={{fontFamily:"recoleta-bold", fontSize:70}}>Garden.</Text>
        </View>
    )
}
