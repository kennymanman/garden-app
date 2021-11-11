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
     Alert,
     SafeAreaView   
  }
    from "react-native"
import { Button } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome5"
import { Header, Left, Right, Title, Body, Subtitle } from "native-base";
import { Feather } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { Entypo } from "@expo/vector-icons"
import { FAB } from "react-native-paper"
import {AddCartContext} from "./CartContext"
import { alignSelf } from 'styled-system';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Chevron } from 'react-native-shapes'



export default function CartScreen({navigation}) {

  const {updateCart} = useContext(AddCartContext)
    const { cart } = useContext(AddCartContext)
    
const{removeFromCart}= useContext(AddCartContext)





const Kandlepress = () =>
Alert.alert(
  "Removed",
  
);



const placeholder = {
  label: '1',
  fontSize:12,
  top:12,
  value:1,
  
  
};



    
return (



<View style={{flex: 1, marginTop:70, paddingHorizontal: 12}} >

<SafeAreaView>
             

<Title              //For the Main screen title
style={{fontSize:35,
color:"black",
textAlign:"left"}} >Cart</Title>


<Title style={{fontSize:13, //For the delivery address
  color:"black",
  textAlign:"left",
  paddingTop:12,
paddingBottom:10,
fontFamily:"recoleta-black"
}}>Deliver to: 92 lanre awolokun Gbagada   </Title>



<TouchableOpacity onPress={() => navigation.navigate ( "Details") }>

<Subtitle style={{
 fontSize:13,
 alignSelf:"flex-start"
}}>Change Delivery info</Subtitle>
</TouchableOpacity>






<ScrollView  showsVerticalScrollIndicator={false}
style={{marginBottom:2, marginTop:18}}> 





        <View style={{ 
            flex: 1,
            //justifyContent:"flex-start",
            padding: 3,
            flexDirection:'column',
            //alignItems:'center'

            }}>



              
            

            {cart.map(({ name, count, image, price, images, description, vendor, size})=> (

            <View style={{  flexDirection:"row"}}  key={name}>   





<TouchableOpacity    onPress={()=> navigation.navigate("ProductPage" , { name: name , price: price, images:images, description:description, vendor: vendor, size: size})}>
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
              alignSelf:"flex-start",
              marginTop:19,
              fontSize:20,
              left:11.5,
              color:"black"}}>
                 {""} {name}
            </Title>
            

            

            <Title style={{ 
              alignSelf:"flex-start",  //For passing down the Price.
              marginBottom:3,
              left:13,
              marginTop:5,
              fontSize:17,
              color:"black"
              }}>₦{price} {""}
              </Title>
            
<View style={{flexDirection:"row", marginTop:8}}>

            <Title  style={{ marginRight:30,  //For passing down the quantity needed.
             marginBottom:10,
             
             left:15,
             fontSize:12,
             alignSelf:"flex-start",
             color:"black"}}>Quantity:</Title>

             

<RNPickerSelect
            placeholder={{}}
         
 onValueChange={(value) => console.log(value)}
            items={[
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
                { label: '6', value: '6' },
                { label: '7', value: '7' },
                { label: '8', value: '8' },
                { label: '9', value: '9' },
                { label: '10', value: '10' },
                { label: '11', value: '11' },
            ]}
        

            style={{
              inputAndroid: {
                backgroundColor: 'transparent',
              },
              iconContainer: {
                top: 8,
                left: 15,
                
              },
            }}


            useNativeAndroidPickerStyle={false}

            Icon={() => {
              return < Chevron  size={1}  color="black"  />;
            }}

    />

  

  </View>          
            
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




  <Title style={{fontSize:20,                     //Subtotal
  color:"black",
  textAlign:"left",
  paddingTop:20,
  paddingBottom:10}}>Subtotal: ₦0 </Title>


<Title style={{fontSize:20,                     //Delivery Fee
  color:"black",
  textAlign:"left",
  paddingTop:1,
  paddingBottom:10}}>Delivery Fee: ₦950 </Title>

  <Subtitle style={{alignSelf:"flex-start"}}>
  Delivery fee is ₦950 for all deliveries across Lagos.Enjoy.
   </Subtitle>

<Title style={{fontSize:20,                       //Total Price
   color:"black",
  textAlign:"left",
  paddingTop:30,
  paddingBottom:10}}>Total: ₦0 </Title>



<Button  //Checkout Button

buttonStyle={{
  backgroundColor: "black"
}}

title="Proceed to Checkout"
style={{marginBottom:50,
width:300,
marginTop:9,
alignSelf: "center",
height:100}}

onPress={() => navigation.navigate ( "Checkout")}
/>



</ScrollView>

</SafeAreaView>


</View>

    )
}
