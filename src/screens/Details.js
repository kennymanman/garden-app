import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import {Header, Left, Right, Title, Body, Subtitle} from "native-base"
import { Button } from "react-native-elements";
import { Feather } from '@expo/vector-icons';
import InputField from "../Components/InputField";




export default function Details({navigation}) {


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");



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





<ScrollView snapToEnd={false}> 


<InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
          marginTop:40
        }}
        leftIcon="nature-people"
        placeholder="First Name"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />


<InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
          marginTop:20
        }}
        leftIcon="human-handsdown"
        placeholder="Last Name"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />



<InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
          marginTop:20
        }}
        leftIcon="email-multiple-outline"
        placeholder="Email Address"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />



<InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
          marginTop:20
        }}
        leftIcon="phone-ring-outline"
        placeholder="Phone Number"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />


<InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
          marginTop:20
        }}
        leftIcon="map-marker-circle"
        placeholder="Delivery Address"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={address}
        onChangeText={(text) => setAddress(text)}
      />


<Button

style={{borderRadius:45, width:300, backgroundColor:"black", alignSelf:"center"}}
  title="Save Changes"
  type="solid"
/>


</ScrollView>

</View>


    )
}
