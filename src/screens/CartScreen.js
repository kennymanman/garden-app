import React, { useContext, useEffect, useState, useCallback } from 'react'
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
  ActivityIndicator
}
  from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { Button } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';
import { Header, Left, Right, Title, Body, Subtitle } from "native-base";
import * as firebase from "firebase";
import fire, { firestore } from "../config/firebase";
import CustomLoader from "../Components/CustomLoader";
import { AddCartContext } from "./CartContext"
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes'
import { AuthenticatedUserContext } from "../Providers/AuthenticatedUserProvider";


export default function CartScreen({ navigation }) {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [cartList, setCartList] = useState([]);
  const [loader, setLoader] = useState("false");
  const [qty, setQty] = useState();
  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0);
  const [delivery, setDeliverItem] = useState('');


  useFocusEffect(
    React.useCallback(() => {
      fetchCartItems();
      getDeliveryFee()
    }, [])
  );


  const fetchCartItems = async () => {
    setLoader(true);
    var arrList = []
    const currentUser = user.uid;

    const db = firebase.firestore();

    const cartItems = db.collection("cartItems")

    const allCartRes = await cartItems.where('currentUserID', '==', currentUser).get();

    if (!allCartRes.empty) {

      allCartRes.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        arrList.push(doc.data())
        console.log('doc data', arrList);
        setCartList(arrList)
        setLoader(false);
      })
    }
    else {
      setLoader(false)
    }
  }


  const handleClick = async (value, id) => {
    console.log('handle click', value, id)
    //setQty(value)
    addToCartItem(value, id)
  };


  const addToCartItem = async (value, productId) => {
    setLoader(true)
    const currentUser = user.uid;

    const db = firebase.firestore();

    // Create a reference to the cities collection
    const cartRef = db.collection('cartItems');

    // Create a query against the collection
    const allCartRes = await cartRef.where('currentUserID', '==', currentUser).where('product_ID', '==', productId).get();


    if (allCartRes.empty) {
      console.log('No matching documents.');
    }
    else {
      allCartRes.forEach(doc => {
        //console.log(doc.id, '=>nkjk', qty);
        const qty = doc.data().productQty
        db.collection("cartItems")
          .doc(doc.id)
          .update({ productQty: value });
      })
      await fetchCartItems();
      setLoader(false);
    }
  }


  const removeCartItem = async (productId) => {
    setLoader(true);
    const currentUser = user.uid;

    const db = firebase.firestore();

    const cartItems = db.collection("cartItems")

    const removeCartRes = await cartItems.where('currentUserID', '==', currentUser).where('product_ID', '==', productId).get();
    removeCartRes.forEach(item => {
      console.log(item.id,);
      const id = item.id
      db.collection("cartItems").doc(id).delete();
    })
    await fetchCartItems();
    setLoader(false);
    alert('Item removed');
  }


  const getDeliveryFee = async () => {

    const db = firebase.firestore();

    db.collection("settings").get().then(item => {
      //console.log('Total Product: ', item.docChanges());
      item.docChanges().forEach(function (anotherSnapshot) {
        console.log('deliveryFee', anotherSnapshot.doc.data());
        setDeliverItem(anotherSnapshot.doc.data().deliveryFee)
      })
    })
  }


  const calculateTotal = () => {
    let totalVal = 0
    for (let i = 0; i < cartList.length; i++) {
      totalVal = totalVal + (cartList[i].productPrice * cartList[i].productQty)
    }
    setSubTotal(totalVal);
    setTotal(totalVal + delivery)
  }


  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Title
        style={{
          textAlign: "left",
          color: "black",
          marginLeft: 15,
          marginTop: 20,
          fontSize: 28,
          fontWeight: 'bold',

        }}>
        Cart
      </Title>
      <Title style={{
        fontSize: 13, //For the delivery address
        color: "black",
        textAlign: "left",
        marginLeft: 15,
        marginBottom: 5,
        fontFamily: "recoleta-black"
      }}>Deliver to: 92 lanre awolokun Gbagada</Title>
      <TouchableOpacity onPress={() => navigation.navigate("Details")}>
        <Subtitle style={{
          fontSize: 13,
          marginLeft: 15,
          alignSelf: 'flex-start',
          color: 'grey'
        }}>Change Delivery info</Subtitle>
      </TouchableOpacity>

      <ScrollView>


        {cartList.length != 0 ? <View style={{
          flex: 1,
          padding: 3,
        }}>
          <FlatList
            data={cartList}
            renderItem={({ item }) => {
              return (

                <View style={{ flexDirection: "row" }}>

                  {/* <TouchableOpacity  
                      onPress={() => navigation.navigate("ProductPage", {
                        id: item.product_ID,
                        name: item.productName,
                        price: item.productPrice,
                        image: item.productImage,
                        description: item.productDescription,
                        size: item.productSize
                      })}
                    > */}
                  <ImageBackground
                    source={{ uri: item.productImage }}
                    imageStyle={{ borderRadius: 12 }} //For reshaping the image.

                    style={{
                      height: 125,
                      width: 140,
                      position: 'relative', // because it's parent
                      margin: 10,
                    }}
                  >
                    <Button
                      type="clear"
                      icon={<FontAwesome name="remove"
                        size={17}
                        color="white"
                        style={{ right: 50 }}
                      />}
                      onPress={() => removeCartItem(item.product_ID)}
                    />
                  </ImageBackground>

                  <View>
                    <Title
                      style={{
                        alignSelf: "flex-start",
                        marginTop: 20,
                        fontSize: 16,
                        marginLeft: 5,
                        fontWeight: 'bold',
                        color: "black"
                      }}>
                      {item.productName}
                    </Title>
                    <Text style={{
                      marginLeft: 5,
                      marginTop: 5,
                      fontWeight: 'bold',
                      fontSize: 14,
                      color: "black"
                    }}>₦ {item.productPrice}
                    </Text>
                    <View style={{ marginTop: 7, flexDirection: 'row', marginLeft: 6 }}>
                      <Title style={{ alignSelf: "flex-start", color: 'black', fontSize: 12 }}>Quantity:</Title>

                      <View style={{ marginLeft: 10, width: 60 }}>
                        <RNPickerSelect
                          placeholder={{
                          }}
                          value={item.productQty}
                          onValueChange={(itemValue) => handleClick(itemValue, item.product_ID)}
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
                              bottom: 5,
                              color: 'black'
                            },
                            iconContainer: {
                              top: 8,
                              left: 20,
                            },

                          }}
                          useNativeAndroidPickerStyle={false}
                          Icon={() => {
                            return < Chevron size={1.1} color="black" />;
                          }}
                        />
                      </View>
                    </View>
                  </View>

                  {/* </TouchableOpacity> */}
                  {calculateTotal()}
                </View>
                /* <View style={styles.totalBorderStyle}> */
              );
            }}
          />
          <View style={styles.totalStyle}>

            <Title style={styles.titleStyle}>Subtotal:</Title>
            <Title style={[styles.titleStyle, { marginLeft: 5 }]}>₦{subTotal}</Title>
          </View>
          <View style={[styles.totalStyle, { bottom: 7 }]}>
            <Title style={styles.titleStyle}>Delivery Fee:</Title>
            <Title style={[styles.titleStyle, { marginLeft: 5 }]}>₦{delivery}</Title>
          </View>
          <Subtitle style={styles.SubtitleStyle}>
            Delivery fee is ₦{delivery} for all deliveries across Lagos.Enjoy.
          </Subtitle>
          <View style={[styles.totalStyle, { marginTop: 25 }]}>
            <Title style={styles.titleStyle}>Total:</Title>
            <Title style={[styles.titleStyle, { marginLeft: 5 }]}>₦{total}</Title>
          </View>
          {/* </View> */}

          <Button  //Checkout Button
            buttonStyle={{
              backgroundColor: "black",
              margin: 15,
            }}
            title="Proceed to Checkout"
            style={{
              alignSelf: "center",
              height: 80
            }}
            onPress={() => navigation.navigate("Checkout", {
              total: total,
              shipping: delivery,
              cartData: cartList,
              subtotal: subTotal
            })}
          />
        </View>
          :
          <View style={{ flex: 1, alignItems: 'center', marginTop: 200 }}>
            <Text style={{ fontSize: 16, color: 'black' }}>No Items in cart </Text>
          </View>
        }
      </ScrollView>
      {loader ? <View style={{ bottom: 300 }}>
        <ActivityIndicator size="large" color="#4267B2" />
      </View> : null}

    </View>

  )
}

const styles = StyleSheet.create({
  totalStyle: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10
  },
  SubtitleStyle: {
    fontSize: 12,
    marginLeft: 15,
    alignSelf: 'flex-start',
    color: 'grey'
  },
  totalBorderStyle: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    borderWidth: 0.7,
    borderColor: 'lightgrey',
    borderRadius: 8
  },
  titleStyle: {
    fontSize: 18,
    color: "black",
    fontWeight: 'bold'
  }
})

