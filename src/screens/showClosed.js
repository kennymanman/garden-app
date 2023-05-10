import React, { useContext, useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    Alert
}
    from "react-native"
import { Feather } from '@expo/vector-icons';

export default function showClosed({ navigation, ...props }) {


    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <ImageBackground
                style={{ height: 50, width: 50 }}
                source={require('../img/close.png')}
            />
        </View>

    )
}