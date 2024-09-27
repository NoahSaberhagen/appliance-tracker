import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.white,
    display: 'flex',
    height: '100%',
    flex: 1,
    flexDirection: 'column'
  },
  container: {
    padding: 20,
    color: colors.black,
    margin: 'auto'
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  error: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});
