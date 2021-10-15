import React, { useContext, useState, useEffect} from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticatedUserContext } from '../Providers/AuthenticatedUserProvider';
import SavedScreen from '../screens/SavedScreen';
import Firebase from '../config/firebase';
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator } from 'react-native';
import AuthStack from "../Navigation/AuthStack"






const auth = Firebase.auth();


export default function SavedStack() {


    const { user, setUser } = useContext(AuthenticatedUserContext); 


    const [isLoading, setIsLoading] = useState(true);
  

    useEffect(() => {
      // onAuthStateChanged returns an unsubscriber
      const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
        try {
          await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      });
  



      
      // unsubscribe auth listener on unmount
      return unsubscribeAuth;
    }, []);
  
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      );
    }   
  





  





  const SavedStack = createStackNavigator();

  function SavedStackScreen () {
return (
  <SavedStack.Navigator headerMode="none"  >
    
<SavedStack.Screen name="SavedScreen" component={SavedScreen} />

     
</SavedStack.Navigator> 
)

}





return (

  <NavigationContainer independent={true}>
  {user ? <SavedStackScreen /> : <AuthStack />}
  </NavigationContainer>
)

  

} 












