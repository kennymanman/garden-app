import React, { useEffect, useState, useContext } from "react"
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Alert,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    ImageBackground
}
    from "react-native"
import { Button } from "react-native-elements";
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as firebase from "firebase";
import { Header, Left, Right, Title, Body } from "native-base"

export default function Offers({ navigation, ...props }) {
    const [loader, setLoader] = useState("false");
    const [offerList, setOfferList] = useState([]);


    useFocusEffect(
        React.useCallback(() => {
            fetchOffers()
        }, [])
    );


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


    const Form = ({ name, code, amount, promoId }) => (
        <View
            style={{ height: 40, margin: 10, elevation: 3, backgroundColor: 'white', borderRadius: 6, flexDirection: 'row', justifyContent: 'space-between' }}
        >
            <Text
                style={{
                    fontSize: 13,
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 10
                }}
            >
                Get {name} use promo code '{code}'
            </Text>
            {/* <Text
                onPress={() => navigation.navigate('CartScreen', { code, amount })}
                style={styles.promoCodeStyle}>apply</Text> */}
        </View >
    );


    //Render Items.
    const renderItem = ({ item }) => (
        //had to remove navigation here so i could also render navigation.
        <Form
            name={item.name}
            code={item.code}
            amount={item.amount}
            promoId={item.promoId}

        />
    )

    return (

        <View style={{ flex: 1 }}>

            <Header style={{ backgroundColor: 'white' }}>
                <Left>
                    <Button type="clear" style={{ paddingLeft: 9 }}
                        icon={<Feather name="arrow-left" size={25} color="black" />}

                        onPress={() => navigation.goBack()} />
                </Left>
                <Body>
                    <Title
                        style={{ color: 'black', left: '25%', fontWeight: 'bold', width: 300 }}>Offers</Title>
                </Body>
                <Right>

                </Right>

            </Header>

            <View>
                <FlatList
                    data={offerList}
                    renderItem={({ item }) =>
                        renderItem({ navigation, item })
                    }
                />
            </View>
            {loader ?
                <View style={{ marginTop: 250 }}>
                    <ActivityIndicator size="large" color="#4267B2" />
                </View>
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    sizeTextView: {
        backgroundColor: 'white',
        elevation: 4,
        width: 170,
        marginLeft: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    backImageStyle: {
        height: 160,
        width: 170,
        position: "relative", // because it's parent
        marginRight: 5,
        marginLeft: 5,
    },
    promoCodeStyle: {
        fontSize: 13,
        justifyContent: 'flex-end',
        margin: 10,
        color: '#e47644'
    }
})