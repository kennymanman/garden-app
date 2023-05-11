import React, { useState, useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, ImageBackground, Text } from "react-native"
import { Button } from 'react-native-elements';
import { Title, Subtitle } from "native-base"
import { Feather } from "@expo/vector-icons";
import InputField from "../Components/InputField";
import CatListData from './CatListData';
import * as firebase from "firebase";
import { AuthenticatedUserContext } from "../Providers/AuthenticatedUserProvider";
import Modal from "react-native-modal";


export default function SearchScreen({ navigation }) {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [productList, setProuctList] = useState([]);
    const [proList, setProList] = useState([]);
    const [loader, setLoader] = useState("false");
    const [search, setSearch] = useState('');
    const [rightIcon, setRightIcon] = useState("close");
    const [radioClick, setRadioClick] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    useFocusEffect(
        React.useCallback(() => {
            getProducts()
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
                        //console.log('databas1122', anotherSnapshot.doc.data())
                        arrayList.push({ ...anotherSnapshot.doc.data(), 'productID': anotherSnapshot.doc.id });
                        setProuctList(arrayList);
                        setLoader(false);
                    })
                })
        })
    }


    const searchClear = async () => {
        setSearch(''),
            () =>
                getProducts()
        setProList([])
    };

    const onChangeSearch = async (value) => {
        setSearch(value)
        var filteredProductData = []
        if (value.length > 2) {
            setLoader(true);
            for (var i = 0; i < productList.length; i++) {
                if (productList[i].name.toLowerCase().includes(value.toLowerCase())) {
                    console.log('get search data', productList[i])
                    filteredProductData.push(productList[i]);
                }
            }
        }
        else {
            filteredProductData = productList
        }
        setProList(filteredProductData)
        setLoader(false);
    }


    const setFilter = (item) => {
        console.log('get filter', item)
        if (item == 1) {
            const data = productList.sort((a, b) => a.price - b.price);
            setProList([...data]);
        }
        else {
            const data = productList.sort((a, b) => b.price - a.price);
            setProList([...data]);
        }
    }

    // const filterView = () => {
    //     return (
    //         <Modal
    //             isVisible={isModalVisible}
    //             backdropOpacity={0.1}
    //             onBackButtonPress={toggleModal}
    //             onBackdropPress={toggleModal}
    //             style={{ justifyContent: 'flex-start', marginTop: 115 }}>
    //             <View style={styles.modalStyle}>
    //                 <TouchableOpacity
    //                     onPress={() => setFilter(1)}
    //                     style={styles.radioStyle}>
    //                     {radioClick == 1 ? (
    //                         <Image
    //                             resizeMode="cover"
    //                             source={require('../img/radioSelected.png')}
    //                             style={{ height: 15, width: 15, marginRight: 10 }}
    //                         />
    //                     ) : (
    //                         <Image
    //                             resizeMode="cover"
    //                             source={require('../img/radioUnselect.png')}
    //                             style={{ height: 15, width: 15, marginRight: 10 }}
    //                         />
    //                     )}
    //                     <Text>Lowest to Highest</Text>
    //                 </TouchableOpacity>

    //                 <TouchableOpacity
    //                     onPress={() => setFilter(2)}
    //                     style={styles.radioStyle}>
    //                     {radioClick == 2 ? (
    //                         <Image
    //                             resizeMode="cover"
    //                             source={require('../img/radioSelected.png')}
    //                             style={{ height: 15, width: 15, marginRight: 10 }}
    //                         />
    //                     ) : (
    //                         <Image
    //                             resizeMode="cover"
    //                             source={require('../img/radioUnselect.png')}
    //                             style={{ height: 15, width: 15, marginRight: 10 }}
    //                         />
    //                     )}
    //                     <Text>Hightest to Lowest</Text>
    //                 </TouchableOpacity>
    //             </View>

    //         </Modal>
    //     )
    // }

    const addToCartItem = async (productID, productId, name, price, image, size, description, totalStock) => {
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
                totalStock: totalStock
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


    return (
        <View style={{ flex: 1 }} >
            <Title style={styles.catTitleStyle}>Categories</Title>

            <ScrollView>
                <View style={{ marginTop: 15 }}>
                    <InputField
                        placeholder="Search Groceries"
                        leftIcon="magnify"
                        containerStyle={{ backgroundColor: "#ced4da", width: 335, borderBottomRightRadius: 17, borderTopRightRadius: 17, height: 45, borderTopLeftRadius: 17, borderBottomLeftRadius: 17, marginLeft: 10, marginRight: 10 }}
                        style={{ marginTop: 20, margin: 15, height: 10 }}
                        onChangeText={(value) => onChangeSearch(value)}
                        value={search}
                        rightIcon={rightIcon}
                        handlePasswordVisibility={() => searchClear()}
                    >
                    </InputField>
                    {search != '' ? <View style={{ flexDirection: 'row', justifyContent: 'flex-end', margin: 10 }}>
                        <Button
                            buttonStyle={styles.filterButtonStyle}
                            type="clear"
                            onPress={() => setFilter(1)}
                            title='Lowest to Highest'
                            titleStyle={styles.filterTextStyle}
                        />
                        <Button
                            buttonStyle={styles.filterButtonStyle}
                            type="clear"
                            onPress={() => setFilter(2)}
                            title='Highest to Lowest'
                            titleStyle={styles.filterTextStyle}
                        />
                    </View> : null}
                </View>

                <View style={{ height: 2, borderBottomWidth: 1, borderBottomColor: '#CED0CE', marginTop: 5 }} />

                {search == '' ? <View style={{ marginTop: 40 }}>

                    <FlatList
                        data={CatListData}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ paddingRight: 10, paddingLeft: 15, paddingTop: 10 }}>
                                    <Title style={{ color: "black", textAlign: 'center' }}>{item.name}</Title>
                                    <View>
                                        <TouchableOpacity onPress={() => navigation.navigate("CatProducts", { catName: item.name })}>

                                            <Image style={{ width: 220, height: 250, alignItems: "center", borderRadius: 12, marginTop: 10, marginBottom: 100 }} source={item.image} />

                                        </TouchableOpacity>

                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>
                    :
                    <FlatList
                        numColumns={2}
                        data={proList}
                        renderItem={({ item }) => {
                            return (
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
                                    }>
                                    <ImageBackground
                                        source={{ uri: item.image }} //Background Image
                                        imageStyle={{ borderRadius: 12 }}
                                        style={{
                                            height: 200,
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
                                            {item.name}
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
                                        }}>₦ {item.price}</Text>

                                        <View style={{ flexDirection: "row", marginLeft: 5, justifyContent: 'space-between', marginRight: 5 }}>
                                            <Button
                                                type="clear"
                                                style={{
                                                    marginTop: 3
                                                }}
                                                onPress={() => savedProducts(item.productId)}
                                                icon={<Feather name="heart" size={20} color="white" />}
                                            />

                                            <Button
                                                type="clear"
                                                style={{ right: 0, top: 0, marginTop: 3, paddingLeft: 102 }}
                                                onPress={() =>
                                                    addToCartItem(item.productID, item.productId, item.name, item.price, item.image, item.size, item.description, item.totalStock)
                                                }
                                                icon={<Feather name="shopping-bag" size={18} color="white" />}
                                            />
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            );
                        }}
                    />
                }
                <View style={{ marginTop: 15, justifyContent: 'flex-end' }}>
                    <Subtitle style={styles.titleStyle}>Recommend grocery items you would love to see?</Subtitle>
                    <Subtitle style={styles.titleStyle}>Email Us</Subtitle>

                    <Button
                        buttonStyle={{
                            backgroundColor: "black",
                            margin: 15
                        }}
                        title="Recommend"
                        style={{
                            alignSelf: "center",
                            height: 100
                        }}
                        onPress={() => navigation.navigate("HelpScreen")}
                    />
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    titleStyle: {
        color: 'grey',
        marginLeft: 15,
        marginRight: 15
    },
    catTitleStyle: {
        textAlign: "left",
        fontSize: 35,
        marginTop: 40,
        marginLeft: 15,
        color: "black"
    },
    radioStyle: {
        height: 10,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalStyle: {
        height: 90,
        width: 170,
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        borderRadius: 2,
        justifyContent: 'center'
    },
    filterButtonStyle: {
        backgroundColor: '#ced4da',
        height: 22,
        width: 110,
        borderRadius: 10,
        right: 5
    },
    filterTextStyle: {
        fontSize: 10,
        textAlign: 'center',
        color: 'black',
        bottom: 2
    }
})
