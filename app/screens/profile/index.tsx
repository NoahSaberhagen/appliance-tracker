import React from 'react';
import { View, Text } from 'react-native';
import { loginStyle } from '@/app/styles/login-style';

export default function ProfileScreen() {
  return (
    <View style={loginStyle.main}>
      <Text style={loginStyle.title}>This is the user profile</Text>
    </View>
  )
}
