// In App.js in a new project

import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function UserScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>User Screen</Text>
      <Button
        title="Go to category"
        onPress={() => navigation.navigate(CategoryScreen)}
      />
    </View>
  );
}

function CategoryScreen({ navigation }) {
  return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <Text>Category Screen</Text>
  <Button
        title="Go to User"
        onPress={() => navigation.navigate(UserScreen)}
      />
</View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;