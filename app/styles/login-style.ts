import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const loginStyle = StyleSheet.create({
  main: {
    display: 'flex',
    flex: 1,
    height: '100%',
    backgroundColor: colors.white,
    alignItems: 'center'
  },
  title: {
    color: colors.black,
    fontSize: 40,
  },
  description: {
    color: colors.black,
    fontSize: 20,
    paddingBottom: 20,
    width: '100%',
    textAlign: 'left'
  },
  appleButton: {
    height: '10%',
    width: '50%'
  }
})