import React, {useContext} from 'react'
import {
   View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView,
     Alert     
  }
    from "react-native"
import { Button } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome5"
import {Title, Left} from "native-base"
import { Feather } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { Entypo } from "@expo/vector-icons"
import { FAB } from "react-native-paper"
import {AddCartContext} from "./CartContext"
import DropdownMenu from 'react-native-dropdownmenus';




export default function CartScreen({navigation}) {

  const {updateCart} = useContext(AddCartContext)
    const { cart } = useContext(AddCartContext)
    
const{removeFromCart}= useContext(AddCartContext)





const Kandlepress = () =>
Alert.alert(
  "Removed",
  
);






    
return (



<View style={{flex: 1, padding: 0, backgroundColor: "#eaeaea"}} >

<ImageBackground
source={require('../img/jie.jpg')}
imageStyle={{borderRadius:0}}
style={{
height: 821,
backgroundSize:"cover",
position: 'relative', // because it's parent
top: 0,
     }}
>
             
             
             
             
<Button style={{ alignItems: "flex-end",
          paddingTop:45,
          paddingRight:12}} 
type="clear"
icon={
<Icon
name= "bars"
size= {20}
color= "black"
/>
}
onPress={() => navigation.openDrawer()} />  


<Title              //For the Main screen title
style={{fontSize:35,
color:"white",
paddingLeft: 32,
textAlign:"left"}} >Cart</Title>


<Title style={{fontSize:13, //For the delivery address
  color:"white",
  paddingLeft: 32,
  textAlign:"left",
  paddingTop:12,
paddingBottom:10}}>Deliver to: 92 lanre awolokun Gbagada </Title>



<TouchableOpacity onPress={() => navigation.navigate ( "DeliveryScreen") }>

<Text style={{
 paddingLeft:32,
 color:"blue",
 fontSize:12

}}>Change Address</Text>
</TouchableOpacity>






<ScrollView style={{marginBottom:2, marginTop:18}}> 





        <View style={{ 
            flex: 1,
            //justifyContent:"flex-start",
            padding: 3,
            flexDirection:'column',
            //alignItems:'center'

            }}>



              
            

            {cart.map(({ name, count, image, price, images, description, vendor})=> (

            <View style={{  flexDirection:"row"}}  key={name}>   





<TouchableOpacity    onPress={()=> navigation.navigate("ProductPage" , { name: name , price: price, images:images, description:description, vendor: vendor})}>
<ImageBackground 
              
              source={image ? image: require("../img/sig.png")}
              imageStyle={{borderRadius:12}} //For reshaping the image.
                
              style={{
               height: 140,
               width: 150,
               position: 'relative', // because it's parent
               marginBottom:15,
               marginTop:5,
               marginRight:1,
               marginLeft:4,
               //top: 2,
               left: 2
                  }}
                >
                
                
              <Button
              type="clear"    
              style={{ 
                top:0,
                paddingLeft:1,
                left:0,
                marginTop:2,
                marginRight:118 }}
              icon ={  <FontAwesome name="remove"
              size={17}
              color="white"      />}
              onPress={()=> {removeFromCart({name, price, image}); Kandlepress();}}
              /> 
              </ImageBackground> 

</TouchableOpacity>



              <View style={{flexDirection:"column", paddingRight:90}}>
            <Title 
            style={{
              marginBottom:2,   //For passing down the Name.
              marginRight:70,
              marginTop:19,
              fontSize:20,
              color:"white"}}>
                 {""} {name}
            </Title>
            

            

            <Title style={{ 
              marginRight:90,  //For passing down the Price.
              marginBottom:3,
              marginTop:5,
              fontSize:17,
              color:"white"
              }}>${price} {""}
              </Title>
            


            <Title  style={{ marginRight:112,  //For passing down the quantity needed.
             marginBottom:10,
             marginTop:6,
             marginLeft:20,
             marginRight:85,
             fontSize:12,
             color:"white"}}>Quantity:{count}</Title>
            
            
            </View>





            {/*<View style={{flexDirection:"row", //Row for flex direction was used to align multiple items on the same line.
             paddingLeft:12,
             marginBottom: 40}}>
            
            
            
            <FAB                           //Fab is the increment button.
              style={{paddingLeft:1,
              marginRight:10,
              position:"absolute"}}
              small
              animated
            icon ="plus"
            color="white"
            onPress={() => console.log('Pressed')}
            />
            
            <FAB                          //Fab is the decrement button.
             style={{marginRight:20,
              paddingRight:1,
              position:"absolute",
              marginLeft:65 }}
              small
              animated
            icon ="minus"
            color="white"
            onPress={() => console.log('Pressed')}
            />
            
            
             </View>*/}


            </View>

            ))}

            </View>



<Title style={{fontSize:20,                     //Delivery Fee
  color:"white",
  paddingLeft: 32,
  textAlign:"left",
  paddingTop:20,
  paddingBottom:10}}>Delivery Fee: $32 </Title>

<Title style={{fontSize:20,                       //Total Price
   color:"white",
  paddingLeft: 32,
  textAlign:"left",
  paddingTop:1,
  paddingBottom:10}}>Total: $100 </Title>

<Button  //Checkout Button

buttonStyle={{
  backgroundColor: "black"
}}

title="Proceed to Checkout"
style={{marginBottom:20,
width:300,
marginTop:9,
alignSelf: "center",
paddingRight:20,
height:100, position:"relative", paddingLeft:13}}
/>



</ScrollView>
</ImageBackground>
</View>

















    )
}
