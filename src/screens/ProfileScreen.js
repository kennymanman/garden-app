import React, { useContext} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Firebase from '../config/firebase';
import  IconButton   from '../Components/IconButton';
import {AuthenticatedUserContext} from '../Providers/AuthenticatedUserProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'; 
import {Header, Left, Right, Title, Body, Subtitle} from "native-base"
import { Button } from "react-native-elements";






const auth = Firebase.auth();

export default function ProfileScreen({navigation}) {

  const { user, setUser } = useContext(AuthenticatedUserContext);




//Copy this to enable signout function..
const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };





return (

<View>
<Header style={{marginTop: 3}}>
<Left>
</Left>
        
<Body>
<Title   style={{width:300}}>My Profile</Title>
</Body>
<Right>
</Right>
</Header>




<View style={{margin:30}}>
<Text style={{fontSize:15,
                textAlign:"center",
                 marginTop:30 }}>
                   Welcome {user.email}
</Text>




        <TouchableOpacity onPress={() =>navigation.navigate ("Details" ) } >
        <View style={{flexDirection:"row", marginTop:40}}>
       
          <MaterialCommunityIcons
          name="card-account-details-star-outline"
           size={26} 
           color="black" />

           <Title style={{marginLeft:30, paddingTop:6, fontSize:15}}>My Details</Title>
          </View>
        </TouchableOpacity>





        <TouchableOpacity onPress={() =>navigation.navigate ("My Orders" ) } >
        <View style={{flexDirection:"row", marginTop:40}}>
        <Feather name="shopping-bag"
         size={24} 
         color="black" />
         <Title style={{marginLeft:30, paddingTop:6, fontSize:15}}>Order History</Title>
         </View>
        </TouchableOpacity>





        <TouchableOpacity onPress={() =>navigation.navigate ("My Grocery List" ) } >
      <View style={{flexDirection:"row", marginTop:40}}>
      <MaterialCommunityIcons
          name="format-list-bulleted-square"
           size={26}
            color="black" />

      <Title style={{marginLeft:30, paddingTop:6, fontSize:15}}>Grocery List</Title>  
           </View>
</TouchableOpacity>






<View style={{flexDirection:"row", marginTop:40}}>
           <MaterialCommunityIcons
            name="account-key-outline"
             size={26} 
             color="black" />
<Title style={{marginLeft:30, paddingTop:6, fontSize:15}}>Change Password</Title> 

</View>





<TouchableOpacity onPress={() =>navigation.navigate ("Help & Support" ) } >
<View style={{flexDirection:"row", marginTop:40}}>
<MaterialCommunityIcons
 name="help-box"
  size={26}
   color="black" />


 <Title style={{marginLeft:30, paddingTop:6, fontSize:15}}>Help & Support</Title>
  </View>
</TouchableOpacity>






<TouchableOpacity onPress={handleSignOut } >
  <View style={{flexDirection:"row", marginTop:40 }} >
  <MaterialCommunityIcons
   name="exit-to-app"
    size={26}
     color="black" />
     <Title style={{marginLeft:30, paddingTop:6, fontSize:15}}>Log Out</Title>

</View>
</TouchableOpacity>





          
</View>

</View>

    )
}
