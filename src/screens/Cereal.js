import React, {useContext, useState} from "react"
import { View,
  Text, 
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity, 
  Alert}
   from "react-native"
import { Button } from "react-native-elements";
import { Feather } from '@expo/vector-icons';

import {Header, Left, Right, Title, Body, Subtitle} from "native-base"
import data from "./data"
import {AddCartContext, AddSavedContext} from "../screens/CartContext"












export default function Cereal ({navigation , ...props}) {

  
const {updateCart} = useContext(AddCartContext)
const {updateSaved} = useContext(AddSavedContext)


const useCart = updateCart
const useSaved = updateSaved


const Handlepress = () =>
    Alert.alert(
      "Added to Cart",
      
    );


const Bandlepress = () =>
    Alert.alert(
      "Saved"
    )










//Structure of the product list.
 const Form = ({name, description, price,  id, image, images, vendor}) => (
  
  <ImageBackground
source={image ? image: require("../img/sig.png")}  //Background Image
imageStyle={{borderRadius:12}}

  style={{
    height: 220,
    width: 175,
    position: "relative", // because it's parent
    marginBottom:15,
    marginTop:19,
    marginRight:7,
    marginLeft:4,
    top: 2,
    left: 2
  }}
>

<Text    
  style={{
      fontWeight: "bold",
      color: "white",
      position: "absolute", // child
      bottom: 0, // position where you want
      left: 0,
      marginBottom:55,
      marginLeft:10,
      fontSize: 20
    }}
  >
    {name}
  </Text>


<Text style={{
  bottom:0,
   left:0,
   position:"absolute",
    fontSize:15,
    marginBottom:30,
     marginLeft:10,
     color:"white"
     }}>${price} {""}</Text>



 {/* <Text style={{
    bottom:0,
     left:0,
     position: "absolute",
      marginLeft:10,
       color:"white",
        fontSize:12,
         marginBottom:5}}>
  
 {description}{""}  </Text> */}




<View style={{flexDirection:"row"}}>

<Button type="clear"    
   style={
     {//right:0,
       top:0,
        marginTop:3,
         paddingLeft: 8,
         }}
icon ={  <Feather name="heart"  size={15} color="white"     />}
onPress={()=> {updateSaved ({name, price, description, image, images, vendor}); Bandlepress();  }}

/>





<Button

 type="clear"    
  style={
  {right:0,
    top:0,
        marginTop:3,
         paddingLeft: 94,
         }}
icon ={  <Feather name="shopping-bag"  size={15} color="white"     />}
onPress={()=> {updateCart({name, price, image, images, description, vendor}); Handlepress();    }} 

/>

</View>

</ImageBackground>
);
  












//Render Items.
  const renderItem= ({ item, id, useCart, useSaved  })=> (  //had to remove navigation here so i could also render navigation.
  <TouchableOpacity    onPress={()=> navigation.navigate("ProductPage" , { name: item.name , price: item.price, images: item.images, description: item.description, vendor: item.vendor})}>
      <Form
       id={item.id}
       name={item.name} 
       description={item.description}
       image={item.image}
       price={item.price}
      images={item.images}
      vendor={item.vendor}
      
       />
      </TouchableOpacity>
       
  )
  




return (

<View >
<Header style={{marginTop: 3}}>
<Left>
<Button  type="clear" style={{paddingLeft:9}}
icon={<Feather name="arrow-left" size={20} color="black" />}
            
  onPress={() => navigation.navigate("SearchScreen")} />  
</Left>
<Body>
<Title style={{width:300}} >Cereal</Title>
</Body>
<Right>
   
</Right>

</Header>



<View style={{ marginBottom:100, paddingBottom:80}}>
  
    <FlatList    numColumns={2}   
data={data}
 renderItem={renderItem}
 renderItem={({ item }) => renderItem({ navigation, item, useCart, useSaved })}
keyExtractor={item=>item.id}
 />


</View>

        </View>

        
    )
}














const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#eaeaea"
      },

      rest: {
          textAlign: "center",
          marginTop: 100
      },

      best: {
          justifyContent: "flex-start",
          marginTop: 20
      },

      titch: {
          
          alignSelf: "flex-end",
          paddingRight:9,
          paddingTop: 1
      }
})