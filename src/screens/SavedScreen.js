import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { Button } from "react-native-elements";
import { Header, Left, Right, Title, Body } from "native-base";
import * as firebase from "firebase";
import { Feather } from "@expo/vector-icons";
import { AuthenticatedUserContext } from "../Providers/AuthenticatedUserProvider";
import { FontAwesome } from "@expo/vector-icons";
import fire, { firestore } from "../config/firebase";
import CatListData from "./CatListData";
import { FlatList } from "react-native-gesture-handler";



export default function SavedScreen({ navigation }) {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [proList, setProList] = useState([]);
  const [loader, setLoader] = useState("false");


  useFocusEffect(
    React.useCallback(() => {
      fetchFav();
    }, [])
  );


  const fetchFav = async () => {
    setLoader(true)
    const currentUser = user.uid;

    const db = firebase.firestore();

    const favItems = db.collection("savedItems")
    //const productItems = db.collection("Category").doc("kLfqtXJx6xPcjAEwrU4B").get();
    const allFavRes = await favItems.where('currentUserID', '==', currentUser).get();

    if (!allFavRes.empty) {
      var arrayList = []
      allFavRes.forEach(doc => {
        //console.log('fav items', doc.id, '=>', doc.data().product_ID);
        //idList.push(doc.data().product_ID);

        CatListData.forEach((item) => {
          firestore
            .collection("Category")
            .doc("kLfqtXJx6xPcjAEwrU4B")
            .collection(item.name)
            .get()
            .then(subCategory => {
              //console.log('Total Product in sub category: ', subCategory.size);
              subCategory.docChanges().forEach(function (anotherSnapshot) {
                //console.log('databas1122', anotherSnapshot.doc.data())
                if (anotherSnapshot.doc.data().productId == doc.data().product_ID) {
                  //console.log('databa',anotherSnapshot.doc.data())
                  arrayList.push({ ...anotherSnapshot.doc.data(), 'productID': anotherSnapshot.doc.id });
                  console.log('get log', proList)
                  setProList(arrayList);
                  setLoader(false)
                }
              })
            })
        })
      })
    }
    else {
      setLoader(false)
    }
  }


  const removeFavItem = async (productId) => {
    setLoader(true);
    const currentUser = user.uid;

    const db = firebase.firestore();

    const favItems = db.collection("savedItems")

    const removeFavRes = await favItems.where('currentUserID', '==', currentUser).where('product_ID', '==', productId).get();
    removeFavRes.forEach(item => {
      const id = item.id
      db.collection("savedItems").doc(id).delete();
    })
    await fetchFav();
    setLoader(false);
    alert('Item removed');
  }


  const addToCartItem = async (productID, id, name, price, image, size, description, stock) => {
    setLoader(true)
    const currentUser = user.uid;

    const db = firebase.firestore();

    // Create a reference to the cities collection
    const cartRef = db.collection('cartItems');

    // Create a query against the collection
    const allCartRes = await cartRef.where('currentUserID', '==', currentUser).where('product_ID', '==', id).get();


    if (allCartRes.empty) {
      console.log('No matching documents.');
      db.collection("cartItems").doc().set({
        productID: productID,
        product_ID: id,
        productName: name,
        productPrice: price,
        productImage: image,
        productSize: size,
        productDescription: description,
        productQty: 1,
        totalStock: stock,
        currentUserID: currentUser
      });
      setLoader(false);
      alert('Item added to cart');
      return;
    }
    else {
      allCartRes.forEach(doc => {
        console.log(doc.id, '=>', doc.data().productQty);
        const qty = doc.data().productQty
        db.collection("cartItems")
          .doc(doc.id)
          .update({ productQty: qty + 1 });
        setLoader(false);
        alert('Item added to cart');
      })
    }
  }


  // const fetchBasket = async () => {
  //   try {
  //     const response = await getsSavedItems();
  //     if (response && response.length) {

  //     } else {
  //       setSaved([]);
  //     }
  //     console.log("Response----", response);
  //   } catch (error) {
  //     console.log("Error---", error);
  //   }
  // };

  const Form = ({ productID, id, name, description, price, image, size, stock }) => (
    <View style={{ marginTop: 10 }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("ProductPage", {
            productID: productID,
            id: id,
            name: name,
            price: price,
            image: image,
            description: description,
            size: size,
            stock: stock
          })
        }>
        <ImageBackground
          source={{ uri: image }}
          imageStyle={{ borderRadius: 12 }}
          style={{
            height: 190,
            width: 180,
            position: "relative", // because it's parent
            marginBottom: 5,
            marginTop: 10,
            marginLeft: 15
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              position: "absolute", // child
              //bottom: 0, // position where you want
              left: 0,
              marginLeft: 10,
              fontSize: 20,
              top: 110
            }}
          >
            {name}
          </Text>

          <Text
            style={{
              left: 0,
              position: "absolute",
              fontSize: 15,
              marginLeft: 10,
              color: "white",
              top: 135
            }}
          >
            ₦ {price}
          </Text>
          {/*} <Text style={{bottom:0, left:0,position: "absolute", marginLeft:10, color:"white", fontSize:12, marginBottom:5}}>

{description}  </Text> */}
          <View style={{ alignSelf: 'flex-end', right: 10, marginTop: 10 }}>

            <Button
              type="clear"
              icon={<FontAwesome name="remove"
                size={17}
                color="white"
                style={{ alignSelf: 'center', position: 'absolute' }}
                onPress={() => removeFavItem(id)}
              />}
            />
          </View>
          <Button
            type="clear"
            icon={
              <Feather name="shopping-bag" size={18} color="white" style={{ left: 70, marginTop: 20 }}

                onPress={() => {
                  if (user?.uid) {
                    addToCartItem(productID, id, name, price, image, size, description, stock)
                  }
                }}
              />
            }
          />
        </ImageBackground>
      </TouchableOpacity>

    </View>
  );

  const renderItem = ({ item, navigation }) => (
    <Form
      productID={item.productID}
      id={item.productId}
      name={item.name}
      description={item.description}
      image={item.image}
      price={item.price}
      size={item.size}
      stock={item.totalStock}

    />

  )


  return (
    <View >
      <ScrollView showsVerticalScrollIndicator={false}>

        <Title
          style={{
            textAlign: "left",
            color: "black",
            marginLeft: 15,
            marginTop: 20,
            fontSize: 26,
            fontFamily: "recoleta-black",

          }}>
          Saved Items
        </Title>

        <Title
          style={{
            textAlign: "left",
            color: "black",
            marginLeft: 15,
            bottom: 3,
            fontSize: 15,
            fontFamily: "recoleta-black",

          }}>
          Keep track of groceries you love.{" "}
        </Title>

        {loader ?
          <View style={{ marginTop: 200 }}>
            <ActivityIndicator size="large" color="#4267B2" />
          </View>
          :
          (proList.length != 0 ? <FlatList
            data={proList}
            renderItem={({ item }) =>
              renderItem({ navigation, item })
            }

          />
            : <View style={{ flex: 1, alignItems: 'center', marginTop: 200 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>No saved items</Text>
            </View>)
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 70,
  },

  rest: {
    textAlign: "center",
    marginTop: 100,
  },

  best: {
    justifyContent: "flex-start",
    marginTop: 20,
  },

  sitch: {
    alignItems: "flex-end",
    paddingTop: 45,
    paddingRight: 12,
  },
});
