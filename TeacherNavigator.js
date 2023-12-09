// TeacherNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LandingPage from './LandingPage';
import AuthScreen from './AuthScreen';
import CourseListScreen from './CourseListScreen';
import AddCourseScreen from './AddModal';
import Chats from './Chats'
import Chatscreen from './Chatscreen'
import LoginScreen from './LoginScreen'
const Stack = createStackNavigator();
const ChatStack = createNativeStackNavigator();
const TeacherNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingPage} options={{ title: 'Teacher App' }} />
        <Stack.Screen name="Auth" component={AuthScreen} options={{ title: 'Login/Signup' }} />
        <Stack.Screen name="CourseList" component={CourseListScreen} options={{ title: 'Your Courses' }} />
        <Stack.Screen name="AddCourse" component={AddCourseScreen} options={{ title: 'Add Course' }} />
        <Stack.Screen name="ChatNavigator" component={ChatNavigator} options={{ title: 'Add Course' }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Add Course' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const ChatNavigator = () => {
  return (
      <ChatStack.Navigator>
        <ChatStack.Screen
          name="Chats"
          component={Chats} />
        <ChatStack.Screen
          name="ChatScreen"
          component={Chatscreen} />   
      </ChatStack.Navigator>
  )
}
export default TeacherNavigator;
