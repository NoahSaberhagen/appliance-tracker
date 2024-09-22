import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { useAppliance } from '../hooks/useAppliance';
import { styles } from '../styles'

export default function GroupScreen() {
  const { listAppliances } = useAppliance();

  const [appliances, setAppliances] = useState<any[]>([])
  const [formData, setFormData] = useState({
    applianceName: '',
  });

  const handleListAppliances = async () => {
    try {
      const appliancesRes = await listAppliances();
      if (!appliancesRes) {
        console.error('no response')
      } else {
        setAppliances(appliancesRes)
        console.log(appliances)
      }
    } catch (e) {
      console.error(e)
    }
  }

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
      <Button title="List Appliances" onPress={async () => {
        await handleListAppliances()
      }} />
      <FlatList 
        data={appliances}
        renderItem={({item, index}) => {
          return (
            <Text key={index}>{JSON.stringify(item)}</Text>
          )
        }}
      />
    </View>
  );
};
