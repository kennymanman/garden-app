import React, { useState, useContext } from "react"
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  ScrollView
}
  from "react-native"
import { Button } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome5"
import { Title, Left } from "native-base"
import data from "./data"
import { Feather } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { Entypo } from "@expo/vector-icons"
import { FAB } from "react-native-paper"
import { AddCartContext } from "./CartContext"

//The Form is the structure in which i want to pass certain parameters into to be rendered.//
const Form = ({ name, quantity, price }) => (
  <View style={{
    flex: 1,
    justifyContent: 'space-between',
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center'
  }}>


    <ImageBackground

      source={require('../img/sig.png')}
      imageStyle={{ borderRadius: 12 }} //For reshaping the image.

      style={{
        height: 140,
        width: 150,
        position: 'relative', // because it's parent
        marginBottom: 15,
        marginTop: 19,
        marginRight: 7,
        marginLeft: 4,
        top: 2,
        left: 2
      }}
    >


      <Button type="clear"
        style={{
          top: 0,
          paddingLeft: 1,
          left: 0,
          marginTop: 2,
          marginRight: 118
        }}
        icon={<FontAwesome name="remove"
          size={17}
          color="white" />}
        onPress={() => console.log('Pressed')}
      />

    </ImageBackground>

    <View style={{ flexDirection: "column" }}>

      <Title style={{
        marginBottom: 3,   //For passing down the Name.
        marginRight: 105,
        fontSize: 20,
        color: "white"
      }}>{name}
      </Title>

      <Title style={{
        marginRight: 127,  //For passing down the Price.
        marginBottom: 3,
        fontSize: 17,
        color: "white"
      }}>${price}</Title>

      <Title style={{
        marginRight: 100,  //For passing down the quantity needed.
        marginBottom: 10,
        fontSize: 13,
        color: "white"
      }}>Quantity:{quantity}</Title>



      <View style={{
        flexDirection: "row", //Row for flex direction was used to align multiple items on the same line.
        paddingLeft: 12,
        marginBottom: 40
      }}>



        <FAB                           //Fab is the increment button.
          style={{
            paddingLeft: 1,
            marginRight: 10,
            position: "absolute"
          }}
          small
          animated
          icon="plus"
          color="white"
          onPress={() => console.log('Pressed')}
        />

        <FAB                          //Fab is the decrement button.
          style={{
            marginRight: 20,
            paddingRight: 1,
            position: "absolute",
            marginLeft: 65
          }}
          small
          animated
          icon="minus"
          color="white"
          onPress={() => console.log('Pressed')}
        />


      </View>
    </View>
  </View>
);


const renderItem = ({ item }) => (
  <Form
    name={item.name}
    quantity={item.quantity}
    image={item.image}
    price={item.price}

  />
)


function CcartScreen({ navigation, ...props }) {


  const { cart } = useContext(AddCartContext)




  {/*const [cart, setCart] = useContext(CartContext)
const totalPrice = cart.reduce((acc, currentCart)=> acc + currentCart.price, 0 ) */}


  return (




    <View style={styles.container} >
      <ImageBackground
        source={require('../img/jie.jpg')}
        imageStyle={{ borderRadius: 0 }}
        style={{
          height: 621,
          width: 375,
          position: 'relative', // because it's parent
          top: 0,
        }}
      >




        <Button style={styles.sitch}
          type="clear"
          icon={
            <Icon
              name="bars"
              size={20}
              color="black"
            />
          }
          onPress={() => navigation.openDrawer()} />

        <Title              //For the Main screen title
          style={{
            fontSize: 35,
            color: "white",
            paddingLeft: 32,
            textAlign: "left"
          }} >Cart</Title>


        <Title style={{
          fontSize: 13, //For the delivery address
          color: "white",
          paddingLeft: 32,
          textAlign: "left",
          paddingTop: 12,
          paddingBottom: 10
        }}>Deliver to: 92 lanre awolokun Gbagada </Title>


        <ScrollView style={{ marginBottom: 2 }}>
          <View style={{
            marginBottom: 10,
            paddingBottom: 18,
            paddingLeft: 21
          }}>

            <FlatList
              data={data}
              renderItem={renderItem}
              renderItem={({ item }) => renderItem({ item, newCart })}
              keyExtractor={item => item.id}
            />


          </View>

          <Title style={{
            fontSize: 20,                     //Delivery Fee
            color: "white",
            paddingLeft: 32,
            textAlign: "left",
            paddingTop: 1,
            paddingBottom: 10
          }}>Delivery Fee: $32 </Title>

          <Title style={{
            fontSize: 20,                       //Total Price
            color: "white",
            paddingLeft: 32,
            textAlign: "left",
            paddingTop: 1,
            paddingBottom: 10
          }}>Total: $100 </Title>

          <Button                                          //Checkout Button
            title="Proceed to Checkout"
            style={{
              marginBottom: 20,
              width: 300,
              marginTop: 9,
              alignSelf: "center",
              paddingRight: 20,
              height: 100, position: "relative", paddingLeft: 13
            }}
          />


        </ScrollView>
      </ImageBackground>
    </View>



  )
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 0,
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

  sitch: {
    alignItems: "flex-end",
    paddingTop: 25,
    paddingRight: 12

  },





})


export default CcartScreen