import React, { useState, useEffect } from "react";
import { Button, View, Text,StyleSheet,FlatList,TextInput,Alert,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

let dataPosting = "";
let commentPosting = "";
let PressTest = "";
let categoryUpdated = true;
let commentUpdated = true;
let param = "";
let oldParam ="";
//Setup the navigation (Propably will be modified to include other files later)
const Stack = createNativeStackNavigator();

const App = () =>{
  const [moviess, setMoviess] = useState([]);
  const [movies, setMovies] = useState([]);

  setInterval(refreshComment, 1000);
  //setInterval(refreshCategory, 1000);

function refreshComment(){
  commentUpdated = true;
}
/*function refreshCategory(){
  categoryUpdated = true;
}*/



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
  if(categoryUpdated)
  {
    fetchData();
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{marginTop:10}}>
        <View style={styles.screen}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={movies}
            renderItem={({item}) => (
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('DisplayComment', {
                otherParam: item.id,
              })}>
            <View style={styles.listItem}>
              <Text>{item.id}) {item.category}</Text>
            </View>
            </TouchableOpacity>
            )}
          />
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('UserScreen', {
            otherParam: 'anything you want here',
          });
        }}
      />
      </View>
      </View>
    </View>
  );
}

//Display screen part
function DisplayComment({ route ,navigation }) {
// Make function call with category id, which we get from route.param.
  let { otherParam } = route.params;
  param = moviess;

  if(commentUpdated)
  {
    fetchCommentData(otherParam);
  }
  console.log("Tässä otherParam " + otherParam);
  console.log("Tässä settiä "+param);
return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{marginTop:10}}>
        <View style={styles.screen}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={moviess}
            renderItem={({item}) => (
            <View style={styles.listItem}>
              <Text>{item.id}) {item.message} {item.category_id} {item.user_id}</Text>
            </View>
            )}
          />
      <Button
        title="Go to category"
        onPress={() => navigation.navigate(UserScreen)}
      />
    </View>
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
  //Alert.alert(db_id);
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