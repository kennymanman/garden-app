import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Activity = () => (
  <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <ActivityIndicator size="large" color={'black'} />
  </View>
);

export default Activity;
