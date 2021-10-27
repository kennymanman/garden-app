import React, { useContext, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import {Header, Left, Right, Title, Body, Subtitle} from "native-base"
import { Button } from "react-native-elements";
import { Feather } from '@expo/vector-icons';
import {AddListedContext, AddCartContext} from "../screens/CartContext"





export default function Grocerylist({navigation}) {



  const {updateCart} = useContext(AddCartContext)
  const { cart } = useContext(AddCartContext)
  



const {updateListed} = useContext(AddListedContext)
const {listed}= useContext(AddListedContext)

const{removeFromListed}= useContext(AddListedContext)





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
<Title   style={{width:300, textAlign:"center"}}>My Grocery List</Title>
</Body>


<Right>
</Right>
</Header>








<ScrollView >
<View  >

{listed.map(({ name, image, price, description, vendor, images}  )=> (

<TouchableOpacity    onPress={()=> navigation.navigate("ProductPage" , { name: name , price: price, images:images, description:description, vendor: vendor})}>
  <ImageBackground

  source={image ? image: require("../img/sig.png")} 
     imageStyle={{borderRadius:12}}
     key={name}

  style={{
    height: 187,
    width: 186,
    position: 'relative', // because it's parent
    marginBottom:8,
    marginTop:19,
    marginRight:7,
    marginLeft:4,
    top: 2,
    left: 12
  }}
>




  <Text    
    style={{
      fontWeight: 'bold',
      color: 'white',
      position: 'absolute', // child
      bottom: 0, // position where you want
      left: 0,
      marginBottom:55,
      marginLeft:10,
      fontSize: 20
    }}
  >
    {name}
  </Text>

<Text style={{bottom:0, left:0,position:"absolute", fontSize:15,marginBottom:35, marginLeft:10,color:"white"}}>${price}</Text>


  {/*} <Text style={{bottom:0, left:0,position: "absolute", marginLeft:10, color:"white", fontSize:12, marginBottom:5}}>
  
  {description}  </Text> */}



  <Button type="clear"    
   style={{top:0, paddingLeft:152, right:0, marginTop:2, }}
icon ={  <FontAwesome name="remove"  size={17} color="white"     />}
onPress={()=> removeFromListed({name, price, image})}
/>


<Button type="clear"    
   style={{top:0, paddingLeft:150, right:0, marginTop:5}}
icon ={  <Feather name="shopping-bag"  size={17} color="white"     />}
onPress={()=> {updateCart({name, price, image}); Handlepress();   }}
/>


</ImageBackground>

</TouchableOpacity>


))}


</View>

</ScrollView>










</View>
    )
}
