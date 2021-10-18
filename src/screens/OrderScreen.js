import React from 'react'
import { View, Text, ImageBackground, ScrollView } from 'react-native'
import { Button } from "react-native-elements"
import { Ionicons } from '@expo/vector-icons'
import {Header, Left, Right, Title, Body, Subtitle} from "native-base"
import { Feather } from '@expo/vector-icons';





export default function OrderScreen({navigation}) {

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
    <Title   style={{width:300, textAlign:"center"}}>My Order History</Title>
    </Body>
    
    
    <Right>
    </Right>
  </Header>
    


<ScrollView   snapToEnd={false}>


<Text style={{marginTop:40, fontWeight: "bold", left:9}}>Order Date: 25th August 1992</Text>

<Text style={{marginTop:10, fontWeight: "bold", left:9}}>Delivery Address: Mark Road Street</Text>

<Text style={{marginTop:20, color: "#60d394", left:9, fontSize:20, fontWeight: "bold"}} >Successful</Text>


<View style={{  flexDirection:"row"}}>

<ImageBackground 
              
source={require("../img/sig.png")}  //This is where the image of product bought goes to.
imageStyle={{borderRadius:12}} //For reshaping the image.
                
              style={{
               height: 140,
               width: 150,
               position: 'relative', // because it's parent
               marginBottom:15,
               marginTop:120,
               marginRight:1,
               marginLeft:4,
               //top: 2,
               left: 2
                  }}
                >
                
</ImageBackground> 


<View style={{flexDirection:"column", paddingRight:90, paddingTop:120}}>
<Title 
            style={{
              marginBottom:2,   //For passing down the Name.
              marginRight:88,
              marginTop:30,
              fontSize:20,
              
              color:"black"}}>
                 {""} Fruit
</Title>
            

            

<Title style={{ 
              marginRight:90,  //For passing down the Price.
              marginBottom:3,
              marginTop:5,
              fontSize:17,
              color:"black"
}}>$500
</Title>
            


            <Title  style={{ marginRight:112,  //For passing down the quantity bought.
             marginBottom:10,
             marginTop:6,
             marginLeft:20,
             marginRight:85,
             fontSize:12,
             color:"black"}}>Quantity:6</Title>



             
            
</View>

<Title style={{position:"absolute", top:280, left:0, marginLeft:5}}
>Total Price: $600</Title>

            </View>

</ScrollView>  


</View>








  )
}