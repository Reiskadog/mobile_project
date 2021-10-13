
import React, { useState, useEffect } from "react";
import { Button, View, Text,StyleSheet,FlatList,TextInput,Alert,TouchableOpacity, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalStyles } from '../styles/global';

//User screen part
export default function UserScreen({ navigation }) {
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