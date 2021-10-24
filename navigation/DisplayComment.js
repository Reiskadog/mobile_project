import React, { useState } from "react";
import {  View, Text,FlatList,TextInput, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { globalStyles } from '../styles/global';

//Display screen part
export default function DisplayComment({ route ,navigation }) {
    const [moviess, setMoviess] = useState([]);

      const [newMessageState, setMessage]=useState('');
      const messageInputHandler=(enteredText)=>{
        setMessage(enteredText);
      }
      let { otherParam, pcategory, pusername} = route.params;
      param = moviess;
      
      useFocusEffect(
        React.useCallback(() => {
          let isActive = true;
          const fetchComment = async () => {
            const url = "http://10.0.2.2:8080/rest/categoryservice/getAllComments/"+otherParam;
            try {
              const response = await fetch(url);
              const json = await response.json();
              console.log("test123");
              if (isActive) {
                setMoviess(json);
              }
            } catch (e) {
              // Handle error
              console.log("error", error);
            }
          };
          fetchComment();
          return () => {
            isActive = false;
          };
        }, [])
      );

async function fetchMessageData2(p1,p2,p3){
    const response = await fetch("http://10.0.2.2:8080/rest/categoryservice/addMessage/"+p1+"/"+p2+"/"+p3,
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