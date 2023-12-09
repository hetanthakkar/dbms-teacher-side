// LandingPage.js
import React from 'react';
import { View, Button } from 'react-native';

const LandingPage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Signup" onPress={() => navigation.navigate('Auth')} />
      <Button title="Login" onPress={() => navigation.navigate('LoginScreen')} />
    </View>
  );
};

export default LandingPage;
