// In App.js in a new project

import React, { useState, useEffect } from "react";
import { Button, View, Text,StyleSheet,FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

let dataPosting = "";

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

function CategoryScreen({ navigation }) {

  fetchData();
  console.log("setit "+dataPosting);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{marginTop:50}}>
      <View style={styles.screen}>
        <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={dataPosting}
            renderItem={({item}) => (
            <View style={styles.listItem}>
              <Text>{item.id}) {item.breed}, {item.weight}</Text>
            </View>
          )}
        />
      </View>
    </View>
      <Button title="Go to Home" onPress={() => navigation.navigate('UserScreen')} />
    </View>
  );
}

//And the third version with longer code and normal single function calls.
async function fetchData() {
  const [hasError, setErrors] = useState(false);
  const [someError, setSomeErrors] = useState('');
  const [isLoading, setLoading]=useState(true);
  const [movies, setMovies] = useState([]);

  //Variable res is used later, so it must be introduced before try block and so cannot be const.
  let res = null;
  try{
    //This will wait the fetch to be done - it is also timeout which might be a response (server timeouts)
    res=await fetch("http://10.0.2.2:8080/rest/fishservice/getAll");
  }
  catch(error){
    setErrors(true);
  }
  try{
    //Getting json from the response
    const responseData = await res.json();
    console.log(responseData);//Just for checking.....
    setMovies(responseData);
  }
  catch(err){
    setErrors(true);
    setSomeErrors("ERROR: "+hasError+ " my error "+err);
    console.log(someError);
  }
dataPosting = movies;
}
const styles = StyleSheet.create ({
  screen: {
    padding: 60,
  },
});

export default App;