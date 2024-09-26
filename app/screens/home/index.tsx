import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { styles } from '../../styles';

function CreateGroupButton() {
  const handlePress = async () => {}

  return (
    <View style={styles.rectangle}>
      <Button title='Create Group' onPress={handlePress} />
    </View>
  )
}

export default function HomeScreen() {
  const [userGroupNames, setUserGroupNames] = useState([])

  useEffect(() => {
    async function getUserGroups() {
      try {
        const res = await fetch(`http://localhost:5001/groups/find/${userId}`, {
          method: 'GET',
        })
          .then((res) => res.json())

        const groupNames = res.map((group) => {
          return group["name"]
        })

        console.log('succesfully found groups: ' + JSON.stringify(groupNames))
        setUserGroupNames(groupNames)
      } catch (e) {
        console.error(e)
      }
    }

    getUserGroups()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, user!</Text>
      <Text>This is where the groups will be displayed</Text>
      <View style={styles.container}>
        <FlatList 
          data={userGroupNames}
          renderItem={({item, index}) => {
            return (
              <View key={index} style={styles.rectangle}>
                <Text>{item}</Text>
              </View>
            )
          }}
        />  
      </View>
      <CreateGroupButton />
    </View>
  )
}