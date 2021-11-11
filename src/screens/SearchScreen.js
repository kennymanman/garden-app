import React from "react"
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground, SafeAreaView } from "react-native"
import { Button } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome5"
import { Container, Header, Item, Input,  Text } from 'native-base';
import { Feather } from '@expo/vector-icons';
import sig from "../img/sig.png"

import pat from "../img/pat.png"
import veg from "../img/veg.png"
import mea from "../img/mea.png"
import brea from "../img/brea.png"
import egg from "../img/egg.png"
import cere from "../img/cere.png"
import dri from "../img/dri.png"
import al from "../img/al.png"
import sna from "../img/sna.png"
import spi from "../img/spi.png"
import pan from "../img/pan.png"
import hou from "../img/hou.png"
import vit from "../img/vit.png"
import ki from "../img/ki.png"
import Deals from "../rmg/Deals.png"

import {Title, Subtitle} from "native-base"
import { TextInput } from "react-native-paper";
import InputField from "../Components/InputField";
import Bullseye from "../Svg/Bullseye.svg"
import Outlinecloud from "../Svg/Outlinecloud.svg"


import orangesimage from "../categoryimages/orangesimage.jpg"
import kaleimage from "../categoryimages/kaleimage.jpg"
import meatimage from "../categoryimages/meatimage.jpg"
import breadimage from "../categoryimages/breadimage.jpg"
import eggimage from "../categoryimages/eggimage.jpg"
import drinkimage from "../categoryimages/drinkimage.jpg"
import spiceimage from "../categoryimages/spiceimage.jpg"
import pastaimage from "../categoryimages/pastaimage.jpg"
import tuberimage from "../categoryimages/tuberimage.jpg"
import juiceima from "../categoryimages/juiceima.jpg"
import beefimage from "../categoryimages/beefimage.jpg"





