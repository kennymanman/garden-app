import React, { useContext } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Button } from "react-native-elements";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { Title, Subtitle,  Icon } from "native-base";
import { AddCartContext, AddSavedContext, AddListedContext } from "../screens/CartContext";

import RNPickerSelect from 'react-native-picker-select';





export default function ProductPage({ route, navigation }) {


  const { updateCart } = useContext(AddCartContext);
  const { updateSaved } = useContext(AddSavedContext);
  const { updateListed } = useContext(AddListedContext);

  const useCart = updateCart;
  const useSaved = updateSaved;
  const useListed = updateListed;




  const placeholder = {
    label: 'Select Quantity',
    textAlign:"flex-end",
    color: 'grey',
    marginLeft:50,
    value:1
  };





    const renderContent = () => (
        <View
          style={{
            backgroundColor: 'white',
            padding: 7,
            height: 950,
          }}
        >

<Ionicons style={{alignSelf:"center"}} name="remove-outline" size={35} color="gray" />



<Button
            type="clear"
            style={{
              alignSelf:"flex-end"
            }}
            icon={<Feather name="heart" size={23} color="black" />}
            onPress={() => updateSaved({ name, price, description, image })}
/>



<Title style={{alignSelf:"flex-start", fontSize:26}}>{route.params.name} </Title>

<Title style={{alignSelf:"flex-start", fontSize:20}}> ${route.params.price}</Title>

<Subtitle style={{paddingTop:12}}>Scrolldown to view more info</Subtitle>


<View
  style={{
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop:10
  }}
/>

<Button  //Add to cart button

buttonStyle={{
  backgroundColor: "black"
}}

title="Add to Cart"
style={{
width:300,
marginTop:24,
alignSelf: "center",
height:100}}
/>  


<Title style={{alignSelf:"flex-start", marginLeft:2}}>Product description</Title>
<Text number={7} style={{alignSelf:"flex-start", marginTop:15, padding:11, fontSize:14}}>{route.params.description}</Text>

<View
  style={{
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop:19
  }}
/>

<Title style={{alignSelf:"flex-start", marginTop:30, marginLeft:2}}>Quantity</Title>



<View style={{marginLeft:200}}>
<RNPickerSelect
placeholder={placeholder}
            onValueChange={(value) => console.log(value)}
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
        />
</View>


<Title style={{alignSelf:"flex-start", marginTop:75, marginLeft:2}}>Size & Measurement</Title>

<Text style={{alignSelf:"flex-start", marginTop:20, padding:5, fontSize:14, fontWeight:"500"}}>{route.params.size}</Text>



<View
  style={{
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop:30
  }}
/>


<Button  //Add to Grocery List

buttonStyle={{
  backgroundColor: "#058e3f"
 
}}

title="Add to Grocery List"
style={{
width:300,
marginTop:60,
alignSelf: "center",
height:100}}
/> 


<Subtitle>Add this product to your personal grocery list.</Subtitle>

</View>
        
      );
     



const sheetRef = React.useRef(null);
    


return (

<View>

  {/*
<Button  type="clear" style={{paddingLeft:19, paddingTop:30, alignSelf:"flex-start"}}
icon={<Feather name="arrow-left" size={22} color="black" />}
            
  onPress={() => navigation.goBack()} /> */}
  

    <SwiperFlatList autoplay autoplayDelay={2} autoplayLoop index={2} showPagination >
      <View style={[styles.child, { backgroundColor: 'tomato'}]}>
        <Text style={styles.text}>1</Text>
      </View>
      <View style={[styles.child, { backgroundColor: 'thistle' }]}>
        <Text style={styles.text}>2</Text>
      </View>
      <View style={[styles.child, { backgroundColor: 'skyblue' }]}>
        <Text style={styles.text}>3</Text>
      </View>
      <View style={[styles.child, { backgroundColor: 'teal' }]}>
        <Text style={styles.text}>4</Text>
      </View>
    </SwiperFlatList>




 <BottomSheet
        ref={sheetRef}
        snapPoints={[8, 6, 720]}
        borderRadius={15}
       renderContent={renderContent}
        enabledInnerScrolling={false}
 />

 

</View>
    )
}

const { width } = Dimensions.get('window');


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    child: { width, justifyContent: 'center', height:380 },
    text: { fontSize: width * 0.5, textAlign: 'center' },
  });