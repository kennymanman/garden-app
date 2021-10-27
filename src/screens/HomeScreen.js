import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import ban from "../img/ban.png";
import fresh from "../img/fresh.png";
import hus from "../img/hus.png";

import Deals from "./Deals";
import { AddCartContext, AddSavedContext } from "../screens/CartContext";
import { Feather } from "@expo/vector-icons";
import { Headline } from "react-native-paper";
//import Fruits from "../screens/Fruits"
import { NavigationContainer } from "@react-navigation/native";
import { Title, Subtitle } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import Vortex from "../Svg/Vortex.svg"
import Orangelong from "../Svg/Orangelong.svg"
import Petal from "../Svg/Petal.svg"

import page from "../rmg/page.png";




export default function HomeScreen({ navigation }) {
  const { updateCart } = useContext(AddCartContext);
  const { updateSaved } = useContext(AddSavedContext);

  const useCart = updateCart;
  const useSaved = updateSaved;

  //Structure of the product list.
  const Form = ({ name, description, price, id, image }) => (
    <ImageBackground
      source={image ? image : require("../img/sig.png")} //Background Image
      imageStyle={{ borderRadius: 12 }}
      style={{
        height: 200,
        width: 200,
        position: "relative", // because it's parent
        marginBottom: 15,
        marginTop: 19,
        marginRight: 7,
        marginLeft: 4,
        top: 2,
        left: 2,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          color: "white",
          position: "absolute", // child
          bottom: 0, // position where you want
          left: 0,
          marginBottom: 55,
          marginLeft: 10,
          fontSize: 20,
        }}
      >
        {name}
      </Text>

      <Text
        style={{
          bottom: 0,
          left: 0,
          position: "absolute",
          fontSize: 15,
          marginBottom: 35,
          marginLeft: 10,
          color: "white",
        }}
      >
        ${price} {""}
      </Text>

      {/*<Text
        style={{
          bottom: 0,
          left: 0,
          position: "absolute",
          marginLeft: 10,
          color: "white",
          fontSize: 12,
          marginBottom: 5,
        }}
      >
        {description}
        {""}{" "}
      </Text> */}


      <View style={{ flexDirection: "row" }}>
        <Button
          type="clear"
          style={{
            //right:0,
            top: 0,
            marginTop: 3,
            paddingLeft: 8,
          }}
          icon={<Feather name="heart" size={15} color="white" />}
          onPress={() => updateSaved({ name, price, description, image })}
        />

        <Button
          type="clear"
          style={{ right: 0, top: 0, marginTop: 3, paddingLeft: 119 }}
          icon={<Feather name="shopping-bag" size={15} color="white" />}
          onPress={() => updateCart({ name, price, image })}
        />
      </View>
    </ImageBackground>
  );

  //Render Items.
  const renderItem = (
    { item, id, useCart, useSaved, navigation } //had to remove navigation here so i could also render navigation.
  ) => (
    <TouchableOpacity
      onPress={() => {
        // console.log(126, navigation);
        navigation.navigate("ProductPage", {
          name: item.name,
          price: item.price,
          image: item.image,
        });
      }}
    >
      <Form
        id={item.id}
        name={item.name}
        description={item.description}
        image={item.image}
        price={item.price}
      />
    </TouchableOpacity>
  );

return (
<View >
      
  <ScrollView showsVerticalScrollIndicator={false} >
   <View style={styles.container}>



   


          <Image
            style={{
              width: 349,
              height: 100,
              alignSelf: "center",
              borderRadius: 19,
              marginTop: 18,
            }}
            source={ban}
          /> 

          <Image
            style={{
              width: 349,
              height: 350,
              alignSelf: "center",
              borderRadius: 20,
              marginTop: 15,
            }}
            source={hus}
          />

          <Image
            style={{
              width: 349,
              height: 460,
              alignSelf: "center",
              borderRadius: 20,
              marginTop: 15,
            }}
            source={page}
          />

  
  <Title style={{ alignSelf: "flex-start", fontSize: 30, marginLeft: 8, marginTop: 70 }}>
    Grocery Boxes
   </Title>
            <Text style={{ marginLeft: 12, fontSize: 13, marginTop: 8, alignSelf: "flex-start", fontFamily:"recoleta-black" }}>
              Enjoy deals, offers and discounts at affordable prices.
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("DealsScreen")}
            >
              <Subtitle
                style={{
                  marginLeft: 9,
                  fontSize: 13,
                  color: "grey",
                  marginTop: 5,
                  alignSelf:"flex-start"
                }}
              >
                See all deals
              </Subtitle>
            </TouchableOpacity>

            <FlatList
              horizontal={true}
              data={Deals}
              // renderItem={renderItem}
              renderItem={({ item }) =>
                renderItem({ navigation, item, useCart, useSaved })
              }
              keyExtractor={(item) => item.id}
            />
        
</View>

<View style={{backgroundColor:"#058c42", height:700, borderTopLeftRadius:24, borderTopRightRadius:24, marginTop:110}}>

<Vortex style={{position:"absolute", marginTop:220}}/>
<Text style={{marginTop:70, marginLeft:0,  fontSize:30, alignSelf:"center", color:"white", fontFamily:"recoleta-black"}}>My Grocery List<Text style={{color:"orange"}}> .</Text></Text>
<Title style={{fontSize:13, fontFamily:"recoleta-black"}}>Create your own personalized grocery list and have </Title>
<Title style={{fontSize:13, fontFamily:"recoleta-black"}}>it delivered on your selected date.</Title>


<Orangelong style={{position:"absolute", marginTop:480, marginLeft:230}} />

<Title style={{color:"white", fontSize:13, fontFamily:"recoleta-bold", marginTop:50}}>Selected date of delivery:  25th October 2021 </Title>



<Button  //Checkout Button

buttonStyle={{
  backgroundColor: "black"
}}

title="Edit Grocery List"
style={{marginBottom:20,
width:300,
marginTop:20,
alignSelf: "center",
height:100}}
onPress={() => navigation.navigate("Grocerylist")}
/>

</View>


    </ScrollView>

   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    
    marginTop: 35,
    
  },

  rest: {
    textAlign: "center",
    marginTop: 100,
  },

  best: {
    justifyContent: "flex-start",
    marginTop: 20,
  },

  ditch: {
    alignItems: "flex-end",
    marginTop: 20,
  },
});
