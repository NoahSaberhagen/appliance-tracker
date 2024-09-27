import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { registerRootComponent } from 'expo';
import ProfileScreen from './screens/profile';
import HomeScreen from './screens/home';
import LoginScreen from './screens/login';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarStyle: {
                  display: 'flex',
                  flexDirection: 'row'
                }
              }}
            >
              <Tab.Screen name='Login' component={LoginScreen} />
              <Tab.Screen name='Home' component={HomeScreen} />
              <Tab.Screen name='Profile' component={ProfileScreen} />
            </Tab.Navigator>
          </NavigationContainer>
      </SafeAreaView>
    );
}

registerRootComponent(App);