export default function SearchScreen ({navigation}) {
    return (


        


        <View style={{ flex: 1}} >

        {/*<Header  style={{marginTop:12  }} searchBar rounded   >

          <Item >
            <Icon style={{paddingLeft:25, paddingRight:30}} size={15} name="search" />
            <Input  placeholder="Search" />
            
          </Item>

          <Button style={styles.bitch} 
            type="clear"
            icon={
               <Icon
                name= "bars"
                size= {21}
                color= "black"
                />
            }
            
            onPress={() => navigation.openDrawer()} />    


        </Header>*/}




        

        


        <ScrollView >

        

        <View style={{marginTop:23}} >

  

{/*
<ImageBackground 
 source={require('../rmg/sag.jpg')}
 style={{ height: 250, backgroundSize:"cover"}}
 imageStyle={{borderBottomRightRadius:70}}

>*/}

{/*<Outlinecloud style={{position:"absolute", paddingTop:180}} />*/}

{/*<Bullseye style={{position:"absolute", marginLeft:220, paddingTop:1100}} />*/}


<Title style={{textAlign:"left", fontSize:39, paddingTop:50, paddingLeft:13, paddingBottom:10, color:"black"}}>Categories</Title>





<InputField placeholder="Search Groceries" leftIcon="magnify"

containerStyle={{backgroundColor:"#ced4da", borderBottomRightRadius:17, borderTopRightRadius:17, height:45, borderTopLeftRadius:17, borderBottomLeftRadius:17, margin:10}}
style={{marginTop:20, padding:12, width:350, height:10}}
>
</InputField>


<View style={{ height: 2,  borderBottomWidth: 1, borderBottomColor: '#CED0CE', marginTop:10}} />







      
{/*</ImageBackground> */}





      {/*<Image  style={{ width: 346, height: 100, alignItems: "center", borderRadius: 20, marginBottom:35, marginLeft: 12, marginRight:25}} source={sig} />*/}









     {/* <ImageBackground
             
             source={require('../rmg/gina.jpg')}
             imageStyle={{borderRadius:0}}
          style={{
            height: 350,
            width: 375,
            position: 'relative', // because it's parent
            marginTop:75,
            top: 0,  
          }}
        >  */}






<View style={{ marginTop:70}}>

        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} >



<View style={{paddingRight:10, paddingLeft:19, paddingTop:10}}>


<Title style={{color:"black"}}>Grocery Boxes & Deals</Title>
<View>
    <TouchableOpacity
     onPress={() => navigation.navigate ( "DealsScreen") }>

<Image  style={{ width: 220, height: 270, alignItems: "center", borderRadius: 12, marginTop: 10, marginBottom:100}} source={Deals}  />

</TouchableOpacity>

</View>
</View>



<View style={{paddingRight:10, paddingTop:10 }}>

<Title style={{color:"black"}}>Fruits</Title>
<View>
    <TouchableOpacity onPress={() =>navigation.navigate ("Fruits" ) } >

<Image  style={{ width: 220, height: 270, alignItems: "center", borderRadius: 12, marginTop: 10, marginBottom:100}} source={orangesimage}  />

</TouchableOpacity>

</View>
</View>












<View style={{paddingRight:10, paddingTop:10 }}>

<Title style={{color:"black"}}>Vegetables</Title>
<View>
    <TouchableOpacity onPress={() =>navigation.navigate ("Vegetables" ) } >

<Image  style={{ width: 220, height: 270, alignItems: "center", borderRadius: 12, marginTop: 10, marginBottom:100}} source={kaleimage}  />

</TouchableOpacity>

</View>
</View>



<View style={{paddingRight:15, paddingTop:10 }}>
<Title style={{color:"black"}}>Meat & Seafood</Title>
<View>
    <TouchableOpacity onPress={() =>navigation.navigate ( 'Meat')}>

<Image  style={{ width: 220, height: 270, alignItems: "center", borderRadius: 12, marginTop: 10, marginBottom: 100}} source={beefimage}  />

</TouchableOpacity>

</View>
</View>



<View style={{paddingRight:15, paddingTop:10 }}>
<Title  style={{color:"black"}}>Bread & Bakery</Title>
<View>
    <TouchableOpacity onPress={() =>navigation.navigate ('Bread')}>

<Image  style={{ width: 220, height: 270, alignItems: "center", borderRadius: 12, marginTop: 10 , marginBottom: 100}} source={breadimage}  />

</TouchableOpacity>

</View>
</View>



<View style={{paddingRight:15, paddingTop:10 }}>
<Title  style={{color:"black"}}>Dairy & Eggs</Title>
<View>
    <TouchableOpacity onPress={() =>navigation.navigate ('Eggs')}>

<Image  style={{ width: 220, height: 270, alignItems: "center", borderRadius: 12, marginTop: 10, marginBottom: 100}} source={eggimage}  />

</TouchableOpacity>

</View>
</View>


{/*
<View style={{paddingRight:15, paddingTop:10 }}>
<Title  style={{color:"black"}}>Cereals</Title>
<View>
    <TouchableOpacity onPress={() =>navigation.navigate ('Cereal')}>

<Image  style={{ width: 220, height: 270, alignItems: "center", borderRadius: 20, marginTop: 10, marginBottom: 100}} source={cere}  />

</TouchableOpacity>

</View>
</View>
*/}



<View style={{paddingRight:15, paddingTop:10 }}>
<Title  style={{color:"black"}}>Drinks</Title>
<View>
    <TouchableOpacity onPress={() =>navigation.navigate ('Drinks')}>

<Image  style={{ width: 220, height: 270, alignItems: "center", borderRadius: 12, marginTop: 10, marginBottom: 100}} source={juiceima}  />

</TouchableOpacity>

</View>
</View>



{/*
<View style={{paddingRight:15, paddingTop:10 }}>
<Title  style={{color:"black"}}>Alcohol</Title>
<View>
    <TouchableOpacity onPress={() =>navigation.navigate ('Alcohol')}>

<Image  style={{ width: 220, height: 270, alignItems: "center", borderRadius: 20, marginTop: 10, marginBottom: 100}} source={al}  />

</TouchableOpacity>

</View>
</View>
*/}



{/*
<View style={{paddingRight:15, paddingTop:10 }}>
<Title  style={{color:"black"}}>Snacks</Title>
<View>
    <TouchableOpacity onPress={() =>navigation.navigate ('Snacks')}>

<Image  style={{ width: 220, height: 270, alignItems: "center", borderRadius: 20, marginTop: 10, marginBottom: 100}} source={sna}  />

</TouchableOpacity>

</View>
</View>
*/}



<View style={{paddingRight:15, paddingTop:10 }}>
<Title  style={{color:"black"}}>Spices, Sauces & Oil</Title>
<View>
    <TouchableOpacity onPress={() =>navigation.navigate ('Spices')}>

<Image  style={{ width: 220, height: 270, alignItems: "center", borderRadius: 12, marginTop: 10, marginBottom: 100}} source={spiceimage}  />

</TouchableOpacity>

</View>
</View>





<View style={{paddingRight:15, paddingTop:10 }}>
<Title  style={{color:"black"}}>Pasta, Noodles & Grains</Title>
<View>
    <TouchableOpacity onPress={() =>navigation.navigate ('House')}>

<Image  style={{ width: 220, height: 270, alignItems: "center", borderRadius: 12, marginTop: 10, marginBottom: 100}} source={pastaimage}  />

</TouchableOpacity>

</View>
</View>




<View style={{paddingRight:15, paddingTop:10 }}>
<Title  style={{color:"black"}}> Dried, Pantry & Tubers</Title>
<View>
    <TouchableOpacity onPress={() =>navigation.navigate ('Pantry')}>

<Image  style={{ width: 220, height: 270, alignItems: "center", borderRadius: 12, marginTop: 10, marginBottom: 100}} source={tuberimage}  />

</TouchableOpacity>

</View>
</View>











{/*
<View style={{paddingRight:15, paddingTop:10 }}>
<Title  style={{color:"black"}}>Health & Nutrition</Title>
<View>
    <TouchableOpacity onPress={() =>navigation.navigate ('Health')}>

<Image  style={{ width: 220, height: 270, alignItems: "center", borderRadius: 20, marginTop: 10, marginBottom: 100}} source={vit}  />

</TouchableOpacity>

</View>
</View>
*/}


{/*
<View style={{paddingRight:15, paddingTop:10 }}>
<Title  style={{color:"black"}}>Kids & Babies</Title>
<View>
    <TouchableOpacity onPress={() =>navigation.navigate ('Kids')}>

<Image  style={{ width: 220, height: 270, alignItems: "center", borderRadius: 20, marginTop: 10, marginBottom: 100}} source={ki}  />

</TouchableOpacity>

</View>
</View>
*/}





</ScrollView>
</View>

{/*</ImageBackground>*/}



<Subtitle>Recommend grocery items you would love to see?</Subtitle>
<Subtitle>Email Us</Subtitle>

<Button  //Checkout Button

buttonStyle={{
  backgroundColor: "black"
}}

title="Recommend"
style={{marginBottom:30,
width:200,
marginTop:9,
alignSelf: "center",
height:100}}

onPress={() => navigation.navigate ( "HelpScreen")}
/>






  </View>    

  

</ScrollView>

        

        </View>

        
    )
}














const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 24,
        
      },

      rest: {
          textAlign: "center",
          marginTop: 100
      },

      best: {
          justifyContent: "flex-start",
          marginTop: 20
      },

      sitch: {
          alignItems: "flex-end",
          paddingLeft: 8,
          paddingRight:19,
          paddingTop: 49
      }
})
