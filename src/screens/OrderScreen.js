import React, { useContext, useState } from "react";
import { View, Text, ScrollView, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { Button } from "react-native-elements"
import { Header, Left, Right, Title, Body } from "native-base"
import { Feather } from '@expo/vector-icons';
import firebase from "firebase/compat/app"
//import * as firebase from "firebase";
import { useFocusEffect } from '@react-navigation/native';
import { AuthenticatedUserContext } from "../Providers/AuthenticatedUserProvider";

export default function OrderScreen({ navigation }) {
  const { user, setUser } = useContext(AuthenticatedUserContext);

  const [orderList, setOrderList] = useState([]);
  const [loader, setLoader] = useState("false");


  useFocusEffect(
    React.useCallback(() => {
      fetchOrders();
    }, [])
  );


  const fetchOrders = async () => {
    setLoader(true)
    const currentUser = user.uid;

    const db = firebase.firestore();

    const orderItems = db.collection("orders")
    const allFavRes = await orderItems.where('userId', '==', currentUser).get();

    if (!allFavRes.empty) {
      var arr = []
      allFavRes.forEach(doc => {
        console.log('get orders', doc)
        arr.push(doc)
        setOrderList(arr)
        setLoader(false)
      })
    }
    else {
      setLoader(false)
    }
  }


  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Header>
          <Left>
            <Button type="clear" style={{ paddingLeft: 9 }}
              icon={<Feather name="arrow-left"
                size={25}
                color="white" />}
              onPress={() => navigation.navigate("My Profile")} />

          </Left>
          <Body>
            <Title style={{ textAlign: "center" }}>My Order History</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <View>
        {orderList.length != 0 ?  <FlatList
            data={orderList}
            renderItem={({ item }) => {
              return (
                <View style={styles.orderStyle}>
                  <View style={{ margin: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ marginLeft: 3, marginTop: 5, marginBottom: 5, fontWeight: '700' }}>{item.data().date}</Text>
                      <Text
                        onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
                        style={{ textAlign: 'right', fontSize: 11, color: '#3b5998', textDecorationLine: 'underline' }}>View detail</Text>
                    </View>
                    <View style={styles.itemStyle}>
                      <Text style={styles.titleStyle}>Delivery Address:</Text>
                      <Text>{item.data().address}</Text>
                    </View>
                    <View style={styles.itemStyle}>
                      <Text style={styles.titleStyle}>OrderId:</Text>
                      <Text>#{item.data().order_id}</Text>
                    </View>
                    <View style={styles.itemStyle}>
                      <Text style={styles.titleStyle}>SubTotal:</Text>
                      <Text>{item.data().subtotal}</Text>
                    </View>
                    <View style={styles.itemStyle}>
                      <Text style={styles.titleStyle}>Delivery charges:</Text>
                      <Text>#{item.data().deliveryFee}</Text>
                    </View>
                    <View style={styles.itemStyle}>
                      <Text style={styles.titleStyle}>Total Amount:</Text>
                      <Text>{item.data().total}</Text>
                    </View>
                    <View style={styles.itemStyle}>
                      <Text style={styles.titleStyle}>PaymentMode:</Text>
                      <Text>{item.data().orderType}</Text>
                    </View>
                  </View>
                </View>
              )
            }
            }
          />
            :
          <View style={{ flex: 1, alignItems: 'center', marginTop: 200 }}>
            <Text style={{ fontSize: 16, color: 'black' }}>No Orders</Text>
          </View>
        }
        </View>

        {/* <Text style={{ marginTop: 40, fontWeight: "bold", left: 9 }}>Order Date: 25th August 1992</Text>

        <Text style={{ marginTop: 10, fontWeight: "bold", left: 9 }}>Delivery Address: Mark Road Street</Text>

        <Text style={{ marginTop: 20, color: "#60d394", left: 9, fontSize: 20, fontWeight: "bold" }} >Successful</Text>
 */}

        {/* <View style={{ flexDirection: "row" }}>

          <ImageBackground

            source={require("../img/sig.png")}  //This is where the image of product bought goes to.
            imageStyle={{ borderRadius: 12 }} //For reshaping the image.

            style={{
              height: 140,
              width: 150,
              position: 'relative', // because it's parent
              marginBottom: 15,
              marginTop: 120,
              marginRight: 1,
              marginLeft: 4,
              //top: 2,
              left: 2
            }}
          >

          </ImageBackground>


          <View style={{ flexDirection: "column", paddingRight: 90, paddingTop: 120 }}>
            <Title
              style={{
                marginBottom: 2,   //For passing down the Name.
                marginRight: 88,
                marginTop: 30,
                fontSize: 20,

                color: "black"
              }}>
              {""} Fruit
            </Title>




            <Title style={{
              marginRight: 90,  //For passing down the Price.
              marginBottom: 3,
              marginTop: 5,
              fontSize: 17,
              color: "black"
            }}>$500
            </Title>



            <Title style={{
              marginRight: 112,  //For passing down the quantity bought.
              marginBottom: 10,
              marginTop: 6,
              marginLeft: 20,
              marginRight: 85,
              fontSize: 12,
              color: "black"
            }}>Quantity:6</Title>





          </View>

          <Title style={{ position: "absolute", top: 280, left: 0, marginLeft: 5 }}
          >Total Price: $600</Title>

        </View> */}

        {loader ?
          <View style={{ marginTop: 250 }}>
            <ActivityIndicator size="large" color="#4267B2" />
          </View>
          : null}
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  orderStyle: {
    flex: 1,
    margin: 10,
    borderWidth: 0.6,
    borderColor: 'lightgrey',
    borderRadius: 8
  },
  itemStyle: {
    flexDirection: 'row',
    margin: 2
  },
  titleStyle: {
    color: 'grey',
    marginRight: 10
  }
})