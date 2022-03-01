import React, { useContext, useState } from 'react'
import { View, Text, Dimensions, StyleSheet, Image, ImageBackground, Alert, TouchableOpacity } from 'react-native'
import { Button } from "react-native-elements";
import { Feather } from '@expo/vector-icons';
import { Title, Subtitle, Icon } from "native-base";
import fire, { firestore } from "../config/firebase";
import * as firebase from "firebase";
import { AuthenticatedUserContext } from '../Providers/AuthenticatedUserProvider';

export default function ProductPage({ route, navigation, ...props }) {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [qty, setQty] = useState(1);
  const [loader, setLoader] = useState("false");

  const addToCartItem = async (productId, name, price, image, size, description) => {
    setLoader(true)
    const currentUser = user.uid;

    const db = firebase.firestore();

    // Create a reference to the cities collection
    const cartRef = db.collection('cartItems');

    // Create a query against the collection
    const allCartRes = await cartRef.where('currentUserID', '==', currentUser).where('product_ID', '==', productId).get();


    if (allCartRes.empty) {
      console.log('No matching documents.');
      db.collection("cartItems").doc().set({
        product_ID: productId,
        productName: name,
        productPrice: price,
        productImage: image,
        productSize: size,
        productDescription: description,
        productQty: qty,
        currentUserID: currentUser
      });
      setLoader(false);
      alert('Item added to cart');
      navigation.navigate('CartScreen');
    }
    else {
      allCartRes.forEach(doc => {
        console.log(doc.id, '=>', doc.data().productQty);
        const qty = doc.data().productQty
        db.collection("cartItems")
          .doc(doc.id)
          .update({ productQty: qty });
        setLoader(false);
        alert('Item updated in cart');
        navigation.navigate('CartScreen');
      })
    }
  }


  const savedProducts = async (productId) => {
    const currentUser = user.uid;

    const db = firebase.firestore();

    // Create a reference to the cities collection
    const itemRef = db.collection('savedItems');

    // Create a query against the collection
    const allItemRes = await itemRef.where('currentUserID', '==', currentUser).where('product_ID', '==', productId).get();


    if (allItemRes.empty) {
      console.log('No matching documents.');
      db.collection("savedItems").doc().set({
        product_ID: productId,
        currentUserID: currentUser
      });
      alert('Item saved')
      return;
    }
    else {
      alert('This item is already saved')
    }
  }

  const increment = () => {
    var quantity = qty + 1;
    console.log('quantity<><><', quantity)
    setQty(quantity)
  }

  const decrement = () => {
    var quantity = qty - 1;
    console.log('quantity<><><', quantity)
    setQty(quantity)
  }


  const sheetRef = React.useRef(null);

  const { id, name, price, image, size, description } = route.params
  return (

    <View>

      <View style={{ height: 250, backgroundColor: "#e47644", position: 'relative' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
          <Button type="clear"
            icon={<Feather name="arrow-left" size={28} color="white" onPress={() => navigation.goBack()} />}

          />
          <Button
            type="clear"
            icon={<Feather name="heart" size={23} color="white" style={{
              top: 10,
            }} />}
            onPress={() => savedProducts(id)}
          />
        </View>

        <ImageBackground
          source={{ uri: image }}
          resizeMode={'contain'}
          style={styles.imageStyle}
        >

        </ImageBackground>


      </View>

      <Title style={styles.nameStyle}>{name}</Title>

      <Text style={styles.priceStyle}>$ {price}</Text>

      <Title style={styles.desTitle}>Size & Measurement</Title>

      <Text style={styles.sizeStyle}>{size}</Text>

      <Title style={styles.desTitle}>Description</Title>
      <Text style={styles.descriptionStyle}>{description}</Text>


      <View style={{ flexDirection: "row", marginTop: 20 }}>

        <Title style={styles.qtyTextStyle}>Quantity:</Title>
        <View style={styles.qtyBox}>
          <TouchableOpacity
            onPress={() => increment()}
            style={styles.qtyDivideStyle}>
            <Image
              resizeMode="contain"
              style={styles.qtyIconStyle}
              source={require('../categoryimages/plus.png')}
            />
          </TouchableOpacity>
          <View style={styles.qtyDivideStyle}>
            <Text style={{ fontSize: 15, textAlign: 'center', marginLeft: 3, marginTop: 3 }}>{qty}</Text>
          </View>
          <TouchableOpacity onPress={() => {
            if (qty > 1) {
              decrement()
            }
          }}>
            <Image
              resizeMode="contain"
              style={[styles.qtyIconStyle, { marginLeft: 6 }]}
              source={require('../categoryimages/minus.png')}
            />
          </TouchableOpacity>

        </View>

      </View>


      <Button  //Add to cart button
        buttonStyle={{
          backgroundColor: "black",
          marginTop: 40,
          marginLeft: 25,
          marginRight: 25
        }}
        onPress={() => addToCartItem(id, name, price, image, size, description)}
        title="Add to Cart"
        style={{
          width: 300,
          alignSelf: "center",
          height: 100
        }}
      />

      <Button  //Add to Grocery List
        buttonStyle={{
          backgroundColor: "#024126",
          marginTop: 15,
          marginLeft: 25,
          marginRight: 25
        }}
        title="Add to Grocery List"
        style={{
          alignSelf: "center",
          height: 100
        }}
      />
      <Subtitle style={{ alignSelf: 'center', color: 'grey', margin: 5, fontSize: 11 }}>Add this product to your personal grocery list.</Subtitle>

    </View>
  )
}

const { width } = Dimensions.get('window');


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  child: {
    width,
    justifyContent: 'center',
    height: 380
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center'
  },
  imageStyle: {
    width: 250,
    bottom: 20,
    height: 200,
    alignSelf: "center",
  },
  nameStyle: {
    top: 12,
    left: 15,
    fontFamily: "recoleta-black",
    fontSize: 22,
    color: 'black'
  },
  priceStyle: {
    marginTop: 12,
    left: 15,
    color: 'black',
    fontSize: 18
  },
  sizeStyle: {
    marginTop: 2,
    left: 15,
    fontSize: 13,
    color: 'grey'
  },
  desTitle: {
    marginLeft: 15,
    marginTop: 20,
    fontSize: 14,
    color: 'black'
  },
  descriptionStyle: {
    marginTop: 2,
    fontSize: 13,
    marginLeft: 15,
    marginRight: 15,
    color: 'grey'
  },
  cartView: {
    borderWidth: 1,
    marginLeft: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: 'black',
    borderRadius: 15,
    height: 28,
    width: 90
  },
  qtyBox: {
    borderWidth: 0.7,
    flexDirection: 'row',
    borderColor: 'grey',
    left: 10,
    width: 110,
    height: 29,
    borderRadius: 4
  },
  qtyTextStyle: {
    marginLeft: 15,
    marginTop: 3,
    fontSize: 13,
    color: "black"
  },
  qtyDivideStyle: {
    width: 37,
    borderRightWidth: 0.7,
    borderColor: 'grey',
    height: 29
  },
  qtyIconStyle: {
    height: 16,
    width: 22,
    //marginLeft: 2,
    marginTop: 5,
    alignSelf: 'center'
  }
});