import React from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import { View, Text } from 'react-native';
import { styles } from '@/app/styles';

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
        console.error('no credentials')
      }

      const { email, fullName } = credential

      let username: string;

      if (!fullName) {
        username = 'foo'
      } else {
        username = fullName.givenName + ' ' + fullName.familyName
      }

      await fetch(`http://localhost:5001/users/create/${email}/${username}`, {
        method: 'POST'
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={10}
        style={styles.container}
        onPress={handleLogin}
      />
    </View>
  )
}