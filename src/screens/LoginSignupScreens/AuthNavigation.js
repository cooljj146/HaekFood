import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './WelcomeScreen';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen'
import HomeScreen from '../HomeScreen';


const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
      <Stack.Navigator initialRouteName='welcomepage'>
          <Stack.Screen name = "Welcomepages" component={WelcomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name = "signup" component={SignUpScreen} 
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="login" component={LoginScreen} /> 

          <Stack.Screen name="home" component={HomeScreen}
              options = {{
                headerShown: false
              }}
          />
              

      </Stack.Navigator>
  )
}

export default AuthNavigation