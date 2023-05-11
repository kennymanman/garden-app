import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { Button } from "react-native-elements";
import { Header, Left, Right, Title } from "native-base";
import * as firebase from "firebase";
import { AuthenticatedUserContext } from "../Providers/AuthenticatedUserProvider";
import { AntDesign } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import DatePicker from 'react-native-datepicker';
import moment from "moment";
import InputField from "../Components/InputField";

var today = new Date();


export default function Grocerylist({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [proList, setProList] = useState([]);
  const [loader, setLoader] = useState("false");
  const [startDate, setStartDate] = useState(moment(today).format('MMMM Do, YYYY'));
  const [total, setTotal] = useState(0);
  const [group, setGroup] = useState('');


  useFocusEffect(
    React.useCallback(() => {
      fetchGroceryList();
      calculateTotal();
    }, [])
  );


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
    await fetchGroceryList();
    setLoader(false);
    alert('Item removed');
  }


  const calculateTotal = () => {
    let totalVal = 0
    for (let i = 0; i < proList.length; i++) {
      totalVal = totalVal + (proList[i].productPrice * proList[i].productQty)
    }
    setTotal(totalVal)
  }

  const createGroup = async () => {
    if (!group) {
      alert("enter group name");
    } else {
      // setLoader(true);
      const currentUser = user.uid;

      const db = firebase.firestore();

      const groupItem = db.collection('groups').doc(currentUser).doc().set({ groupname: group });

      console.log('get all res', groupItem)

      // if (allRes.empty) {

      //   db.collection("groups").doc(currentUser).set(group);

      //   setModalVisible(!modalVisible);
      //   setLoader(false);
      // }
      // else {
      //   setModalVisible(!modalVisible);
      //   setLoader(false);
      // }
    }
  }


  return (
    <View >
      <ScrollView showsVerticalScrollIndicator={false}>

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
                // <TouchableOpacity
                //   activeOpacity={0.8}
                //   onPress={() => navigation.navigate("ProductPage", {
                //     id: item.product_ID,
                //     name: item.productName,
                //     price: item.productPrice,
                //     image: item.productImage,
                //     description: item.productDescription,
                //     size: item.productSize
                //   })}
                // >

                //   <View style={{ flexDirection: "row" }}>

                //     <ImageBackground
                //       source={{ uri: item.productImage }}
                //       imageStyle={{ borderRadius: 12 }} //For reshaping the image.
                //       style={{
                //         height: 125,
                //         width: 140,
                //         position: 'relative', // because it's parent
                //         margin: 10,
                //       }}
                //     >
                //       <Button
                //         type="clear"
                //         icon={<FontAwesome name="remove"
                //           size={17}
                //           color="white"
                //           style={{ right: 50 }}
                //         />}
                //       />
                //     </ImageBackground>

                //     <View>
                //       <Title
                //         style={{
                //           alignSelf: "flex-start",
                //           marginTop: 20,
                //           fontSize: 16,
                //           marginLeft: 5,
                //           fontWeight: 'bold',
                //           color: "black"
                //         }}>
                //         {item.productName}
                //       </Title>
                //       <Text style={{
                //         marginLeft: 5,
                //         marginTop: 5,
                //         fontWeight: 'bold',
                //         fontSize: 14,
                //         color: "black"
                //       }}>₦ {item.productPrice}
                //       </Text>
                //       <View style={{ marginTop: 7, marginLeft: 6 }}>
                //         <Title style={{ alignSelf: "flex-start", color: 'black', fontSize: 12 }}>Quantity:  {item.productQty}</Title>

                //       </View>
                //     </View>
                //   </View>
                //   {/* <View style={styles.totalBorderStyle} /> */}
                // </TouchableOpacity>
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
                        onPress={() => removeFavItem(item.product_ID)}
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
      </ScrollView>
      <Modal
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
              onPress={() => createGroup()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 70,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
  qtyDivideStyle: {
    width: 25,
    borderWidth: 1,
    borderRadius: 25 / 2,
    marginLeft: 10,
    marginRight: 5,
    borderColor: 'black',
    height: 25
  },
  qtyDivide: {
    width: 22,
    borderWidth: 1,
    borderRadius: 22 / 2,
    marginLeft: 10,
    marginTop: 28,
    borderColor: 'grey',
    height: 22
  },
  qtyIconStyle: {
    height: 16,
    width: 20,
    marginTop: 4,
    tintColor: 'gray',
    alignSelf: 'center'
  },
  qtyIcon: {
    height: 14,
    width: 18,
    marginTop: 4,
    tintColor: 'grey',
    alignSelf: 'center'
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