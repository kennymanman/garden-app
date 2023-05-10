import React, { useState, useEffect, useRef } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigation from './src/Navigation/AppNavigator';
import { CartProvider } from "./src/screens/CartContext"
import { MenuProvider } from 'react-native-popup-menu'
import { AuthenticatedUserProvider } from "./src/Providers/AuthenticatedUserProvider";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Alert, Text } from 'react-native';

import { setConfiguration } from './src/Components/configuration';
import * as font from 'expo-font';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});


export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  global.cartCount = 0

  useEffect(() => {
    font.loadAsync({
      'recoleta-bold': require('./assets/fonts/Recoleta-Bold.ttf'),
      'recoleta-black': require('./assets/fonts/Recoleta-Black.ttf'),
    })
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token)).
      catch(err => console.log(err))
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [])

  const registerForPushNotificationsAsync = async () => {
    try {
      if (!Constants.isDevice) {
        alert('Must use physical device for Push Notifications');
        return null
      }
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Failed to get push token for push notification!');
        return null
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          showBadge: true,
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FE9018',
        });
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('deivece token', token)
      setConfiguration('fcmToken', token);
      return token;
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthenticatedUserProvider>
      <MenuProvider>
        <CartProvider>
          <PaperProvider>
            <NavigationContainer>

              <MainTabNavigation />

            </NavigationContainer>
          </PaperProvider>
        </CartProvider>
      </MenuProvider>
    </AuthenticatedUserProvider>

  );
}