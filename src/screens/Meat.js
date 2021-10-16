import React from "react"
import { View,
  Text, 
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity }
   from "react-native"
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5"
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import {Header, Left, Right, Title, Body, Subtitle} from "native-base"
import { Avatar,  Card,  Paragraph } from 'react-native-paper';
import data from "./data"






  
const Form = ({name, description, price}) => (
  
  
<ImageBackground
source={require("../img/sig.png")} 
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
    marginBottom:35,
     marginLeft:10,
     color:"white"
     }}>${price}</Text>







  <Text style={{
    bottom:0,
     left:0,
     position: "absolute",
      marginLeft:10,
       color:"white",
        fontSize:12,
         marginBottom:5}}>
  
  {description}  </Text>





  



<Button type="clear"    
   style={
     {right:0,
       top:0,
        marginTop:1,
         paddingLeft: 130,
         }}
icon ={  <Feather name="heart"  size={15} color="white"     />}

/>

</ImageBackground>
);
  








const renderItem= ({ item, navigation  })=> (  //had to put navigation here so i could also render navigation.
  <TouchableOpacity  onPress={() => navigation.navigate ("productpage") }>
    <Form
     name={item.name} 
     description={item.description}
     image={item.image}
     price={item.price}
    
     />
    </TouchableOpacity>
     
)










export default function Meat ({navigation }) {
    return (

 <View >
   

<Header style={{marginTop: 3}}>
<Left>

<Button  type="clear" style={{paddingLeft:9}}
   icon ={<Ionicons name="ios-arrow-round-back"
   size={30}
   color="black"     />}
            
  onPress={() => navigation.navigate("SearchScreen")} />  

</Left>


<Body>
<Title   style={{width:300}}>Meat & Seafood</Title>
</Body>


<Right>

            <Button  style={styles.titch}
            type="clear"
            icon={
               <Icon
                name= "bars"
                size= {20}
                color= "black"
                />
            }
            
            onPress={() => navigation.openDrawer()} />    
</Right>

</Header>




<View style={{ marginBottom:100, paddingBottom:80}}>
  
    <FlatList    numColumns={2}   

data={data}
 renderItem={renderItem}
 renderItem={({ item }) => renderItem({ navigation, item })}

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
