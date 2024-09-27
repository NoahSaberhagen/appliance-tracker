import React from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import { View, Text } from 'react-native';
import { navigation } from '@react-navigation/native';
import { loginStyle } from '@/app/styles/login-style';

export default function LoginScreen() {
  const handleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential) {
        throw new Error('sign in failed')
      }

      const { email, fullName } = credential

      // placeholder
      if (!email || !fullName?.familyName || !fullName.givenName) {
        throw new Error('missing credentials')
      }

      const username = fullName?.givenName + ' ' + fullName?.familyName;
      const body = JSON.stringify({ email, username })

      console.log(body);

      const res = await fetch(`http://localhost:5001/user/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })

      if (res.status === 200) {
        navigation.navigate('/home')
      } else {
        throw new Error(JSON.stringify({
          status: res.status,
          message: res.body
        }))
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <View style={loginStyle.main}>
      <Text style={loginStyle.title}>Welcome to Appliance Tracker!</Text>
      <Text style={loginStyle.description}>Login or sign up below.</Text>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={10}
        style={loginStyle.appleButton}
        onPress={handleLogin}
      />
    </View>
  )
}