import React from 'react'
import { View, Text, ImageBackground } from 'react-native'

export default function Start() {
    return (
        <View>
            <ImageBackground
               source={require('../img/ben.png')}
        
            >




                </ImageBackground>


        </View>
    )
}


{/*
<View>
<ImageBackground
             
             source={require('../rmg/bred.jpg')}
             imageStyle={{borderRadius:0}}
          style={{
            height: 670,
            width: 375,
            position: 'relative', // because it's parent
            
            top: 0,  
          }}
        >




<Button  type="clear" style={{paddingLeft:15, alignSelf:"flex-start", paddingTop:35}}
     icon ={<Ionicons name="ios-arrow-round-back"
     size={30}
     color="white"     />}
            onPress={() => navigation.navigate("HomeScreen")} />  


      <Title style={{textAlign:"left", fontSize:30, color:"white", paddingLeft:19, paddingTop:12}} >My Orders</Title>





<ScrollView>


      <ImageBackground
source={require("../rmg/pale.jpg")} 
imageStyle={{borderRadius:12}}

  style={{
    height: 500,
    width: 325,
    position: "relative", // because it's parent
    marginBottom:15,
    marginTop:19,
    marginRight:11,
    marginLeft:20,
    top: 2,
    left: 2
  }}
>

<Title    
  style={{
      fontWeight: "bold",
      color: "green",
      position: "absolute", // child
      top: 12, // position where you want
      left: 0,
      marginBottom:55,
      marginLeft:10,
      fontSize: 30
    }}
  >
    successful
  </Title>

<Text
 style={{
   fontSize:12,
fontWeight: "bold",
 color: "black",
 position: "absolute",
 left:0,
top:55,
marginLeft:10
}}

> Estimated Delivery: 25th December 2020</Text>



<Text
 style={{
   fontSize:12,
fontWeight: "bold",
 color: "black",
 position: "absolute",
 left:0,
top:79,
marginLeft:12
}}

>Delivery Address: 21 road, Irvington avenue.</Text>


<ScrollView>

<View style={{  flexDirection:"row"}}>

<ImageBackground 
              
              source={require("../img/sig.png")}
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
            


            <Title  style={{ marginRight:112,  //For passing down the quantity needed.
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







</ImageBackground>



</ScrollView>










      </ImageBackground>

            </View> */}