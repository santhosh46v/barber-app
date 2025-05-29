import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ServicesScreen from '../screens/ServicesScreen';
import BookingScreen from '../screens/BookingScreen';
import SuccessScreen from '../screens/SuccessScreen';
import { colors } from '../styles/globalStyles';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Barber Shop' }}
      />
      <Stack.Screen 
        name="Services" 
        component={ServicesScreen} 
        options={{ title: 'Services' }}
      />
      <Stack.Screen 
        name="Booking" 
        component={BookingScreen} 
        options={{ title: 'Book Appointment' }}
      />
      <Stack.Screen 
        name="Success" 
        component={SuccessScreen} 
        options={{ 
          title: 'Booking Confirmed',
          headerLeft: null,
          gestureEnabled: false
        }}
      />
    </Stack.Navigator>
  );
}
