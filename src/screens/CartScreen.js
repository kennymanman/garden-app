import React, { useContext, useEffect, useState, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
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
import firebase from "firebase/compat/app"
//import * as firebase from "firebase";
import fire, { firestore } from "../config/firebase";
import CustomLoader from "../Components/CustomLoader";
import { AddCartContext } from "./CartContext"
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import { AuthenticatedUserContext } from "../Providers/AuthenticatedUserProvider";
import * as Updates from 'expo-updates';


export default function CartScreen({ navigation, ...props }) {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [cartList, setCartList] = useState([]);
  const [address, setAddress] = useState("");
  const [loader, setLoader] = useState("false");
  const [qty, setQty] = useState(1);
  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0);
  const [delivery, setDeliverItem] = useState('');
  const [promo, setPromo] = useState('');
  const [code, setCode] = useState(0);
  const [time, setTime] = useState('');
  const [offerList, setOfferList] = useState([]);
  const [amount, setPromoAmount] = useState(0);


  useFocusEffect(
    React.useCallback(() => {
      fetchCartItems();
      getUserDetails();
      getDeliveryFee();
      getCurrentTime();
      fetchOffers();
    }, [])
  );


  const getUserDetails = async () => {
    try {
      setLoader(true);
      const db = firebase.firestore();
      await db
        .collection("users")
        .doc(user.uid)
        .get()
        .then((snapshot) => {
          let info = snapshot.data();
          setAddress(info?.address || "");
        })
        .catch((e) => {
          Alert.alert("There is something wrong!", e.message);
        });
    } catch (err) {
      Alert.alert("There is something wrong!", err.message);
    } finally {
      setLoader(false);
    }
  };


  const getCurrentTime = () => {
    var hours = new Date().getHours(); //To get the Current Hours
    var min = new Date().getMinutes(); //To get the Current Minutes   
    console.log('get time', hours, min)
    var currentTime = hours + ':' + min
    setTime(currentTime)
  }


  const fetchCartItems = async () => {
    setLoader(true);
    var arrList = []
    const currentUser = user.uid;

    const db = firebase.firestore();

    const cartItems = db.collection("cartItems")

    const allCartRes = await cartItems.where('currentUserID', '==', currentUser).get();

    if (!allCartRes.empty) {

      allCartRes.forEach(doc => {
        arrList.push(doc.data())
        console.log('doc data', arrList);
        global.cartCount = arrList.length
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


  const fetchOffers = async () => {
    setLoader(true);
    var arrList = []

    const db = firebase.firestore();

    const offerItems = db.collection("promoCode")

    const allOfferRes = await offerItems.get();

    if (!allOfferRes.empty) {

      allOfferRes.forEach(doc => {
        arrList.push(doc.data())
        setOfferList(arrList)
        setLoader(false);
      })
    }
    else {
      setLoader(false)
    }
  }


  const applyOffer = async (code) => {
    setLoader(true);
    for (let i = 0; i < offerList.length; i++) {
      if (offerList[i].code == code) {
        setPromoAmount(offerList[i].amount);
        setLoader(false)
      }
    }
  }


  return (
    <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
      {time < '8:45' || time > '18:30' ? <View>
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
        <Text 
        
        style={{
          fontSize: 13, //For the delivery address
          color: "black",
          textAlign: "left",
          marginLeft: 15,
          marginBottom: 5,
          fontFamily: "recoleta-black"
        }}>Deliver to:  {address}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Details")}>
          <Subtitle style={{
            fontSize: 13,
            marginLeft: 15,
            alignSelf: 'flex-start',
            color: 'grey'
          }}>Change Delivery info</Subtitle>
        </TouchableOpacity>

        {cartList.length != 0 ? <View style={{
          flex: 1,
          padding: 3,
        }}>
          <FlatList
            data={cartList}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("ProductPage", {
                    productID: item.productID,
                    id: item.product_ID,
                    name: item.productName,
                    price: item.productPrice,
                    image: item.productImage,
                    description: item.productDescription,
                    size: item.productSize,
                    stock: item.totalStock
                  })}
                >

                  <View style={{ flexDirection: "row" }}>


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


                    {calculateTotal()}
                  </View>
                  {/* <View style={styles.totalBorderStyle} /> */}
                </TouchableOpacity>
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

          <View style={styles.promoStyle}>
            <TextInput
              style={{ height: 40 }}
              onChangeText={newText => setCode(newText)}
              placeholder="enter promo code if you have"
            />
            <Button  //Checkout Button
              buttonStyle={{
                backgroundColor: "transparent",
                // margin: 5,
                // height: 25
              }}
              titleStyle={{ fontSize: 13, bottom: 2, color: '#e47644' }}
              title="Apply"
              style={{
                alignSelf: "flex-end"
              }}
              onPress={() => applyOffer(code)}
            />
          </View>
          {/* <Text
              style={styles.promoCodeStyle}
              onPress={() => navigation.navigate('Offers')}
            >View the offers
            </Text> */}
          {/* <View style={[styles.totalStyle, { marginTop: 25 }]}>
              <Title style={styles.titleStyle}>Apply coupon:</Title>
              <Title style={[styles.titleStyle, { marginLeft: 5 }]}>₦{props.route.params.amount ? props.route.params.amount : 0}</Title>
            </View> */}
          <View style={styles.totalStyle}>
            <Text
              style={styles.promoCodeStyle}
              onPress={() => navigation.navigate('Offers')}
            >View the offers
            </Text>
          </View>
          <View style={styles.totalStyle}>
            <Title style={styles.titleStyle}>Total:</Title>
            <Title style={[styles.titleStyle, { marginLeft: 5 }]}>₦{total - amount}</Title>
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
              subtotal: subTotal,
              promoId: promo
            })}
          />
        </View>
          :
          <View style={{ flex: 1, alignItems: 'center', marginTop: 200 }}>
            <Text style={{ fontSize: 16, color: 'black' }}>No Items in cart </Text>
          </View>
        }

      </View> :
        <View style={{ flex: 1 }}>
          <Image
            source={require('../img/close.png')}
            style={{ height: 200, width: 150 }}
          />
          <Text style={{ fontSize: 16, color: 'black', margin: 10 }}>We are open 8:45 am to 6:30 pm</Text>
        </View>
      }
      {loader ? <View style={{ bottom: 100 }}>
        <ActivityIndicator size="large" color="#4267B2" />
      </View> : null}

    </ScrollView>

  )
}

const styles = StyleSheet.create({
  totalStyle: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10
  },
  promoStyle: {
    flexDirection: 'row',
    height: 35,
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-between',
    marginTop: 40,
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
  },
  couponStyle: {
    color: 'black',
    fontSize: 14
  },
  promoCodeStyle: {
    fontSize: 13,
    marginTop: 5,
    color: '#e47644'
  }
})

