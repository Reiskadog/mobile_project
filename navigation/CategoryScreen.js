import React, { useState, useEffect } from "react";
import { Button, View, Text,StyleSheet,FlatList,TextInput,Alert,TouchableOpacity, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalStyles } from '../styles/global';

import {fetchData} from "../App";


let userAddUpdated = true;
let categoryUpdated = true;
let dataPosting = "";

//Category screen part
export default function CategoryScreen({ route,navigation }) {
    let { userParam } = route.params;
    var displayUsername = userParam;
    const [movies, setMovies] = useState([]);

    /*setInterval(refreshUser, 1000);
  
    function refreshUser(){
      userAddUpdated = false;
    }*/
  
  
    //const [advice, setAdvice] = useState("");
      useEffect(() => {
        if(userAddUpdated){
        userAddUpdated = false;
          const url = "https://forumapp-328823.ew.r.appspot.com/rest/categoryservice/addjsonfish/"+userParam;
          const fetchiData = async () => {
              try {
                  const response = await fetch(url);
                  const json = await response.json();
                  console.log("test123");
              } catch (error) {
                  console.log("error", error);
              }
          };
          fetchiData();
        }
      }, []);

    
        //categoryUpdated = false;
        useEffect(() => {
            if(categoryUpdated){
            const url = "https://forumapp-328823.ew.r.appspot.com/rest/categoryservice/getAll";
            const fetchiData = async () => {
                try {
                    const response = await fetch(url);
                    const json = await response.json();
                    setMovies(json);
                    console.log("test123");
                } catch (error) {
                    console.log("error", error);
                }
                categoryUpdated = false;
                dataPosting = movies;
            };
            fetchiData();
        }
        }, []);

    /*
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
      }*/

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
                  pcategory: item.category,
                  pusername: displayUsername,
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