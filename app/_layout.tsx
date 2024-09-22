import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Form = () => {
  const [formData, setFormData] = useState({
    applianceName: '',
  });

  const handleSubmit = async () => {
    try {
      await fetch('http://localhost:5001/appliances/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: formData.applianceName })
      })
      console.log('created')
      setFormData({ applianceName: '' })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Appliance Name"
        value={formData.applianceName}
        onChangeText={(text) => setFormData({ ...formData, applianceName: text })}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default Form;
