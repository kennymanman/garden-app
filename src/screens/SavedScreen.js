import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Title, Left } from "native-base";
import data from "./data";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AddSavedContext } from "./CartContext";
import { AddCartContext } from "./CartContext";
import { getsSavedItems, removeSavedItems } from "../../API/firebaseMethods";
import { useFocusEffect } from "@react-navigation/core";

export default function SavedScreen({ navigation }) {
  const { updateSaved } = useContext(AddSavedContext);
  // const { saved } = useContext(AddSavedContext);
  const [saved, setSaved] = useState([]);

  const { updateCart } = useContext(AddCartContext);
  const { cart } = useContext(AddCartContext);

  const { removeFromSaved } = useContext(AddSavedContext);

  const Handlepress = () => Alert.alert("Added to Cart");

  // useFocusEffect(() => {
  //   fetchBasket();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchBasket();
    }, [navigation])
  );

  const fetchBasket = async () => {
    try {
      const response = await getsSavedItems();
      if (response && response.length) {
        setSaved([...response]);
      } else {
        setSaved([]);
      }
      console.log("Response----", response);
    } catch (error) {
      console.log("Error---", error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Title
          style={{
            fontSize: 35,
            color: "black",
            paddingLeft: 15,
            textAlign: "left",
          }}
        >
          Saved Items
        </Title>
        <Title
          style={{
            textAlign: "left",
            paddingLeft: 15,
            color: "black",
            fontSize: 16,
            fontFamily: "recoleta-black",
          }}
        >
          Keep track of groceries you love.{" "}
        </Title>

        <ScrollView showsVerticalScrollIndicator={false}>
          {saved.map(
            ({ name, image, price, description, vendor, images, id, size }) => (
              <TouchableOpacity
                key={name}
                onPress={() =>
                  navigation.navigate("ProductPage", {
                    name: name,
                    price: price,
                    images: images,
                    description: description,
                    vendor: vendor,
                    size: size
                  })
                }
              >
                <ImageBackground
                  source={image ? image : require("../img/sig.png")}
                  imageStyle={{ borderRadius: 12 }}
                  key={name}
                  style={{
                    height: 187,
                    width: 186,
                    position: "relative", // because it's parent
                    marginBottom: 8,
                    marginTop: 19,
                    marginRight: 7,
                    marginLeft: 4,
                    top: 2,
                    left: 12,
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
                    ${price}
                  </Text>

                  {/*} <Text style={{bottom:0, left:0,position: "absolute", marginLeft:10, color:"white", fontSize:12, marginBottom:5}}>
  
  {description}  </Text> */}

                  <Button
                    type="clear"
                    style={{ top: 0, paddingLeft: 152, right: 0, marginTop: 2 }}
                    icon={<FontAwesome name="remove" size={17} color="white" />}
                    onPress={async () => {
                      try {
                        await removeSavedItems(id);
                        alert("Item removed");
                        fetchBasket();
                      } catch (error) {}
                    }}
                    // onPress={() => removeFromSaved({ name, price, image })}
                  />

                  <Button
                    type="clear"
                    style={{ top: 0, paddingLeft: 150, right: 0, marginTop: 5 }}
                    icon={
                      <Feather name="shopping-bag" size={17} color="white" />
                    }
                    onPress={() => {
                      updateCart({ name, price, image, size });
                      Handlepress();
                    }}
                  />
                </ImageBackground>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    marginTop: 70,
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
});
