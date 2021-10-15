import React, { useContext} from 'react'
import { View, Text } from 'react-native'
import Firebase from '../config/firebase';
import  IconButton   from '../Components/IconButton';
import {AuthenticatedUserContext} from '../Providers/AuthenticatedUserProvider';





const auth = Firebase.auth();

export default function ProfileScreen() {

  const { user, setUser } = useContext(AuthenticatedUserContext);




//Copy this to enable signout function..
const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };





    return (
        <View>
            <Text>Welcome {user.email}</Text>



          <IconButton
          name='logout'
          size={24}
          color='black'
          onPress={handleSignOut}
        />


        </View>
    )
}
