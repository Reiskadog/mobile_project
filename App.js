import React, { useState, useEffect } from "react";
import { Button, View, Text,StyleSheet,FlatList,TextInput,Alert,TouchableOpacity, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalStyles } from './styles/global';
import UserScreen from './navigation/UserScreen';
import CategoryScreen from './navigation/CategoryScreen';
import DisplayComment from './navigation/DisplayComment';

//let categoryUpdated = true;
//let userAddUpdated = true;

let param = "";
let oldParam ="";
//Setup the navigation (Propably will be modified to include other files later)
const Stack = createNativeStackNavigator();

const App = () =>{
  const [moviesss, setMoviesss] = useState([]);

  //setInterval(refreshComment, 3000);
  //setInterval(refreshCategory, 1000);

/*function refreshComment(){
  commentUpdated = true;
}*/
/*function refreshCategory(){
  categoryUpdated = true;
}*/

function fetchMessageData(p1,p2,p3){
  useEffect(() => {
    const url = "http://10.0.2.2:8080/rest/categoryservice/addMessage/"+p1+"/"+p2+"/"+p3;
    const fetchiData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
          // console.log(json.slip.advice);
            //setAdvice(json.slip.advice);
            //console.log("repondi " + json);
        } catch (error) {
            console.log("error", error);
        }
    };
    fetchiData();
  }, []);
}



//Fetch data for category




/*
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
  let asd = addData(newFish)
  //Alert.alert("Lisäsit kalan: " + newFish);
  //setFish('');
  }
  
return(
  <View style={globalStyles.formStyle}>
            <TextInput placeholder="Fish's name" 
                style={globalStyles.inputStyle} 
                onChangeText={fishInputHandler}/>   
            <View style={globalStyles.buttonView}>
                <View style={globalStyles.button}>
                <Button title='Cancel add fish' color='red' onPress={()=>{navigation.navigate("CategoryScreen")}}/>
                </View>
                <View style={globalStyles.button}>
                <Button color='green' title="Add" onPress={addFish}/>
                </View>
            </View>
        </View>
);
}
*/
//Adddata part to be convert to more functional form
/*
async function addData(fisu) {
  const [hasError, setErrors] = useState(false);
  const [someError, setSomeErrors] = useState('');

  let res = null;
  let user = "http://10.0.2.2:8080/rest/categoryservice/addjsonfish/" + fisu;

  try{
    //This will wait the fetch to be done - it is also timeout which might be a response (server timeouts)
    res=await fetch(user);
  }
  catch(error){
    setErrors(true);
  }
  try{
    //Getting json from the response
    const responseData = await res.json();
    console.log(responseData);//Just for checking.....
    //setMoviesss(responseData);
    //setMoviess(responseData);
  }
  catch(err){
    setErrors(true);
    setSomeErrors("ERROR: "+hasError+ " my error "+err);
    console.log(someError);
  }
}*/
return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        <Stack.Screen name="DisplayComment" component={DisplayComment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;