import React, { useState, useEffect } from "react";
import { Button, View, Text,StyleSheet,FlatList,TextInput,Alert,TouchableOpacity, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalStyles } from '../styles/global';

import {fetchCommentData, fetchMessageData2} from "../App";
let commentUpdated = true;
let commentPosted = false;

let commentPosting = "";

//Display screen part
export default function DisplayComment({ route ,navigation }) {
    // Make function call with category id, which we get from route.param.
    const [moviess, setMoviess] = useState([]);

      const [newMessageState, setMessage]=useState('');
      const messageInputHandler=(enteredText)=>{
        setMessage(enteredText);
      }
      var dummyMessage = '';
      let { otherParam, pcategory, pusername} = route.params;
      param = moviess;

      useEffect(() => {
        if(commentUpdated){
          const url = "https://forumapp-328823.ew.r.appspot.com/rest/categoryservice/getAllComments/"+otherParam;
          const fetchiData = async () => {
              try {
                  const response = await fetch(url);
                  const json = await response.json();
                  setMoviess(json);
                  console.log("test123");
              } catch (error) {
                  console.log("error", error);
              }
              commentUpdated = false;
              commentPosting = moviess;
          };
          fetchiData();
        }
      }, []);

/*
      if(commentUpdated)
      {
        commentUpdated = false;
        
        fetchCommentData(otherParam);
        console.log("Tässä otherParam " + otherParam);
        console.log("Tässä pcategory "+pcategory);
        console.log("Tässä pusername "+pusername);
        console.log("Tässä settiä "+param);
      }
*/
      //Fetch data for category
async function fetchCommentData(id) {
    const [hasError, setErrors] = useState(false);
    const [someError, setSomeErrors] = useState('');
  
    //Variable res is used later, so it must be introduced before try block and so cannot be const.
    let res = null;
    let db_id = "https://forumapp-328823.ew.r.appspot.com/rest/categoryservice/getAllComments/" + id;
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

async function fetchMessageData2(p1,p2,p3){
    const response = await fetch("https://forumapp-328823.ew.r.appspot.com/rest/categoryservice/addMessage/"+p1+"/"+p2+"/"+p3,
      {
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        },
      });
  
      const responseData = await response.text();
      commentUpdated = true;
      console.log("Isotesti ******* "+responseData);
}
      
    return (
    <View style={{ flex: 1}}>
        <View style={{flex: 8, padding:10}}>
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={globalStyles.titleText}>{pcategory}</Text>
          </View>
          <View style={globalStyles.newMessage}>
            <TextInput 
              multiline={true}
              numberOfLines={1}
              //onChangeText={(text) => setMessage({text}.toString())}
              onChangeText={messageInputHandler}
              placeholder='Your message here'
            />
          </View>
          <View style={globalStyles.postMessage}>
            <Pressable style={globalStyles.postMessageButton} onPress={() => 
              {fetchMessageData2(newMessageState,otherParam,pusername)}}>
            <Text style={globalStyles.buttonText}>Post message</Text>
            </Pressable>
          </View>
          <View>
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={moviess}
              style={globalStyles.messageList}
              renderItem={({item}) => (
                <View style={globalStyles.commentItem}>
                  <Text style={globalStyles.commentUsername}>{item.username}</Text>
                  <Text style={globalStyles.commentMessage}>{item.message}</Text>
                </View>
              )}
            />
          </View>
        </View>
          <View style={{flex:1, alignItems:"center", justifyContent:"center"}}> 
            <Pressable style={globalStyles.button} onPress={() => {
              navigation.navigate('CategoryScreen', {
                otherParam: 'anything you want here',
              });
            }}>
              <Text style={globalStyles.buttonText}>Back to Category-screen</Text>
            </Pressable>
          </View>
    </View>  
        );
    }