//import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//import * as NavigationBar from 'expo-navigation-bar';
import Homescreen from '../screens/Homescreen'

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="" barStyle="dark-content" />
      <Stack.Navigator initialRouteName='Homescreen'>
        <Stack.Screen name="Homescreen" component={Homescreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator