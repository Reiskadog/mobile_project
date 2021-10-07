import {StyleSheet, View, FlatList, Button,Text,TouchableOpacity,ScrollView,TextInput, Alert, ActivityIndicator} from 'react-native';
import React, { useState, useEffect } from "react";
//import ListItem from './ListItem';
import FishInput from './FishInput';

let updated = true;

const Fisu = (props) =>{
  //const [fishList, addFish]=useState([]);
  const [hasError, setErrors] = useState(false);
  const [someError, setSomeErrors] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading]=useState(true);

  //Using setInterval without this test caused instability.
  if(updated){
  updated = false;
  setInterval(FetchMyData, 5000);
  }

  function FetchMyData(){
  fetchData();
  };

  /*const deleteItem=(fishId)=>{
    addFish(fishList=>{
      return fishList.filter((fish) =>fishList.indexOf(fish) !== fishId);
    });
  }*/

  //And the third version with longer code and normal single function calls.
  async function fetchData() {
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
  }

  //This is called every time the view is rendered
  //The new calls of fetchData (and others) must be stopped somehow, because in
  //those methods are statevariables set, which cause a new re-render.
  useEffect(() => {
      if (isLoading==true){
      setLoading(false);
      fetchData();
    }
  });

  //If the 'fetch' is not ready yet, an activityindicator is shown
  if (isLoading==true) {
    return (
      <View style={{flex: 1, padding: 20, justifyContent:'center'}}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  //If errors
  else if(hasError){
    return(
      <View style={{flex: 1, padding: 20, justifyContent:'center'}}>
        <Text>{hasError}</Text>
        <Text>{""+someError}</Text>
      </View>
    );
  }
  return (
      <View style={{marginTop:50}}>
      <Text>{hasError}</Text>
      <View style={styles.screen}>
      <Button title='Add Fish' onPress={()=>{props.navigation.navigate("FishInput")}}/>
        <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={movies}
            renderItem={({item}) => (
            <View style={styles.listItem}>
              <Text>{item.id}) {item.breed}, {item.weight}</Text>
            </View>
          )}
        />
      </View>
    </View>
    );
};
const styles = StyleSheet.create ({
  screen: {
    padding: 60,
  },
});
  export default Fisu;
