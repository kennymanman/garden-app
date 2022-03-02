import React, { useRef, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { Header, Left, Right, Title, Body } from "native-base";
import { Button } from "react-native-elements"
import { Feather } from "@expo/vector-icons";
import { PayWithFlutterwave } from 'flutterwave-react-native';
import * as firebase from "firebase";
import moment from 'moment';
import { AuthenticatedUserContext } from "../Providers/AuthenticatedUserProvider";
import fire, { firestore } from "../config/firebase";
import Green from "../Svg/Green.svg"
import Flower from "../Svg/Flower.svg"
import Outlinecloud from "../Svg/Outlinecloud.svg"

const date = moment().format('DD-MMM-YYYY, h:mm a');


export default function Checkout({ route, navigation }) {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [userData, setUserData] = useState([]);
    const [amount, setAmount] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [sub, setSub] = useState(0);
    const [cartItem, setCartItem] = useState('');
    const [loader, setLoader] = useState("false");

    useFocusEffect(
        React.useCallback(() => {
            fetchUser();
        }, [])
    );


    const fetchUser = async () => {
        const currentUser = user.uid;
        const db = firebase.firestore();
        db.doc(`users/${currentUser}`)
            .get()
            .then((doc) => {
                console.log('firestore document', doc.data())
                setUserData(doc.data())
                setAmount(route.params.total)
                setShipping(route.params.shipping)
                setCartItem(route.params.cartData)
                setSub(route.params.subtotal)
                console.log('firestore doc', amount, shipping, cartItem)
            })
    }

    let redirectTimeout = useRef();

    async function handleRedirect(data) {
        // clear scheduled action
        clearTimeout(redirectTimeout.current);
        // delay action to prevent from reoccurring
        redirectTimeout.current = setTimeout(() => {
            console.log('handle data', data)
            if (data.status === "successful") {
                placeOrder('online', data.transaction_id);
            }
        }, 100);
    }

    /* An example function to generate a random transaction reference */
    // const generateTransactionRef = (length: number) => {
    //     var result = '';
    //     var characters =
    //         'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     var charactersLength = characters.length;
    //     for (var i = 0; i < length; i++) {
    //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     console.log('transection id', result)
    //     return `flw_tx_ref_${result}`;
    // };


    const placeOrder = async (type, id) => {
        setLoader(true)
        console.log('place order', type, id)
        try {
            const db = firebase.firestore();
            const userID = user.uid;
            const currentUser = userData
            const orderID = moment().millisecond();
            const Date = moment().format('DD-MMM-YYYY, h:mm a');

            const ref = db.collection("orders").doc()

            var orderUniqueId = ref.id

            await ref.set({
                order_id: orderID,
                email: currentUser.email,
                name: `${currentUser.firstName}${currentUser.lastName}`,
                phone: currentUser.phone,
                address: currentUser.address,
                userId: userID,
                date: Date,
                orderType: type,
                total: parseFloat(amount).toFixed(2),
                transaction_id: id,
                deliveryFee: shipping,
                subtotal: sub.toFixed(2)
            })

            await cartItem.forEach(item => {
                db.collection("orderItems").doc().set({
                    productId: item.product_ID,
                    order_id: orderUniqueId,
                    name: item.productName,
                    price: item.productPrice,
                    image: item.productImage,
                    size: item.productSize,
                    description: item.productDescription,
                    qty: item.productQty
                })
            })

            const cartRef = db.collection('cartItems');

            // Create a query against the collection
            const allCartRes = await cartRef.where('currentUserID', '==', userID).get();

            allCartRes.forEach(doc => {
                cartRef.doc(doc.id).delete()
            })
            setLoader(false)
            Alert.alert('success', "Payment successful")
            return navigation.navigate('HomeScreen')

        } catch (err) {
            setLoader(false)
            Alert.alert("There is something wrong!!!!", err.message);
            return false;
        }
    }


    return (
        <View>
            <Header>
                <Left>
                    <Button
                        type="clear"
                        style={{ paddingLeft: 9 }}
                        icon={<Feather name="arrow-left" size={20} color="white" />}
                        onPress={() => navigation.goBack()}
                    />
                </Left>
                <Body>
                    <Title style={{ width: 150, textAlign: "center" }}>Payment Options</Title>
                </Body>
                <Right></Right>
            </Header>

            {/*<Outlinecloud style={{position:"absolute", marginTop:170}} />*/}

            {/*<Flower style={{position:"absolute", marginTop:90, alignSelf:"flex-end"}}/> */}

            <Text
                numberOfLines={2}
                style={{ margin: 15, color: 'grey', fontSize: 12 }}>
                Please ensure actual amount when paying on delivery as our dispatch riders do not carry change.</Text>

            <Button  //Checkout Button
                buttonStyle={{
                    backgroundColor: "black",
                    marginLeft: 15,
                    marginRight: 15
                }}
                onPress={() => placeOrder('cash', '')}
                title="Pay on Delivery"
                style={{
                    alignSelf: "center",
                    height: 100
                }}
            />
            <Title style={{ margin: 30, color: 'grey', alignSelf: 'center' }} >Or</Title>

            <PayWithFlutterwave
                onRedirect={handleRedirect}
                options={{
                    tx_ref: date,
                    authorization: 'FLWPUBK_TEST-359f5269ef4814366f2d99acd9a094fb-X',
                    customer: {
                        email: userData.email
                    },
                    amount: parseFloat(amount),
                    currency: 'NGN',
                    payment_options: 'card'
                }}
                customButton={(props) => (
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'black',
                            height: 43,
                            justifyContent: 'center',
                            borderRadius: 4,
                            marginLeft: 15,
                            marginRight: 15
                        }}
                        isBusy={props.isInitializing}
                        onPress={props.onPress}
                        disabled={props.disabled}
                    >
                        <Text style={{ color: 'white', alignSelf: "center", fontSize: 16, fontWeight: '700' }}>Pay with Card</Text>
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}
