import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { Button } from "react-native-elements";
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
import { Avatar } from "react-native-paper";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

export default function HomeScreen({ navigation }) {
  const { updateCart } = useContext(AddCartContext);
  const { updateSaved } = useContext(AddSavedContext);

  const useCart = updateCart;
  const useSaved = updateSaved;

  //Structure of the product list.
  const Form = ({ name, description, price, id, image }) => (
    <ImageBackground
      source={image ? image : require("../img/sig.png")} //Background Image
      imageStyle={{ borderRadius: 12 }}
      style={{
        height: 200,
        width: 200,
        position: "relative", // because it's parent
        marginBottom: 15,
        marginTop: 19,
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
          marginBottom: 55,
          marginLeft: 10,
          fontSize: 20,
        }}
      >
        {name}
      </Text>

      <Text
        style={{
          bottom: 0,
          left: 0,
          position: "absolute",
          fontSize: 15,
          marginBottom: 35,
          marginLeft: 10,
          color: "white",
        }}
      >
        ${price} {""}
      </Text>

      <Text
        style={{
          bottom: 0,
          left: 0,
          position: "absolute",
          marginLeft: 10,
          color: "white",
          fontSize: 12,
          marginBottom: 5,
        }}
      >
        {description}
        {""}{" "}
      </Text>

      <View style={{ flexDirection: "row" }}>
        <Button
          type="clear"
          style={{
            //right:0,
            top: 0,
            marginTop: 3,
            paddingLeft: 8,
          }}
          icon={<Feather name="heart" size={15} color="white" />}
          onPress={() => updateSaved({ name, price, description, image })}
        />

        <Button
          type="clear"
          style={{ right: 0, top: 0, marginTop: 3, paddingLeft: 119 }}
          icon={<Feather name="shopping-bag" size={15} color="white" />}
          onPress={() => updateCart({ name, price, image })}
        />
      </View>
    </ImageBackground>
  );

  //Render Items.
  const renderItem = (
    { item, id, useCart, useSaved, navigation } //had to remove navigation here so i could also render navigation.
  ) => (
    <TouchableOpacity
      onPress={() => {
        // console.log(126, navigation);
        navigation.navigate("ProductPage", {
          name: item.name,
          price: item.price,
          image: item.image,
        });
      }}
    >
      <Form
        id={item.id}
        name={item.name}
        description={item.description}
        image={item.image}
        price={item.price}
      />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {/* <Button
            style={styles.ditch}
            type="clear"
            icon={<Icon name="bars" size={20} color="black" />}
            onPress={() => navigation.openDrawer()}
          /> */}

          <Image
            style={{
              width: 349,
              height: 100,
              alignItems: "center",
              borderRadius: 19,
              marginTop: 18,
            }}
            source={ban}
          />

          <Image
            style={{
              width: 349,
              height: 350,
              alignItems: "center",
              borderRadius: 20,
              marginTop: 15,
            }}
            source={hus}
          />

          <Image
            style={{
              width: 349,
              height: 290,
              alignItems: "center",
              borderRadius: 20,
              marginTop: 15,
            }}
            source={fresh}
          />

          <View style={{ marginTop: 45 }}>
            <Title style={{ textAlign: "left", fontSize: 30, marginLeft: 8 }}>
              Grocery Boxes
            </Title>
            <Text style={{ marginLeft: 12, fontSize: 13, marginTop: 8 }}>
              Enjoy deals, offers and discounts at affordable prices.
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("DealsScreen")}
            >
              <Text
                style={{
                  marginLeft: 12,
                  fontSize: 13,
                  color: "grey",
                  marginTop: 5,
                }}
              >
                See all deals
              </Text>
            </TouchableOpacity>

            <FlatList
              horizontal={true}
              data={Deals}
              // renderItem={renderItem}
              renderItem={({ item }) =>
                renderItem({ navigation, item, useCart, useSaved })
              }
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 30,
    backgroundColor: "#ffffff",
    alignItems: "center",
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
});
