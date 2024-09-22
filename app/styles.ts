import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  rectangle: {
    height: 40,
    width: 'auto',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#000000'
  },
  container: {
    height: 'auto',
    padding: 20,
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
