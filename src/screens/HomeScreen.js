import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { Button } from "react-native-elements";
import { useFocusEffect } from '@react-navigation/native';
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
import Vortex from "../Svg/Vortex.svg";

import page from "../rmg/page.png";

import data from "./data";
import CatListData from "./CatListData";
import fire, { firestore } from "../config/firebase";
import { saveItems, getCategoryData } from "../../API/firebaseMethods";
import DatePicker from 'react-native-datepicker';
import moment from "moment";
import * as firebase from "firebase";
import { AntDesign } from "@expo/vector-icons";
import bag from "../img/bag.png"
import { AuthenticatedUserContext } from "../Providers/AuthenticatedUserProvider";
import artfruits from "../img/artfruits.png"
import lagos from "../homescreenimages/lagos.png"
import InputField from "../Components/InputField";


const user = firebase.auth().currentUser;

var today = new Date();


export default function HomeScreen({ navigation }) {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [proList, setProList] = useState([]);
  const [loader, setLoader] = useState("false");
  const { updateCart } = useContext(AddCartContext);
  const { updateSaved } = useContext(AddSavedContext);
  const [randomList, setRandomList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(moment(today).format('MMMM Do, YYYY'));
  const [total, setTotal] = useState(0);
  const [group, setGroup] = useState('');


  const useCart = updateCart;
  const useSaved = updateSaved;

  useFocusEffect(
    React.useCallback(() => {
      getProducts();
      fetchGroceryList();
      calculateTotal();
    }, [])
  );


  const getProducts = () => {
    var arrayList = [];
    setLoader(true);
    CatListData.forEach((item) => {
      firebase.firestore().collection("Category").doc("kLfqtXJx6xPcjAEwrU4B").collection(item.name)
        .get()
        .then(subCategory => {
          subCategory.docChanges().forEach(function (anotherSnapshot) {
            arrayList.push({ ...anotherSnapshot.doc.data(), 'productID': anotherSnapshot.doc.id });
            setProList(arrayList.slice(0, 5))
            setLoader(false);
          })
        })
    })
  }

  const fetchGroceryList = async () => {
    setLoader(true)
    var arrList = []
    const currentUser = user.uid;

    const db = firebase.firestore();

    const groceItems = db.collection("groceryList")

    const allCartRes = await groceItems.where('currentUserID', '==', currentUser).get();

    if (!allCartRes.empty) {

      allCartRes.forEach(doc => {
        arrList.push(doc.data())
        setProList(arrList)
        setLoader(false);
      })
    }
    else {
      setLoader(false)
    }
  }


  const calculateTotal = () => {
    let totalVal = 0
    for (let i = 0; i < proList.length; i++) {
      totalVal = totalVal + (proList[i].productPrice * proList[i].productQty)
    }
    setTotal(totalVal)
  }


  async function getCategoryData2(categoryName) {
    console.log("Kalim categoryNameaaasasas ----", categoryName);
    var arrayList = []
    try {
      const db = firebase.firestore();
      await db.collection("Category")
        .doc("kLfqtXJx6xPcjAEwrU4B")
        .collection(categoryName)
        .get()
        .then(subCategory => {
          //console.log('Total Product in sub category: ', subCategory.size);
          subCategory.docChanges().forEach(function (anotherSnapshot) {
            //console.log('databas1122', anotherSnapshot.doc.data())
            arrayList.push(anotherSnapshot.doc.data())
          })

        })
      return arrayList
    }
    catch (err) {
      return
    }

  }

  const fetchProducts = async () => {
    var arrayList = [];
    console.log("CallAfterfetched 1")
    CatListData.forEach((item) => {

      var response = getCategoryData2(item.name)
      console.log("Kalim Response ", response)
      const numFruits = Promise.all(response)
      console.log("KKKK ", numFruits)

      // Promise.resolve(response).then(value=>{
      //   if( value.length>0)
      //   {
      //     console.log('value:',value[0])
      //   }

      //   }) 

      // firestore
      //   .collection("Category")
      //   .doc("kLfqtXJx6xPcjAEwrU4B")
      //   .collection(item.name)
      //   .get()
      //   .then(subCategory => {
      //     //console.log('Total Product in sub category: ', subCategory.size);
      //     subCategory.docChanges().forEach(function (anotherSnapshot) {
      //       //console.log('databas1122', anotherSnapshot.doc.data())
      //       arrayList.push(anotherSnapshot.doc.data())
      //       setProList(arrayList);
      //     })
      //   })

    })
  }


  const addToCartItem = async (productID, productId, name, price, image, size, description, stock) => {
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
        productID: productID,
        product_ID: productId,
        productName: name,
        productPrice: price,
        productImage: image,
        productSize: size,
        productDescription: description,
        productQty: 1,
        currentUserID: currentUser,
        totalStock: stock
      });
      setLoader(false);
      alert('Item added to cart');
      return;
    }
    else {
      setLoader(false);
      alert('Item already added in cart');
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


  const getRandom = async () => {
    var arr = [];
    var list = []
    while (arr.length < 8) {
      var r = Math.floor(Math.random() * 10) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    console.log('aar', arr);
    arr.forEach((obj) => {
      console.log('daaaa', proList[obj])
      // list.push(proList[obj])
      // console.log('daaaa1111', list)
      // setRandomList(list)
    })
  }

  //Structure of the product list.
  const Form = ({ productID, productId, name, description, price, image, images, size, stock }) => (

    <ImageBackground
      source={{ uri: image }} //Background Image
      imageStyle={{ borderRadius: 12 }}
      style={{
        height: 210,
        width: 170,
        position: "relative", // because it's parent
        marginBottom: 10,
        marginTop: 10,
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
          marginBottom: 40,
          marginLeft: 12,
          fontSize: 20
        }}
      >
        {name}
      </Text>

      <Text style={{
        bottom: 0,
        left: 0,
        fontWeight: "bold",
        position: "absolute",
        fontSize: 15,
        marginBottom: 20,
        marginLeft: 15,
        color: "white"
      }}>₦ {price} {""}</Text>

      <View style={{ flexDirection: "row", marginLeft: 5, justifyContent: 'space-between', marginRight: 5 }}>
        <Button
          type="clear"
          style={{
            marginTop: 3
          }}
          icon={<Feather name="heart" size={20} color="white" />}
          onPress={() => {
            console.log("User--------", user);
            if (user?.uid) {
              savedProducts(productId)
            } else {
              //navigation.navigate("ProfileScreen");
            }
          }}
        />

        <Button
          type="clear"
          style={{ right: 0, top: 0, marginTop: 3, paddingLeft: 102 }}
          icon={<Feather name="shopping-bag" size={18} color="white" />}
          onPress={() => {
            if (user?.uid) {
              addToCartItem(productID, productId, name, price, image, size, description, stock)
            }
          }}
        />
      </View>
    </ImageBackground>
  );

  //Render Items.
  const renderItem = (
    { item, useCart, useSaved, navigation } //had to remove navigation here so i could also render navigation.
  ) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductPage", {
          productID: item.productID,
          id: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          description: item.description,
          size: item.size,
          stock: item.totalStock
        })
      }
    >
      <Form
        productID={item.productID}
        productId={item.productId}
        name={item.name}
        description={item.description}
        image={item.image}
        price={item.price}
        size={item.size}
        stock={item.totalStock}

      />
    </TouchableOpacity>
  );


  const renderContent = () => (
    <View style={{ flex: 1, backgroundColor: 'white', height: 450, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
      {/* <ScrollView showsVerticalScrollIndicator={false}>

        <Title
          style={{
            textAlign: "left",
            color: "black",
            marginLeft: 15,
            marginTop: 15,
            fontSize: 28,
            fontFamily: "recoleta-black",

          }}>
          Set up
        </Title>
        <Title
          style={{
            textAlign: "left",
            color: "black",
            bottom: 5,
            marginLeft: 15,
            fontSize: 28,
            fontFamily: "recoleta-black",

          }}>
          Grocery
        </Title>
        <Title
          style={{
            textAlign: "left",
            color: "black",
            marginLeft: 15,
            bottom: 5,
            fontSize: 28,
            fontFamily: "recoleta-black",
          }}>
          list.
        </Title>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ flexDirection: 'row', alignSelf: 'flex-start', margin: 15 }}>
          <View
            style={styles.qtyDivideStyle}>
            <Image
              resizeMode="contain"
              style={styles.qtyIconStyle}
              source={require('../categoryimages/plus.png')}
            />
          </View>
          <Text style={{ color: 'grey' }}>Create grocery list group</Text>

        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 12, marginTop: 30 }}>
          <Text style={{ fontWeight: '700', fontSize: 18 }}>Kid's List</Text>

          <View>
            <Text style={{ color: 'grey', marginRight: 10 }}>edit</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>

          <DatePicker
            locale={'es'}
            style={{ width: '30%', marginLeft: 6 }}
            date={startDate}
            mode="date"
            format="MMMM Do, YYYY"
            minDate={moment(today).format('MMMM Do, YYYY')}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            allowFontScaling={false}
            showIcon={false}
            customStyles={{
              dateInput: {
                borderWidth: 0,
                bottom: 15
              }
            }}
            onDateChange={(date) => {
              setStartDate(date)
              setShow(false)
            }}
          />
          <Button type="clear"
            buttonStyle={{ bottom: 10 }}
            icon={<AntDesign
              name="caretdown"
              size={13}
            />}
          />

        </View>

        {loader ? <View style={{ marginTop: 100 }}>
          <ActivityIndicator size="large" color="#4267B2" />
        </View> : null}


        {proList.length != 0 ? <View style={{
          flex: 1,
          padding: 3,
        }}>
          <FlatList
            data={proList}
            renderItem={({ item }) => {
              return (
                <View style={{ margin: 10 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={{ uri: item.productImage }}
                      style={{
                        height: 70,
                        width: 60
                      }}
                    />
                    <View style={{ marginLeft: 20 }}>
                      <Title style={{ color: '#696969', fontSize: 15, margin: 30 }}>x{item.productQty}</Title>

                    </View>
                    <Title
                      style={{
                        alignSelf: "flex-start",
                        marginTop: 30,
                        width: 115,
                        fontSize: 14,
                        marginLeft: 5,
                        color: '#696969'
                      }}>
                      {item.productName}
                    </Title>
                    <View style={{ flexDirection: 'row' }}>

                      <Text style={{
                        fontSize: 14,
                        marginTop: 30,
                        color: '#696969'
                      }}>₦ {item.productPrice}
                      </Text>
                      <TouchableOpacity
                        style={styles.qtyDivide}>
                        <Image
                          resizeMode="contain"
                          style={styles.qtyIcon}
                          source={require('../categoryimages/minus.png')}
                        />
                      </TouchableOpacity>

                    </View>
                  </View>
                </View>
              );
            }}
          />
          <View style={styles.totalStyle}>
            <Title style={styles.titleStyle}>Total:</Title>
            <Title style={[styles.titleStyle, { marginLeft: 5 }]}>₦{total}</Title>
          </View>
        </View>
          :
          <View style={{ flex: 1, alignItems: 'center', marginTop: 200 }}>
            <Text style={{ fontSize: 16, color: 'black' }}>No Items</Text>
          </View>
        }
      </ScrollView> */}
      {/* <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <InputField
              inputStyle={{
                fontSize: 14,
              }}
              containerStyle={{
                backgroundColor: "#fff",
                margin: 10,
                borderBottomWidth: 1,
                borderColor: 'grey'
              }}
              placeholder="Enter group name"
              autoCapitalize="none"
              autoFocus={true}
              value={group}
              onChangeText={(text) => setGroup(text)}
            />
            <Button
              buttonStyle={{
                backgroundColor: "black",
                margin: 10,
                height: 35
              }}
              title="Create group"
              titleStyle={{ fontSize: 13 }}
              style={{
                alignSelf: "center",

              }}
            // onPress={() => createGroup()}
            />
          </View>
        </View>
      </Modal> */}
    </View>
  )


  const sheetRef = React.useRef(null);

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            style={{
              width: 349,
              height: 100,
              alignSelf: "center",
              borderRadius: 10,
              marginTop: 25,
            }}
            source={ban}
          />

          <Image
            style={{
              width: 349,
              height: 400,
              alignSelf: "center",
              borderRadius: 10,
              marginTop: 15,
            }}
            source={artfruits}
          />

          <Image
            style={{
              width: 349,
              height: 350,
              alignSelf: "center",
              borderRadius: 10,
              marginTop: 15,
            }}
            source={bag}
          />

          <Image
            style={{
              width: 349,
              height: 70,
              alignSelf: "center",
              borderRadius: 10,
              marginTop: 18,
            }}
            source={lagos}
          />

          <Title
            style={{
              alignSelf: "flex-start",
              fontSize: 30,
              marginLeft: 8,
              marginTop: 20,
              color: 'black',
              fontFamily: "recoleta-black",
            }}
          >
            Grocery Boxes
          </Title>
          <Text
            style={{
              marginLeft: 12,
              fontSize: 13,
              color: 'grey',
              alignSelf: "flex-start",

            }}
          >
            Get whole grocery boxes at affordable prices.
          </Text>

          {/* <TouchableOpacity onPress={() => navigation.navigate("DealsScreen")}>
            <Subtitle
              style={{
                marginLeft: 15,
                fontSize: 13,
                color: "black",
                marginTop: 3,
                alignSelf: "flex-start",
              }}
            >
              See all boxes
            </Subtitle>
          </TouchableOpacity> */}
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <FlatList
              horizontal={true}
              contentContainerStyle={{ marginBottom: 60 }}
              //maxToRenderPerBatch={5}
              showsHorizontalScrollIndicator={false}
              data={proList}
              renderItem={({ item }) =>
                renderItem({ navigation, item, useCart, useSaved })
              }
            />
          </View>
        </View>

        {/* <View
          style={{
            backgroundColor: "#e47644",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: 200,
            marginTop: 50,

          }}
        > */}
        {/* <Title
            style={{
              marginTop: 10,
              fontSize: 25,
              alignSelf: "center",
              color: "white",

            }}
          >
            My Grocery List
          </Title> */}

        {/* <Subtitle style={{ alignSelf: "center", marginTop: 5, color: "black", fontSize: 12 }}> Create your own personalized grocery list and have{" "}</Subtitle>

          <Subtitle style={{ alignSelf: "center", color: "black", fontSize: 12 }}> it delivered on your selected date.</Subtitle>
 */}


        {/* <Orangelong style={{position:"absolute", marginTop:480, marginLeft:230}} /> */}

        {/* <Title
            style={{
              fontSize: 15,
              alignSelf: "center",
              bottom: 7,
              color: "white",

            }}
          >
            Selected date of delivery
          </Title> */}
        {/* </View> */}
      </ScrollView>
      <View style={{
        position: 'absolute',
        justifyContent: 'center',
        bottom: 0,
        height: 55,
        backgroundColor: 'black',
        width: '100%'
      }}>
        <Button //Checkout Button
          buttonStyle={{
            backgroundColor: "black",
            margin: 20
          }}
          title="Edit Grocery List"
          onPress={() => sheetRef.current.snapTo(0)}
        />
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[8, 10, 500]}
        position={'absolute'}
        borderRadius={10}
        renderContent={renderContent}
        enabledInnerScrolling={false}
        enabledContentTapInteraction={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 120
  },
  modalView: {
    backgroundColor: 'white',
    height: 130,
    width: '70%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleStyle: {
    fontSize: 16,
    color: "black",
    fontWeight: 'bold'
  },
  totalStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    right: 50,
    marginTop: 10
  },
});
