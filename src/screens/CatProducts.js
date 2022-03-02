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
import fire, { firestore } from "../config/firebase";
import * as firebase from "firebase";
import { AddCartContext, AddSavedContext } from "../screens/CartContext";
import { Header, Left, Right, Title, Body } from "native-base"
import { AuthenticatedUserContext } from "../Providers/AuthenticatedUserProvider";


export default function CatProducts({ navigation, ...props }) {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [proList, setProList] = useState([]);
    const { updateCart } = useContext(AddCartContext);
    const { updateSaved } = useContext(AddSavedContext);
    const [loader, setLoader] = useState("false");

    const useCart = updateCart;
    const useSaved = updateSaved;

    const Handlepress = () => Alert.alert("Added to Cart");

    useEffect(() => {
        var arrayList = [];
        setLoader(true);
        firestore
            .collection("Category")
            .doc("kLfqtXJx6xPcjAEwrU4B")
            .collection(props.route.params.catName)
            .get()
            .then(subCategory => {
                console.log('Total Product in sub category: ', subCategory.size);
                subCategory.docChanges().forEach(function (anotherSnapshot) {
                    //console.log('databas1122', anotherSnapshot.doc.id)
                    arrayList.push(anotherSnapshot.doc.data());
                    setLoader(false);
                    setProList(arrayList);
                })
            })

    }, [])


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
                productQty: 1,
                currentUserID: currentUser
            });
            setLoader(false);
            alert('Item added to cart');
            return;
        }
        else {
            // allCartRes.forEach(doc => {
            //     console.log(doc.id, '=>', doc.data().productQty);
            //     const qty = doc.data().productQty
            //     db.collection("cartItems")
            //         .doc(doc.id)
            //         .update({ productQty: qty + 1 });
            setLoader(false);
            alert('Item already added in cart');
            // })
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

        // allItemRes.forEach(doc => {
        //     console.log(doc.id, '=>', doc.data());
        // });
        //return true;
    }

    //Structure of the product list.
    const Form = ({ productId, name, description, price, image, images, size }) => (

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
                            addToCartItem(productId, name, price, image, size, description)
                        }
                    }}
                />
            </View>
        </ImageBackground>
        /* <View style={styles.sizeTextView}>
            <Text style={{
                fontSize: 12,
                margin: 8,
                textAlign: 'center',
                color: "black"
            }}>{size}</Text>
        </View> */
    );


    //Render Items.
    const renderItem = ({ item, id, useCart, useSaved, navigation }) => (

        //had to remove navigation here so i could also render navigation.
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("ProductPage", {
                    id: item.productId,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    description: item.description,
                    size: item.size,
                })
            }>
            <Form
                productId={item.productId}
                name={item.name}
                description={item.description}
                image={item.image}
                price={item.price}
                images={item.images}
                size={item.size}

            />
        </TouchableOpacity>

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
                        style={{ color: 'black', left: '25%', fontWeight: 'bold', width: 300 }}>{props.route.params.catName}</Title>
                </Body>
                <Right>

                </Right>

            </Header>

            <View>
                <FlatList
                    numColumns={2}
                    data={proList}
                    renderItem={({ item }) =>
                        renderItem({ navigation, item, useCart, useSaved })
                    }
                />
            </View>
            {loader ?
                <View style={{ marginTop: 150 }}>
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
    }
})