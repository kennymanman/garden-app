import React from 'react'
import { View, Text, ScrollView, ImageBackground } from 'react-native'
import { Title } from "native-base"
import { Button } from "react-native-elements"
//import Icon from "react-native-vector-icons/FontAwesome5"
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Content, Card, CardItem, Body, Textarea, Form, Item, Input, Icon } from "native-base";







export default function DeliveryScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>

      <ScrollView >




        <Button type="clear" style={{ marginLeft: 15, alignSelf: "flex-start", paddingTop: 40 }}
          icon={<Ionicons name="ios-arrow-round-back"
            size={30}
            color="black" />}
          onPress={() => navigation.navigate("CartScreen")} />


        <Title style={{ textAlign: "left", top: 90, fontSize: 25, paddingLeft: 15, paddingBottom: 19, position: "absolute" }}>Delivery info.</Title>



        <Form style={{ marginTop: 150 }}>
          <Card transparent >
            <CardItem  >
              <Body>
                <Title style={{ fontSize: 15 }}>
                  First Name
                </Title>

                <Item success>
                  <Input placeholder='' />
                  <Icon name='information-circle' />
                </Item>

              </Body>
            </CardItem>
          </Card>





          <Card transparent>
            <CardItem>
              <Body>
                <Title style={{ fontSize: 15 }}>
                  Last Name
                </Title>

                <Item >
                  <Input placeholder='' />
                  <Icon name='information-circle' />
                </Item>

              </Body>
            </CardItem>
          </Card>



          <Card transparent>
            <CardItem>
              <Body>
                <Title style={{ fontSize: 15 }}>
                  Phone No.
                </Title>

                <Item success>
                  <Input placeholder='' />
                  <Icon name='information-circle' />
                </Item>

              </Body>
            </CardItem>
          </Card>


          <Card transparent>
            <CardItem>
              <Body>
                <Title style={{ fontSize: 15 }}>
                  Address
                </Title>

                <Item success>
                  <Input placeholder='' />
                  <Icon name='information-circle' />
                </Item>

              </Body>
            </CardItem>
          </Card>


          <ImageBackground

            source={require("../rmg/tyr.jpg")}
            style={{
              height: 150,
              width: 390,
              position: 'relative', // because it's parent

              top: 0,

            }}

          />


          <Text style={{ position: "absolute", top: 420, padding: 20, fontSize: 12 }}>READ ME: The information provided above will be used to deliver your orders. Kindly ensure that all details are correct before submitting to aid with timely delivery of orders.</Text>







          <Button                                          //Submit Button
            title="Submit"
            style={{
              marginBottom: 20,
              width: 300,
              marginTop: 40,
              alignSelf: "center",
              paddingRight: 20,
              height: 100, position: "relative", paddingLeft: 13
            }}
          />


        </Form>
      </ScrollView>


    </View>
  )
}
