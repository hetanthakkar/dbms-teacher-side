// LandingPage.js
import React from 'react';
import { View, Button } from 'react-native';

const LandingPage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Login/Signup" onPress={() => navigation.navigate('Auth')} />
    </View>
  );
};

export default LandingPage;
