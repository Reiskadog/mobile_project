import React, { useState, useEffect } from "react";
import { Button, View, Text,StyleSheet,FlatList,TextInput,Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

let dataPosting = "";

//Setup the navigation (Propably will be modified to include other files later)
const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        <Stack.Screen name="AddSomething" component={AddSomething} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//User screen part
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

//Category screen part
function CategoryScreen({ navigation }) {
  fetchData();
  console.log("setit "+dataPosting);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{marginTop:10}}>
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
        <Button title="Go to Home" onPress={() => navigation.navigate('AddSomething')} />
        </View>
      </View>
    </View>
  );
}

//Fetch data for category
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

//Add something part
function AddSomething({navigation}){
  const [hasError, setErrors] = useState(false);
  const [isLoading, setLoading]=useState(true);
  const [newFish, setFish]=useState('');

  const fishInputHandler=(enteredText)=>{
    setFish(enteredText);
  }
// Will be converted to more functional adding data module
  const addFish=()=>{
  addData(newFish);
  Alert.alert("Lisäsit kalan: " + newFish);
  setFish('');
  }

return(
  <View style={styles.formStyle}>
            <TextInput placeholder="Fish's name" 
                style={styles.inputStyle} 
                onChangeText={fishInputHandler}/>   
            <View style={styles.buttonView}>
                <View style={styles.button}>
                <Button title='Cancel add fish' color='red' onPress={()=>{navigation.navigate("CategoryScreen")}}/>
                </View>
                <View style={styles.button}>
                <Button color='green' title="Add" onPress={addFish}/>
                </View>
            </View>
        </View>
);
}

//Adddata part to be convert to more functional form
async function addData(fisu) {
  const response = await fetch("http://10.0.2.2:8080/rest/fishservice/addjsonfish",
  {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({breed:fisu, weight:1003})
  });
  const responseData = await response.json();
  console.log(responseData);
  //setFishList(fishList=>[...fishList, responseData]);
}

//Styles
const styles = StyleSheet.create ({
  screen: {
    padding: 10,
    },
    inputStyle: {
      borderWidth: 2, 
      borderColor: 'red', 
      padding: 10,
      width:'80%',
      marginBottom:10,
    },
    buttonView:{
      width:'60%',
      flexDirection: 'row',
      justifyContent:"space-around",
    },
    button:{
      width:'40%',
    },
    formStyle: {
      flex:1,
      flexDirection: 'column',
      justifyContent:'center',
      alignItems:"center"
  },
});

export default App;