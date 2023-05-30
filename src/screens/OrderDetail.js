import React, { useContext, useState } from "react";
import { View, Text, ScrollView, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { Button } from "react-native-elements"
import { Header, Left, Right, Title, Body } from "native-base"
import { Feather } from '@expo/vector-icons';
import firebase from "firebase/compat/app"
// import * as firebase from "firebase";
import { useFocusEffect } from '@react-navigation/native';
import { AuthenticatedUserContext } from "../Providers/AuthenticatedUserProvider";


export default function OrderDetail({ route, navigation }) {

    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [loader, setLoader] = useState("false");

    const [detailList, setDetailList] = useState([]);


    useFocusEffect(
        React.useCallback(() => {
            fetchOrderDetail();
        }, [])
    );


    const fetchOrderDetail = async () => {
        setLoader(true)
        const order_id = route.params.orderId;

        const db = firebase.firestore();

        const itemList = db.collection("orderItems")
        const allRes = await itemList.where('order_id', '==', order_id).get();

        if (!allRes.empty) {
            var arr = []
            allRes.forEach(doc => {
                console.log('get orders', doc.data())
                arr.push(doc.data())
                setDetailList(arr)
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
                            onPress={() => navigation.goBack()} />

                    </Left>
                    <Body>
                        <Title style={{ textAlign: "center" }}>Order Details</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <View>
                    <FlatList
                        data={detailList}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.orderStyle}>
                                    <View style={{ margin: 10, flexDirection: 'row' }}>
                                        <Image
                                            source={{ uri: item.image }}
                                            style={{
                                                height: 100,
                                                width: 110,
                                                borderRadius: 12,
                                                margin: 5
                                            }}
                                        />
                                        <View style={{ marginLeft: 5, marginTop: 2 }}>
                                            <Text
                                                style={{
                                                    fontWeight: '700',
                                                    fontSize: 16,
                                                }}
                                            >
                                                {item.name}
                                            </Text>
                                            <Text
                                                numberOfLines={2}
                                                style={{
                                                    fontSize: 12,
                                                    marginTop: 2,
                                                    color: 'grey',
                                                    width: 170
                                                }}
                                            >
                                                {item.description}
                                            </Text>

                                            <View style={{ flexDirection: 'row', marginTop: 3 }}>
                                                <Text
                                                    style={{
                                                        fontSize: 13,
                                                        color: 'grey'
                                                    }}
                                                >
                                                    qty:
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 15,
                                                        marginLeft: 4
                                                    }}
                                                >
                                                    {item.qty}
                                                </Text>
                                            </View>
                                            <Text
                                                style={{
                                                    marginTop: 1,
                                                    fontSize: 15,
                                                }}
                                            >
                                                ₦ {item.price}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                            )
                        }
                        }
                    />
                </View>
                {loader ?
                    <View style={{ marginTop: 200 }}>
                        <ActivityIndicator size="large" color="#4267B2" />
                    </View> : null}
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