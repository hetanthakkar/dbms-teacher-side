import { useState } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView,TextInput,TouchableOpacity, ScrollView } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// or any files within the Snack

export default function App({navigation}) {
    const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

  return (
     <ScrollView
     style={{backgroundColor:'white'}}
            contentContainerStyle={{
                marginTop:'5%',
                flex: 1,
                backgroundColor: 'white',
                alignItems: 'center'
            }}>
            <KeyboardAvoidingView>
                <View style={{
                    
                    justifyContent: 'center',
                    alignItems: "center"
                }}>
                    <Text style={{
                        color: '#4A55A2',
                        fontSize: 27,
                        fontWeight: '600'
                    }}>Login</Text>
                    <Text style={{
                        color: 'black',
                        marginTop: 10,
                        fontWeight: '600'
                    }}>Welcome Back</Text>
                </View>
           
                <View style={{
                    marginTop: 25
                }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'gray'
                        }}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholderTextColor={'black'}
                        placeholder='Enter your email here'
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            width: 300,
                            paddingVertical: 10
                        }} />
                </View>
                <View style={{
                    marginTop: 25
                }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'gray'
                        }}>Password</Text>
                    <TextInput
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholderTextColor={'black'}
                        placeholder='Enter your Password here'
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            width: 300,
                            paddingVertical: 10
                        }} />
                </View>
         
                <TouchableOpacity
  onPress={async() => {
    // Call the signup API here
    let res = await fetch('http://127.0.0.1:5000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email,
        role: 0,
      }),
    });
    
    let da=await res.text()
    da=JSON.parse(da)
    console.log(da)
    if (da.message=='Login successful') {
    //   const data = await res.text();
      
      await AsyncStorage.setItem('user', JSON.stringify(da.user));

      navigation.navigate("CourseList")
    }
  }}
  style={{
    width: 200,
    backgroundColor: '#4A55A2',
    marginTop: 50,
    padding: 10,
    alignSelf: 'center',
    borderRadius: 6
  }}>
  <Text style={{
    alignSelf: 'center',
    color: 'white',
    fontWeight: '600'
  }}>Sign Up</Text>
</TouchableOpacity>
                <TouchableOpacity
                onPress={()=>navigation.navigate('CourseList')}
                >
                    <Text style={{
                        color: 'gray',
                        marginTop: 20,
                        alignSelf: 'center'
                    }}>Already have an account? Sign in</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
