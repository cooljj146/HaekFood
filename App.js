import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './src/screens/LoginSignupScreens/WelcomeScreen';
import LoginScreen from './src/screens/LoginSignupScreens/LoginScreen';
import SignUpScreen from './src/screens/LoginSignupScreens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfile from './src/screens/UserProfile';
import ProductPage from './src/screens/ProductPage';
import UserCart from './src/screens/UserCart';
import PlaceOrder from './src/screens/PlaceOrder';
import TrackOrder from './src/screens/TrackOrder';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
  //   <RootNavigation/>
  //  // <HomeScreen />
  <NavigationContainer>
        <Stack.Navigator initialRouteName='welcomepage'>
          <Stack.Screen name = "welcomepage" component={WelcomeScreen}
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

          <Stack.Screen name="userprofile" component={UserProfile}
              options = {{
                headerShown: false
              }}
          />

          <Stack.Screen name='productpage' component={ProductPage}
              options = {{
                headerShown: false
              }}
          />

          <Stack.Screen name='cart' component={UserCart}
              options = {{
                headerShown: false
              }}
          />

          <Stack.Screen name='placeorder' component={PlaceOrder}
              options = {{
                headerShown: false
              }}
          />
          <Stack.Screen name='trackorders' component={TrackOrder}
              options = {{
                headerShown: false
              }}
          />
              

      </Stack.Navigator>

  </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

