import React, { useContext, useState } from 'react'
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Button } from "react-native-elements";
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Title, Subtitle } from 'native-base';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import * as firebase from "firebase";
import { AuthenticatedUserContext } from '../Providers/AuthenticatedUserProvider';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import { ScrollView } from 'react-native-gesture-handler';


export default function ProductPage({ route, navigation }) {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [imageList, setImageList] = useState([]);
  const [qty, setQty] = useState(1);
  const [loader, setLoader] = useState("false");
  const [outStock, setoutStock] = useState(0);
  const [almostStock, setalmostStock] = useState(0);


  useFocusEffect(
    React.useCallback(() => {
      getProductImages()
      getStock()
    }, [])
  );


  const getProductImages = () => {
    var arrayList = [];
    setLoader(true);
    firebase.firestore().collection("productImages").doc(route.params.productID).collection('images')
      .get()
      .then(subData => {
        subData.docChanges().forEach(function (anotherSnapshot) {
          // console.log('databas1122 get id', anotherSnapshot.doc.id)
          arrayList.push(anotherSnapshot.doc.data());
          setLoader(false);
          setImageList(arrayList);
        })
      })
  }


  const getStock = async () => {

    const db = firebase.firestore();

    db.collection("settings").get().then(item => {
      //console.log('Total Product: ', item.docChanges());
      item.docChanges().forEach(function (anotherSnapshot) {
        setoutStock(anotherSnapshot.doc.data().outOfStock)
        setalmostStock(anotherSnapshot.doc.data().almostOutOfStock)
      })
    })
  }


  const placeholder = {
    label: 'Select Quantity',
    textAlign: "center",
    color: 'grey',
    marginLeft: 30,
    value: 1
  };

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
        productQty: qty,
        totalStock: stock,
        currentUserID: currentUser
      });
      setLoader(false);
      alert('Item added to cart');
      // navigation.navigate('CartScreen');
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
        // navigation.navigate('CartScreen');
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

  const groceryListAdd = async (productID, productId, name, price, image, size, description, stock) => {
    setLoader(true)
    const currentUser = user.uid;

    const db = firebase.firestore();

    // Create a reference to the cities collection
    const cartRef = db.collection('groceryList');

    // Create a query against the collection
    const allCartRes = await cartRef.where('currentUserID', '==', currentUser).where('product_ID', '==', productId).get();


    if (allCartRes.empty) {
      console.log('No matching documents.');
      db.collection("groceryList").doc().set({
        productID: productID,
        product_ID: productId,
        productName: name,
        productPrice: price,
        productImage: image,
        productSize: size,
        productDescription: description,
        productQty: qty,
        totalStock: stock,
        currentUserID: currentUser
      });
      setLoader(false);
      alert('This Item is added in grocerylist');
    }
    else {
      alert('This item is already added')
    }
  }

  // const increment = () => {
  //   var quantity = qty + 1;
  //   console.log('quantity<><><', quantity)
  //   setQty(quantity)
  // }

  // const decrement = () => {
  //   var quantity = qty - 1;
  //   console.log('quantity<><><', quantity)
  //   setQty(quantity)
  // }

  const addStock = () => {
    alert('Product is out of stock')
  }


  const handleClick = async (value) => {
    setQty(value)
  };


  const { productID, id, name, price, image, size, description, stock } = route.params


  const renderContent = () => (
    <ScrollView
      style={{
        backgroundColor: 'white',
        padding: 7,
        height: 1350,
      }}
    >

      <Ionicons style={{ alignSelf: "center" }} name="remove-outline" size={35} color="gray" />

      <Button
        type="clear"
        buttonStyle={{ alignSelf: 'flex-end' }}
        icon={<Feather name="heart" size={23} color="black" />}
        onPress={() => savedProducts(id)}
      />

      <Title style={styles.nameStyle}>{name} </Title>

      <Title style={styles.priceStyle}> ${price}</Title>

      <Subtitle style={{ paddingTop: 5, color: 'grey', textAlign: 'center', fontSize: 12 }}>Scrolldown to view more info</Subtitle>


      <View
        style={{
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
          marginTop: 10
        }}
      />

      <Button  //Add to cart button
        buttonStyle={{
          backgroundColor: "black",
          opacity: stock <= outStock ? 0.3 : null,
          marginTop: 25,
          width: 340,
          alignSelf: "center"
        }}
        onPress={() => { stock <= outStock ? addStock() : addToCartItem(productID, id, name, price, image, size, description, stock) }}

        title="Add to Cart"
        style={{
          height: 100
        }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>

        <Title style={styles.desTitle}>Product description</Title>
        {
          stock <= outStock ?
            <Image
              source={require('../img/out-stock.png')}
              resizeMode={'contain'}
              style={styles.stockImageStyle}
            />
            :
            (
              stock <= almostStock ?
                <Image
                  source={require('../img/almost-stock.png')}
                  resizeMode={'contain'}
                  style={styles.stockImageStyle}

                />
                : null
            )
        }
      </View>
      <Text number={7} style={(stock <= outStock || stock <= almostStock) ? styles.descriptionStyle : styles.descriptionStyle1}>{description}</Text>

      <View
        style={{
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
          marginTop: 19
        }}
      />

      <View style={{ marginTop: 130, flexDirection: 'row' }}>

        <Title style={styles.desTitle}>Quantity</Title>

        <View style={{ marginLeft: 20, width: 80, marginTop: 30 }}>
          <RNPickerSelect
            placeholder={{}}
            value={qty}
            onValueChange={(itemValue) => handleClick(itemValue)}
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
                borderWidth: 1,
                paddingRight: 10,
                paddingLeft: 20,
                bottom: 5,
                color: 'black'
              },
              iconContainer: {
                top: 6,
                left: 45,
              },

            }}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return < Chevron size={1.1} color="black" />;
            }}
          />
        </View>

        {/* <View style={styles.qtyBox}> */}
        {/* <TouchableOpacity
            onPress={() => increment()}
            style={styles.qtyDivideStyle}>
            <Image
              resizeMode="contain"
              style={styles.qtyIconStyle}
              source={require('../categoryimages/plus.png')}
            />
          </TouchableOpacity> */}
        {/* <View style={styles.qtyDivideStyle}>
            <Text style={{ fontSize: 15, textAlign: 'center', marginLeft: 3, marginTop: 3 }}>{qty}</Text>
          </View> */}
        {/* <TouchableOpacity onPress={() => {
            if (qty > 1) {
              decrement()
            }
          }}>
            <Image
              resizeMode="contain"
              style={[styles.qtyIconStyle, { marginLeft: 6 }]}
              source={require('../categoryimages/minus.png')}
            />
          </TouchableOpacity> */}

        {/* </View> */}

      </View>

      <Title style={{
        alignSelf: "flex-start", marginTop: 75, marginLeft: 15, fontWeight: '700',
        fontSize: 14,
        color: 'black'
      }}>Size & Measurement</Title>

      <Text style={styles.sizeStyle}>{size}</Text>

      <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 60 }}>

        <View style={{ margin: 10 }}>
          <MaterialCommunityIcons style={{ alignSelf: "center" }} name="egg-outline" size={25} />
          <Subtitle style={styles.boxStyle}>Fresh Grocery</Subtitle>
        </View>

        <View style={{ margin: 10 }}>
          <MaterialCommunityIcons style={{ alignSelf: "center" }} name="package-variant-closed" size={25} />
          <Subtitle style={styles.boxStyle}>Well Preserved</Subtitle>
        </View>

        <View style={{ margin: 10 }}>
          <MaterialCommunityIcons style={{ alignSelf: "center" }} name="flower-outline" size={25} />
          <Subtitle style={styles.boxStyle}>Quality Product</Subtitle>
        </View>


      </View>

      <View
        style={{
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
          marginTop: 30
        }}
      />

      <Button  //Add to Grocery List
        buttonStyle={{
          backgroundColor: "#024126",
          marginTop: 60,
          alignSelf: "center",
          width: 340
        }}
        title="Add to Grocery List"
        onPress={() => groceryListAdd(productID, id, name, price, image, size, description, stock)}
        style={{
          height: 100
        }}
      />
      <Subtitle style={{ textAlign: 'center', marginTop: 50, color: 'grey', fontSize: 12 }}>Add this product to your personal grocery list.</Subtitle>

    </ScrollView>
  )



  const sheetRef = React.useRef(null);

  return (
    <View>

      <View style={{ height: 350, backgroundColor: "#e47644" }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
          <Button type="clear"
            icon={<Feather name="arrow-left" size={28} color="white" onPress={() => navigation.goBack()} />}

          />
          {/* <Button
            type="clear"
            icon={<Feather name="heart" size={23} color="white" style={{
              top: 15,
            }} />}
            onPress={() => savedProducts(id)}
          /> */}
        </View>

        <SwiperFlatList
          data={imageList}
          renderItem={({ item, index }) => (
            <Image
              style={styles.imageStyle}
              resizeMode={'contain'}
              source={{ uri: item.image }}
            >
            </Image>
          )}
          showPagination
          //PaginationComponent={CustomPagination}
          e2eID="container_swiper_renderItem"
        />
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[30, 10, 780]}
        borderRadius={15}
        renderContent={renderContent}
        enabledInnerScrolling={false}
        enabledContentTapInteraction={false}
      />

    </View>

    /* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View>
        <Title style={styles.nameStyle}>{name}</Title>

        <Text style={styles.priceStyle}>$ {price}</Text>
      </View>
      <View>

      </View>
    </View> */

    /* <Title style={styles.desTitle}>Size & Measurement</Title>

    <Text style={styles.sizeStyle}>{size}</Text>

    <Title style={styles.desTitle}>Description</Title>
    <Text style={styles.descriptionStyle}>{description}</Text> */



    /* <Button  //Add to cart button
      buttonStyle={{
        backgroundColor: "black",
        marginTop: 30,
        marginLeft: 25,
        marginRight: 25
      }}
      onPress={() => addToCartItem(productID, id, name, price, image, size, description, stock)}
      title="Add to Cart"
      style={{
        width: 300,
        alignSelf: "center",
        height: 100
      }}
    /> */

    /* <Button  //Add to Grocery List
      buttonStyle={{
        backgroundColor: "#024126",
        marginTop: 15,
        marginLeft: 25,
        marginRight: 25
      }}
      onPress={() => groceryListAdd(productID, id, name, price, image, size, description, stock)}
      title="Add to Grocery List"
      style={{
        alignSelf: "center",
        height: 100
      }}
    /> */
    /* <Subtitle style={styles.subStyle}>Add this product to your personal grocery list.</Subtitle> */

    // <View>

    //   <SwiperFlatList autoplayDelay={2} autoplayLoop index={2} showPagination >
    //     <View style={[styles.child, { backgroundColor: 'tomato' }]}>
    //       <Text style={styles.text}>1</Text>
    //     </View>
    //     <View style={[styles.child, { backgroundColor: 'thistle' }]}>
    //       <Text style={styles.text}>2</Text>
    //     </View>
    //     <View style={[styles.child, { backgroundColor: 'skyblue' }]}>
    //       <Text style={styles.text}>3</Text>
    //     </View>
    //     <View style={[styles.child, { backgroundColor: 'teal' }]}>
    //       <Text style={styles.text}>4</Text>
    //     </View>
    //   </SwiperFlatList>

    //   <BottomSheet
    //     ref={sheetRef}
    //     snapPoints={[8, 6, 830]}
    //     borderRadius={15}
    //     renderContent={renderContent}
    //     enabledInnerScrolling={false}
    //   />

    // </View>
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
    width: width,
    bottom: 20,
    height: 200,
    alignSelf: "center",
  },
  nameStyle: {
    left: 15,
    fontFamily: "recoleta-black",
    fontSize: 22,
    color: 'black'
  },
  priceStyle: {
    left: 15,
    fontFamily: "recoleta-black",
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
    marginTop: 30,
    fontWeight: '700',
    fontSize: 14,
    color: 'black'
  },
  descriptionStyle: {
    bottom: 10,
    fontSize: 13,
    marginLeft: 15,
    marginRight: 15,
    color: 'grey'
  },
  descriptionStyle1: {
    marginTop: 10,
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
    marginTop: 10,
    flexDirection: 'row',
    borderColor: 'grey',
    left: 15,
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
  },
  stockImageStyle: {
    alignSelf: 'flex-end',
    height: 80,
    width: 120,
    left: 10,
    bottom: 5,
  },
  subStyle: {
    alignSelf: 'center',
    color: 'grey',
    marginTop: 10,
    marginBottom: 15,
    fontSize: 11
  },
  boxStyle: {
    fontSize: 12,
    color: 'grey',
    marginTop: 5
  }
});