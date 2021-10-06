import {StyleSheet, View, TextInput, Button, Modal,Text,FlatList,Alert,ActivityIndicator} from 'react-native';
import React, { useState, useEffect } from "react";

const FishInput=(props)=>{
    const [hasError, setErrors] = useState(false);
    //const [fishList, setFishList] = useState([]);
    const [isLoading, setLoading]=useState(true);
    const [newFish, setFish]=useState('');
    
    const fishInputHandler=(enteredText)=>{
        setFish(enteredText);
    }

    const addFish=()=>{
        addData(newFish);
        Alert.alert("Lisäsit kalan: " + newFish);
        setFish('');
    }

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
    
      useEffect(() => {
        if (isLoading==true){
          setLoading(false);
          addData();
        }
      });
    
      if (isLoading==true) {
        return (
          <View style={{flex: 1, padding: 20, justifyContent:'center'}}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        );
      } 

    return (
        <View style={styles.formStyle}>
            <TextInput placeholder="Fish's name" 
                style={styles.inputStyle} 
                onChangeText={fishInputHandler}/>   
            <View style={styles.buttonView}>
                <View style={styles.button}>
                <Button title='Cancel add fish' color='red' onPress={()=>{props.navigation.navigate("Fisu")}}/>
                </View>
                <View style={styles.button}>
                <Button color='green' title="Add" onPress={addFish}/>
                </View>
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    formStyle: {
        flex:1,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:"center"
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
      }
});

export default FishInput;