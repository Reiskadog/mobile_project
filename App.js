import React, { useState, useEffect } from "react";
import { Button, View, Text,StyleSheet,FlatList,TextInput,Alert,TouchableOpacity, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalStyles } from './styles/global';

let dataPosting = "";
let commentPosting = "";
let PressTest = "";
let categoryUpdated = true;
let commentUpdated = true;
let userAddUpdated = true;

let param = "";
let oldParam ="";
//Setup the navigation (Propably will be modified to include other files later)
const Stack = createNativeStackNavigator();

const App = () =>{
  const [moviess, setMoviess] = useState([]);
  const [movies, setMovies] = useState([]);
  const [moviesss, setMoviesss] = useState([]);

  setInterval(refreshComment, 3000);
  //setInterval(refreshCategory, 1000);

function refreshComment(){
  commentUpdated = true;
}
/*function refreshCategory(){
  categoryUpdated = true;
}*/

//User screen part
function UserScreen({ navigation }) {
  const [newUser, setUser]=useState('');
  const userInputHandler=(enteredText)=>{
    setUser(enteredText);
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={globalStyles.titleText}>Forum App</Text>
        <Text style={globalStyles.titleText2}>by: The Old Boyz</Text>
        <TextInput style={globalStyles.textInput} placeholder='username' onChangeText={userInputHandler}></TextInput>
        <Pressable style={globalStyles.button} onPress={() => navigation.navigate('CategoryScreen', {
                userParam: newUser,
              })}>
          <Text style={globalStyles.buttonText}>Enter</Text>
        </Pressable>
    </View>
  );
} 

//Category screen part
function CategoryScreen({ route,navigation }) {
  let { userParam } = route.params;
  var displayUsername = userParam;
  
  if(categoryUpdated)
  {
    fetchData();
  }
  return (
    <View style={{ flex: 1}}>
      <View style={{ flex: 1}}>
        <View style={globalStyles.userStats}>
          <Text style={globalStyles.userStatsText1}>{displayUsername}</Text>
        </View>
      </View>
      <View style={globalStyles.categoryTitles}>
        <View style={globalStyles.screen}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={movies}
            renderItem={({item}) => (
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('DisplayComment', {
                otherParam: item.id,
                userParam: displayUsername,
              })}>
            <View style={globalStyles.categoryItem}>
              <Text style={globalStyles.buttonText}>{item.category}</Text>
            </View>
            </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}> 
        <Pressable style={globalStyles.button} onPress={() => {
          navigation.navigate('UserScreen', {
            otherParam: 'anything you want here',
          });
        }}>
          <Text style={globalStyles.buttonText}>Back to User-screen</Text>
        </Pressable>
      </View>
    </View>
  );
}

//Display screen part
function DisplayComment({ route ,navigation }) {
// Make function call with category id, which we get from route.param.
  let { otherParam,userParam } = route.params;
  param = moviess;
  let useri = userParam;

  if(commentUpdated)
  {
    fetchCommentData(otherParam);
    console.log("Tässä otherParam " + otherParam);
    console.log("Tässä settiä "+param);
  }
  
return (
<View style={{ flex: 1}}>
    <View style={{flex: 8, padding:10}}>
      <View>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={moviess}
          renderItem={({item}) => (
            <View style={globalStyles.commentItem}>
              <Text style={globalStyles.commentUsername}>{item.username}</Text>
              <Text style={globalStyles.commentMessage}>{item.message}</Text>
            </View>
          )}
        />
      </View>
      <View style={globalStyles.newMessage}>
        <TextInput 
          multiline={true}
          numberOfLines={1}
          placeholder='Your message here'
        />
      </View>
      <View style={globalStyles.postMessage}>
        <Pressable style={globalStyles.postMessageButton} onPress={() => {
            navigation.navigate('CategoryScreen', {
            otherParam: 'anything you want here',
          });
        }}>
        <Text style={globalStyles.buttonText}>Post message</Text>
        </Pressable>
      </View>
    </View>
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}> 
        <Pressable style={globalStyles.button} onPress={() => {
          navigation.navigate('AddSomething', {
            otherParam: 'anything you want here',
          });
        }}>
          <Text style={globalStyles.buttonText}>Back to Category-screen</Text>
        </Pressable>
      </View>
</View>  
    );
}

//Fetch data for category
async function fetchData() {
  const [hasError, setErrors] = useState(false);
  const [someError, setSomeErrors] = useState('');

  //Variable res is used later, so it must be introduced before try block and so cannot be const.
  let res = null;
  try{
    //This will wait the fetch to be done - it is also timeout which might be a response (server timeouts)
    res=await fetch("http://10.0.2.2:8080/rest/categoryservice/getAll");
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
categoryUpdated = false;
dataPosting = movies;
}

//Fetch data for category
async function fetchCommentData(id) {
  const [hasError, setErrors] = useState(false);
  const [someError, setSomeErrors] = useState('');

  //Variable res is used later, so it must be introduced before try block and so cannot be const.
  let res = null;
  let db_id = "http://10.0.2.2:8080/rest/categoryservice/getAllComments/" + id;
  try{
    //This will wait the fetch to be done - it is also timeout which might be a response (server timeouts)
    res=await fetch(db_id);
  }
  catch(error){
    setErrors(true);
  }
  try{
    //Getting json from the response
    const responseData = await res.json();
    console.log(responseData);//Just for checking.....
    setMoviess(responseData);
  }
  catch(err){
    setErrors(true);
    setSomeErrors("ERROR: "+hasError+ " my error "+err);
    console.log(someError);
  }
commentUpdated = false;
commentPosting = moviess;
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

//Adddata part to be convert to more functional form
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
  //setFishList(fishList=>[...fishList, responseData]);
}


return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        <Stack.Screen name="AddSomething" component={AddSomething} />
        <Stack.Screen name="DisplayComment" component={DisplayComment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;